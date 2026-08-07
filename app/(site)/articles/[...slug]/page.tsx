import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { initializeSdk, getTenant, sdk } from "@/sdk";
import { Article } from "@/components/Article/Article";

interface ArticlePageProps {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<Record<string, string>>;
}

export async function generateStaticParams() {
    initializeSdk({ tenantId: await getTenant() });

    const result = await sdk.cms.listEntries({
        modelId: "article"
    });

    if (result.isFail()) {
        return [];
    }

    return result.value.data.map(entry => {
        const values = entry.values;
        const slug = values.slug as string;
        return { slug: slug.split("/") };
    });
}

async function getEntry(slug: string[], searchParams: Record<string, string>) {
    const { isEnabled } = await draftMode();
    initializeSdk({ preview: isEnabled, tenantId: await getTenant() });

    const entryId = searchParams["wb.id"];
    if (entryId) {
        const result = await sdk.cms.getEntry({ modelId: "article", entryId });
        return result.isOk() ? result.value : null;
    }

    const slugValue = slug.join("/");
    const result = await sdk.cms.listEntries({
        modelId: "article",
        where: { values: { slug: slugValue } },
        limit: 1
    });

    if (result.isFail()) {
        return null;
    }

    const data = result.value.data;

    return data.length > 0 ? data[0] : null;
}

export async function generateMetadata({
    params,
    searchParams
}: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const search = await searchParams;
    const entry = await getEntry(slug, search);

    if (!entry) {
        return {};
    }

    const values = entry.values as Record<string, unknown>;
    return {
        title: (values.title as string) ?? undefined,
        description: (values.description as string) ?? undefined
    };
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
    const { slug } = await params;
    const search = await searchParams;

    initializeSdk({ tenantId: await getTenant() });

    const modelResult = await sdk.cms.getModel("article");
    const entry = await getEntry(slug, search);

    if (!entry || modelResult.isFail()) {
        return notFound();
    }

    return (
        <main className="pb-12">
            <Article entry={entry} model={modelResult.value} />
        </main>
    );
}
