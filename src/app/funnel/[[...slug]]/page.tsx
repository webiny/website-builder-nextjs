import React from "react";
import { draftMode } from "next/headers";
import { contentSdk, createElement, DocumentFragment } from "@webiny/website-builder-nextjs";
import { getTenant, initializeContentSdk } from "@/src/contentSdk";
import { DocumentRenderer } from "@/src/components/DocumentRenderer";
import { normalizeSlug } from "@/src/utils/normalizeSlug";
import { FunnelStepModel } from "@/src/editorComponents/funnelBuilder/models/FunnelStepModel";
import { SuccessStep } from "@/src/editorComponents/funnelBuilder/models/steps/SuccessStep";

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

  const emptyStep = createElement({
    component: "Fub/Step",
    inputs: {
      children: []
    }
  });

  const successStep = createElement({
    component: "Fub/Step",
    inputs: {
      isSuccess: true,
      children: [
        createElement({
          component: "Webiny/Lexical",
          inputs: {
            content: {
              state: `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"✅","type":"text","version":1}],"direction":null,"format":"center","indent":0,"type":"wby-heading","version":1,"tag":"h1","styleId":"heading1","className":"wb-heading-1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Success","type":"text","version":1}],"direction":null,"format":"center","indent":0,"type":"wby-heading","version":1,"tag":"h1","styleId":"heading1","className":"wb-heading-1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Thank you for your submission!","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"wby-paragraph","version":1,"textFormat":0,"textStyle":"","styleId":"paragraph1","className":"wb-paragraph-1"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
              html: `<h1 class="wb-lx-h1 wb-heading-1" style="text-align: center;"><strong class="wb-lx-textBold" style="white-space: pre-wrap;">✅</strong></h1><h1 class="wb-lx-h1 wb-heading-1" style="text-align: center;"><span style="white-space: pre-wrap;">Success</span></h1><p class="wb-lx-paragraph wb-paragraph-1" dir="ltr" style="text-align: center;"><span style="white-space: pre-wrap;">Thank you for your submission!</span></p>`
            }
          }
        })
      ]
    }
  });

  return (
    <div className={"py-10 px-4"}>
      <DocumentRenderer document={page} isEditing={isEditing}>
        <DocumentFragment
          component={"Fub/Container"}
          inputs={{
            fields: [],
            steps: [emptyStep, successStep]
          }}
        />
      </DocumentRenderer>
    </div>
  );
}
