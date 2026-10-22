import React from "react";
import { initializeSdk, sdk, getTenant } from "@/sdk";
import { Article } from "@/components/Article/Article";
import { EntryLayout } from "@/components/EntryLayout";
import { articleModelId } from "@/constants";

export const dynamic = "force-dynamic";

export default async function ArticlePreviewPage() {
    initializeSdk({ preview: true, tenantId: await getTenant() });
    const modelResult = await sdk.cms.getModel(articleModelId);

    if (modelResult.isFail()) {
        return null;
    }

    const model = modelResult.value;

    // The entry comes from the entry editor; the layout around it, as published.
    return (
        <EntryLayout model={model}>
            <main className="pb-12">
                <Article entry={null} model={model} isEditing />
            </main>
        </EntryLayout>
    );
}
