"use client";
import React from "react";
import type { WebsiteBuilderThemeInput } from "@webiny/website-builder-nextjs";
import { initializeContentSdk } from "./initializeContentSdk";

interface ContentSdkInitializerProps {
    tenantId?: string;
    draftMode: boolean;
    theme: WebsiteBuilderThemeInput;
}

export const ContentSdkInitializer = React.memo(
    ({ draftMode, theme, tenantId }: ContentSdkInitializerProps) => {
        initializeContentSdk({ preview: draftMode, theme, tenantId });

        return null;
    }
);

ContentSdkInitializer.displayName = "ContentSdkInitializer";
