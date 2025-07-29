"use client";
import React from "react";
import type { WebsiteBuilderThemeInput } from "@webiny/website-builder-nextjs";
import { initializeContentSdk } from "./initializeContentSdk";

interface ContentSdkInitializerProps {
    draftMode: boolean;
    theme: WebsiteBuilderThemeInput;
}

export const ContentSdkInitializer = React.memo(
    ({ draftMode, theme }: ContentSdkInitializerProps) => {
        initializeContentSdk({ preview: draftMode, theme });

        return null;
    }
);

ContentSdkInitializer.displayName = "ContentSdkInitializer";
