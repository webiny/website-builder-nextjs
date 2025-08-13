import React from "react";
import { draftMode } from "next/headers";
import { contentSdk, DocumentFragment } from "@webiny/website-builder-nextjs";
import { PageLayout } from "@/src/components/PageLayout";
import { DocumentRenderer } from "@/src/components/DocumentRenderer";
import { sampleApi } from "@/src/sampleApi/SampleApi";
import { initializeContentSdk, getTenant } from "@/src/contentSdk";
import { ProductDetails } from "@/src/components/ProductDetails";
import { normalizeSlug } from "@/src/utils/normalizeSlug";

type PageProps = {
  // If it's a catch-all route, you get an array of path segments.
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
};

// This function runs at build time to generate all static paths for Next.js prerendering.
// We must initialize the SDK here because the SDK needs to be ready before fetching the list of pages.
export async function generateStaticParams() {
    const products = await sampleApi.listProducts();

    return products.map(product => {
        return {
            slug: product.id
        };
    });
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
    const { slug } = await params;
    const search = await searchParams;

    // Check if the application is loaded in "live editing" mode.
    const isEditing = search["wb.editing"] === "true";

    const [product, page] = await Promise.all([
        sampleApi.getProduct(slug),
        getPage(normalizeSlug(`/product/${slug}`))
    ]);

    if (!product) {
        // Product is required for the page to render!
        return <PageLayout>Product not found!</PageLayout>;
    }

    return (
        <PageLayout>
            {/* Page _is_ optional. If it doesn't exist, the default fragment is rendered. */}
            <DocumentRenderer document={page} isEditing={isEditing}>
                <DocumentFragment name={"productDetails"}>
                    <ProductDetails product={product} />
                </DocumentFragment>
            </DocumentRenderer>
        </PageLayout>
    );
}
