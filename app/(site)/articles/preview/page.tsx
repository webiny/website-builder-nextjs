import React from "react";
import { initializeSdk, sdk } from "@/sdk";
import { getTenant } from "@/sdk/getTenant";
import { Article } from "@/components/Article/Article";

export const dynamic = "force-dynamic";

export default async function ArticlePreviewPage() {
    initializeSdk({ preview: true, tenantId: await getTenant() });
    const modelResult = await sdk.cms.getModel("article");

    if (modelResult.isFail()) {
        return null;
    }

    return (
        <main className="pb-12">
            <Article entry={null} model={modelResult.value} isEditing />
        </main>
    );
}
