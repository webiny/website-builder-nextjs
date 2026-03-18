import React from "react";
import { draftMode } from "next/headers";
import { contentSdk, createElement, DocumentFragment } from "@webiny/website-builder-nextjs";
import { initializeContentSdk, getTenant } from "@/src/contentSdk";
import { PageLayout } from "@/src/components/PageLayout";
import { DocumentRenderer } from "@/src/components/DocumentRenderer";
import { normalizeSlug } from "@/src/utils/normalizeSlug";

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

  return pages.data.map(page => {
    const path = page.properties.path;

    return {
      // The starter kit defines one single catch-all route, which expects an array of path segments.
      // We split by `/` and remove the leading segment (which is a `/`), because Next appends the leading slash!
      slug: path.split("/").slice(1)
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

  return await contentSdk.getPage(`/funnel${path}`);
}

// The main page component, rendered server-side, receives parameters and search params.
// It takes into account the live editing mode (`wb.editing` query parameter).
export default async function Page({ params, searchParams }: PageProps) {
  const { slug = [] } = await params;
  const search = await searchParams;

  // Check if the application is loaded in "live editing" mode.
  const isEditing = search["wb.editing"] === "true";

  const page = await getPage(normalizeSlug(slug));

  return (
    <div className={"p-2"}>
      <DocumentRenderer document={page} isEditing={isEditing}>
        <DocumentFragment
          component={"Fub/Container"}
          inputs={{
            fields: [],
            activeStep: 0,
            steps: [
              createElement({
                component: "Fub/Step",
                inputs: {
                  label: "Step 1",
                  children: []
                }
              }),
              createElement({
                component: "Fub/Step",
                inputs: {
                  label: "Final Step",
                  children: []
                }
              })
            ]
          }}
        />
      </DocumentRenderer>
    </div>
  );
}
