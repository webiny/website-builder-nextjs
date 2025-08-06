import React from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { initializeContentSdk, getTenant } from "@/src/contentSdk";
import { PageLayout } from "@/src/components/PageLayout";
import { DocumentRenderer } from "@/src/components/DocumentRenderer";

type PageProps = {
    // If it's a catch-all route, you get an array of path segments.
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<Record<string, string>>;
};

// This function runs at build time to generate all static paths for Next.js prerendering.
// We must initialize the SDK here because the SDK needs to be ready before fetching the list of pages.
export async function generateStaticParams() {
    initializeContentSdk({ tenantId: await getTenant() });

    // List all published pages
    const pages = await contentSdk.listPages();

    return pages.map(page => {
        const path = page.properties.path;

        return {
            // The starter kit defines one single catch-all route, which expects an array of path segments.
            // We split by `/` and remove the leading segment (which is a `/`)
            slug: path.split("/").slice(1)
        };
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    initializeContentSdk({ tenantId: await getTenant() });

    const { slug = "" } = await params;

    const page = await contentSdk.getPage(`/${slug}`);

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
            url: `https://example.com/${slug}`,
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

// This function fetches page data for a given path, considering preview (draft) mode.
// It is critical to initialize the SDK **before** using the `contentSdk` because this function
// runs **before** any React components mount, so our ContentSdkInitializer has no effect.
async function getPage(path: string) {
    const { isEnabled } = await draftMode();

    // Initialize the SDK with the preview flag to ensure correct data fetching.
    initializeContentSdk({ preview: isEnabled, tenantId: await getTenant() });

    return await contentSdk.getPage(path);
}

// The main page component, rendered server-side, receives parameters and search params.
// It takes into account the live editing mode (`wb.editing` query parameter).
export default async function ProductPage({ params, searchParams }: PageProps) {
    const { slug = [] } = await params;
    const search = await searchParams;

    // Check if the application is loaded in "live editing" mode.
    const isEditing = search["wb.editing"] === "true";

    const page = await getPage(`/${slug.join("/")}`);

    return (
        <PageLayout>
            <DocumentRenderer document={page} isEditing={isEditing} />
        </PageLayout>
    );
}
