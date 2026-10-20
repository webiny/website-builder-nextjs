"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { type Document, type DocumentLayout, GlobalComponent, sdk } from "@webiny/sdk-nextjs";
import * as sdkNextjs from "@webiny/sdk-nextjs";
import type { RemoteComponentEntry } from "@webiny/sdk-nextjs";
import { editorComponents } from "../editorComponents";
import { NotFound } from "./NotFound";

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
    remoteComponents?: RemoteComponentEntry[];
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
    remoteComponents = [],
    children
}: DocumentRendererProps) => {
    const { allComponents, remoteCss } = useMemo(() => {
        const hydrated = remoteComponents
            .map(entry => sdk.components.hydrateComponent(entry, { sdk: sdkNextjs, React }))
            .filter(Boolean);

        return {
            allComponents: [
                ...editorComponents,
                ...hydrated.map(h => ({ component: h.component, manifest: h.manifest }))
            ],
            remoteCss: hydrated.map(h => h.css).filter(Boolean).join("\n")
        };
    }, [remoteComponents]);

    if (!document && !isEditing) {
        return <NotFound />;
    }

    return (
        <>
            {remoteCss ? <style dangerouslySetInnerHTML={{ __html: remoteCss }} /> : null}
            {isEditing ? (
                <DocumentRendererNoSSR
                    document={document}
                    components={allComponents}
                    layout={layout ?? undefined}
                >
                    {children}
                </DocumentRendererNoSSR>
            ) : (
                <DocumentRendererSSR
                    document={document}
                    components={allComponents}
                    layout={layout ?? undefined}
                >
                    {children}
                </DocumentRendererSSR>
            )}
        </>
    );
};
