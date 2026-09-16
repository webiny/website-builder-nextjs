import React from "react";
import { initializeSdk, sdk, getTenant } from "@/sdk";
import { Article } from "@/components/Article/Article";

export const dynamic = "force-dynamic";

const MODEL_ID = "article";

export default async function ArticlePreviewPage() {
    initializeSdk({ preview: true, tenantId: await getTenant() });
    const modelResult = await sdk.cms.getModel(MODEL_ID);

    if (modelResult.isFail()) {
        return <p>Unable to load model `{MODEL_ID}`!</p>;
    }

    return (
        <main className="pb-12">
            <Article entry={null} model={modelResult.value} isEditing />
        </main>
    );
}