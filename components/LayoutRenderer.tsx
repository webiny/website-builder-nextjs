"use client";
import React from "react";
import { LayoutRenderer as SdkLayoutRenderer } from "@webiny/sdk-nextjs";
import type { PublicLayout, RemoteComponentEntry } from "@webiny/sdk-nextjs";
import { useEditorComponents } from "./useEditorComponents";

interface LayoutRendererProps {
    layout: PublicLayout;
    remoteComponents?: RemoteComponentEntry[];
    // Content for the layout's named content areas, by area name.
    areas?: Record<string, React.ReactNode>;
    // Rendered in the layout's Main content.
    children: React.ReactNode;
}

// Render content from code (e.g. a CMS entry) in a layout built in the admin's layout editor.
export const LayoutRenderer = ({
    layout,
    remoteComponents = [],
    areas,
    children
}: LayoutRendererProps) => {
    const { allComponents, remoteCss } = useEditorComponents(remoteComponents);

    return (
        <>
            {remoteCss ? <style dangerouslySetInnerHTML={{ __html: remoteCss }} /> : null}
            <SdkLayoutRenderer layout={layout} components={allComponents} areas={areas}>
                {children}
            </SdkLayoutRenderer>
        </>
    );
};
