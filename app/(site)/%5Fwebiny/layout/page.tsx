import React from "react";
import { initializeSdk, getTenant, sdk } from "@/sdk";
import { DocumentRenderer } from "@/components/DocumentRenderer";
import { NotFound } from "@/components/NotFound";

export const dynamic = "force-dynamic";

type LayoutPreviewProps = {
    searchParams: Promise<Record<string, string>>;
};

// The preview of the layout editor, at `/_webiny/layout` (`%5F` keeps the leading underscore out of
// Next.js' private folders). It renders the layout open in the editor, without the site's own layout
// around it. Outside the editor, there is nothing to show.
export default async function LayoutPreviewPage({ searchParams }: LayoutPreviewProps) {
    const search = await searchParams;
    if (search["wb.editing"] !== "true") {
        return <NotFound />;
    }

    initializeSdk({ preview: true, tenantId: await getTenant() });

    // A layout can hold remote components too, so they're loaded as for pages.
    const remoteComponentsResult = await sdk.components.loadComponents({
        fetchOptions: { next: { revalidate: 60 } } as RequestInit
    });
    const remoteComponents = remoteComponentsResult.isOk() ? remoteComponentsResult.value : [];

    return (
        <DocumentRenderer
            document={null}
            isEditing
            layout={null}
            remoteComponents={remoteComponents}
        />
    );
}
