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

// The slug of the layout a model's entries render in: the model's `layout` setting.
const getLayoutSlug = (model: CmsModelDefinition) => {
    const slug = model.settings?.layout;
    return typeof slug === "string" && slug ? slug : null;
};

// Render an entry in the layout its model names, on the live site and in Live Preview. A model without the
// setting, or whose layout isn't published, renders its entries as they are.
export async function EntryLayout({ model, areas, children }: EntryLayoutProps) {
    const slug = getLayoutSlug(model);
    if (!slug) {
        return <>{children}</>;
    }

    const [layoutResult, remoteComponentsResult] = await Promise.all([
        sdk.wb.getLayout({ slug }),
        sdk.components.loadComponents({
            fetchOptions: { next: { revalidate: 60 } } as RequestInit
        })
    ]);

    const layout = layoutResult.isOk() ? layoutResult.value : null;
    if (!layout) {
        return <>{children}</>;
    }

    const remoteComponents = remoteComponentsResult.isOk() ? remoteComponentsResult.value : [];

    return (
        <LayoutRenderer layout={layout} remoteComponents={remoteComponents} areas={areas}>
            {children}
        </LayoutRenderer>
    );
}
