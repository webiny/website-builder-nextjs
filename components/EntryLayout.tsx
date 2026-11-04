import React from "react";
import type { CmsModelDefinition } from "@webiny/sdk-nextjs";
import { sdk } from "@/sdk";
import { LayoutRenderer } from "./LayoutRenderer";

interface EntryLayoutProps {
    model: CmsModelDefinition;
    // Content for the layout's named content areas, by area name, e.g. `{ sidebar: <Related /> }`.
    areas?: Record<string, React.ReactNode>;
    children: React.ReactNode;
}

// Render an entry in the layout its model names, on the live site and in Live Preview. A model without a
// `layout` setting, or whose layout isn't published, renders its entries as they are.
export async function EntryLayout({ model, areas, children }: EntryLayoutProps) {
    const layoutResult = await sdk.cms.getLayoutForModel(model);
    const layout = layoutResult.isOk() ? layoutResult.value : null;
    if (!layout) {
        return <>{children}</>;
    }

    const remoteComponentsResult = await sdk.components.loadComponents({
        fetchOptions: { next: { revalidate: 60 } } as RequestInit
    });
    const remoteComponents = remoteComponentsResult.isOk() ? remoteComponentsResult.value : [];

    return (
        <LayoutRenderer layout={layout} remoteComponents={remoteComponents} areas={areas}>
            {children}
        </LayoutRenderer>
    );
}
