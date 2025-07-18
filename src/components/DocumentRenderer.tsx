"use client";
import React from "react";
import dynamic from "next/dynamic";
import { editorComponents } from "../editorComponents";
import { type Document } from "@webiny/website-builder-nextjs";

// Dynamically import DocumentRenderer with SSR enabled for non-editing mode.
// This component will be server-side rendered for better SEO and initial load performance.
const DocumentRendererSSR = dynamic(
    // eslint-disable-next-line import/dynamic-import-chunkname
    () => import("@webiny/website-builder-nextjs").then(m => ({ default: m.DocumentRenderer })),
    { ssr: true }
);

// Dynamically import DocumentRenderer with SSR disabled for editing mode.
// This prevents hydration mismatches and allows client-only behavior needed during editing.
const DocumentRendererNoSSR = dynamic(
    // eslint-disable-next-line import/dynamic-import-chunkname
    () => import("@webiny/website-builder-nextjs").then(m => ({ default: m.DocumentRenderer })),
    { ssr: false }
);

interface DocumentRendererProps {
    document: Document | null;
    isEditing?: boolean;
    children?: React.ReactNode | React.ReactNode[];
}

// Main DocumentRenderer component that decides whether to render with SSR or without SSR
// based on the `isEditing` flag. If no document is provided, it shows a simple "Page Not Found" message.
export const DocumentRenderer = ({ document, isEditing, children }: DocumentRendererProps) => {
    // Render the client-only version when editing to avoid SSR issues,
    // otherwise render server-side for production view.
    return isEditing ? (
        <DocumentRendererNoSSR document={document} components={editorComponents}>
            {children}
        </DocumentRendererNoSSR>
    ) : (
        <DocumentRendererSSR document={document} components={editorComponents}>
            {children}
        </DocumentRendererSSR>
    );
};
