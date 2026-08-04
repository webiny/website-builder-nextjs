import React from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { type Language } from "@webiny/sdk-nextjs";
import { initializeSdk, getTenant, sdk } from "@/sdk";
import { fromBackend } from "@/sdk/backend";
import { createEditingDocument } from "@/sdk/editingDocument";
import { PageLayout } from "@/components/PageLayout";
import { DocumentRenderer } from "@/components/DocumentRenderer";
import { normalizeSlug } from "@/utils/normalizeSlug";

type PageProps = {
    // If it's a catch-all route, you get an array of path segments.
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<Record<string, string>>;
};

// This function runs at build time to generate all static paths for Next.js prerendering.
// We must initialize the SDK here because the SDK needs to be ready before fetching the list of pages.
export async function generateStaticParams() {
    initializeSdk({ tenantId: await getTenant() });

    return fromBackend<{ slug: string[] }[]>([], async () => {
        // List all published pages
        const result = await sdk.wb.listPages();
        const pages = result.isOk() ? result.value.data : [];

        return pages.map(page => {
            const path = page.properties.path;

            return {
                // The starter kit defines one single catch-all route, which expects an array of path segments.
                // We split by `/` and remove the leading segment (which is a `/`), because Next appends the leading slash!
                slug: path.split("/").slice(1)
            };
        });
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    initializeSdk({ tenantId: await getTenant() });

    const { slug = "" } = await params;
    const normalizedSlug = normalizeSlug(slug);

    const page = await fromBackend(null, async () => {
        const result = await sdk.wb.getPage(normalizedSlug);
        return result.isFail() ? null : result.value;
    });

    if (!page) {
        return {};
    }

    const title = page.properties.seo?.title ?? page.properties.title;
    const ogTitle = page.properties.social?.title ?? title;

    const description = page.properties.seo?.description ?? page.properties.description;
    const ogDescription = page.properties.social?.description ?? description;

    // Custom tags
    const otherSeoTags = page.properties.seo?.metaTags.reduce((acc, item) => {
        return { ...acc, [item.name]: item.content };
    }, {});

    const otherOgTags = page.properties.social?.metaTags.reduce((acc, item) => {
        return { ...acc, [item.property]: item.content };
    }, {});

    return {
        title,
        description,
        openGraph: {
            type: "website",
            url: `https://example.com${normalizedSlug}`,
            title: ogTitle,
            description: ogDescription,
            siteName: "My Website"
        },
        other: {
            ...otherSeoTags,
            ...otherOgTags
        }
    };
}

async function listLanguages(): Promise<Language[]> {
    return fromBackend<Language[]>([], async () => {
        const result = await sdk.languages.listLanguages();
        return result.isFail() ? [] : result.value;
    });
}

function resolveLanguageCode(
    page: Awaited<ReturnType<typeof getPage>>,
    languages: Awaited<ReturnType<typeof listLanguages>>,
    slug: string[]
): string | undefined {
    const language = page?.properties.language;
    if (language) {
        return language;
    }

    const matchedBySlug = languages.find(l => l.code === slug[0]);
    if (matchedBySlug) {
        return matchedBySlug.code;
    }

    return undefined;
}

// This function fetches page data for a given path, considering preview (draft) mode.
// It is critical to initialize the SDK **before** using the `sdk` because this function
// runs **before** any React components mount, so our SdkInitializer has no effect.
async function getPage(path: string) {
    return fromBackend(null, async () => {
        const result = await sdk.wb.getPage(path);
        return result.isOk() ? result.value : null;
    });
}

// The main page component, rendered server-side, receives parameters and search params.
// It takes into account the live editing mode (`wb.editing` query parameter).
export default async function Page({ params, searchParams }: PageProps) {
    const { slug = [] } = await params;
    const search = await searchParams;

    const previewMode = await draftMode();

    // Initialize the SDK with the preview flag to ensure correct data fetching.
    initializeSdk({ preview: previewMode.isEnabled, tenantId: await getTenant() });

    // Check if the application is loaded in "live editing" mode.
    const isEditing = search["wb.editing"] === "true";

    const [page, languages] = await Promise.all([getPage(normalizeSlug(slug)), listLanguages()]);

    const languagePaths = page?.languagePaths;
    const currentLanguageCode = resolveLanguageCode(page, languages, slug);

    // While editing, the editor is the source of truth for the page's content, so we don't need to
    // have fetched it: a placeholder is enough to boot the renderer, and the editor fills it in.
    // This is what keeps the editor working on a page that was never saved, and on an instance with
    // no backend configured at all.
    const document =
        page ??
        (isEditing
            ? createEditingDocument({
                  id: search["wb.id"] ?? "",
                  // `wb.path` is what the SDK matches against, so prefer it over our own slug.
                  path: search["wb.path"] ?? normalizeSlug(slug)
              })
            : null);

    return (
        <PageLayout
            languages={languages}
            languagePaths={languagePaths}
            currentLanguageCode={currentLanguageCode}
        >
            <DocumentRenderer document={document} isEditing={isEditing} />
        </PageLayout>
    );
}
