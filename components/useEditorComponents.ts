"use client";
import React, { useMemo } from "react";
import { sdk } from "@webiny/sdk-nextjs";
import * as sdkNextjs from "@webiny/sdk-nextjs";
import type { RemoteComponentEntry } from "@webiny/sdk-nextjs";
import { editorComponents } from "../editorComponents";

// The site's components, and the remote components loaded for it, with the CSS the remote ones bring.
export const useEditorComponents = (remoteComponents: RemoteComponentEntry[]) => {
    return useMemo(() => {
        const hydrated = remoteComponents
            .map(entry => sdk.components.hydrateComponent(entry, { sdk: sdkNextjs, React }))
            .filter(hydrated => hydrated !== null);

        return {
            allComponents: [
                ...editorComponents,
                ...hydrated.map(h => ({ component: h.component, manifest: h.manifest }))
            ],
            remoteCss: hydrated
                .map(h => h.css)
                .filter(Boolean)
                .join("\n")
        };
    }, [remoteComponents]);
};
