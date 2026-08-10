"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { type Document, sdk } from "@webiny/sdk-nextjs";
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
    document: Document | null;
    isEditing?: boolean;
    remoteComponents?: RemoteComponentEntry[];
    children?: React.ReactNode | React.ReactNode[];
}

export const DocumentRenderer = ({
    document,
    isEditing,
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
                <DocumentRendererNoSSR document={document} components={allComponents}>
                    {children}
                </DocumentRendererNoSSR>
            ) : (
                <DocumentRendererSSR document={document} components={allComponents}>
                    {children}
                </DocumentRendererSSR>
            )}
        </>
    );
};
