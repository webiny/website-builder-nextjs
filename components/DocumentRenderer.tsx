"use client";
import React from "react";
import dynamic from "next/dynamic";
import { type Document, type DocumentLayout, GlobalComponent } from "@webiny/sdk-nextjs";
import { NotFound } from "./NotFound";
import { editorComponents } from "../editorComponents";

const DocumentRendererSSR = dynamic(
    () =>
        import("@webiny/sdk-nextjs").then(m => ({
            default: m.DocumentRenderer
        })),
    { ssr: true }
);

const DocumentRendererNoSSR = dynamic(
    () =>
        import("@webiny/sdk-nextjs").then(m => ({
            default: m.DocumentRenderer
        })),
    { ssr: false }
);

interface DocumentRendererProps {
    // While editing, `null` renders the document open in the editor (e.g., a layout).
    document: Document | null;
    isEditing?: boolean;
    // The site's layout, used for pages without a layout of their own. `null` renders no layout.
    layout?: DocumentLayout | null;
    children?: React.ReactNode | React.ReactNode[];
}

// Decide where global components render around the page content. A page with a layout picked in its
// settings (built in the admin's layout editor) is rendered in that layout instead.
const siteLayout: DocumentLayout = ({ content }) => (
    <>
        <GlobalComponent component="Demo/Header" />
        {content}
        <GlobalComponent component="Demo/Footer" />
        <GlobalComponent component="Demo/LoginDialog" />
    </>
);

export const DocumentRenderer = ({
    document,
    isEditing,
    layout = siteLayout,
    children
}: DocumentRendererProps) => {
    if (!document && !isEditing) {
        return <NotFound />;
    }

    return (
        <>
            {isEditing ? (
                <DocumentRendererNoSSR
                    document={document}
                    components={editorComponents}
                    layout={layout ?? undefined}
                >
                    {children}
                </DocumentRendererNoSSR>
            ) : (
                <DocumentRendererSSR
                    document={document}
                    components={editorComponents}
                    layout={layout ?? undefined}
                >
                    {children}
                </DocumentRendererSSR>
            )}
        </>
    );
};
