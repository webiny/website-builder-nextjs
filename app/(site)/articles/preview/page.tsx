import React from "react";
import { initializeSdk, sdk, getTenant } from "@/sdk";
import { fromBackend } from "@/sdk/backend";
import { Article } from "@/components/Article/Article";

export const dynamic = "force-dynamic";

export default async function ArticlePreviewPage() {
    initializeSdk({ preview: true, tenantId: await getTenant() });
    // The CMS live preview needs the model, which only a backend can provide.
    const model = await fromBackend(null, async () => {
        const result = await sdk.cms.getModel("article");
        return result.isFail() ? null : result.value;
    });

    if (!model) {
        return null;
    }

    return (
        <main className="pb-12">
            <Article entry={null} model={model} isEditing />
        </main>
    );
}
