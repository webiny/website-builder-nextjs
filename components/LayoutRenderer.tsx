"use client";
import React from "react";
import { LayoutRenderer as SdkLayoutRenderer } from "@webiny/sdk-nextjs";
import type { PublicLayout } from "@webiny/sdk-nextjs";
import { editorComponents } from "../editorComponents";

interface LayoutRendererProps {
    layout: PublicLayout;
    // Content for the layout's named content areas, by area name.
    areas?: Record<string, React.ReactNode>;
    // Rendered in the layout's Main content.
    children: React.ReactNode;
}

// Render content from code (e.g. a CMS entry) in a layout built in the admin's layout editor.
export const LayoutRenderer = ({ layout, areas, children }: LayoutRendererProps) => {
    return (
        <SdkLayoutRenderer layout={layout} components={editorComponents} areas={areas}>
            {children}
        </SdkLayoutRenderer>
    );
};
