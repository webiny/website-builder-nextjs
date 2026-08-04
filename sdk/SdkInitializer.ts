"use client";
import React from "react";
import type { WebsiteBuilderThemeInput } from "@webiny/sdk-nextjs";
import { initializeSdk } from "./initializeSdk";

interface SdkInitializerProps {
    tenantId?: string;
    draftMode: boolean;
    theme: WebsiteBuilderThemeInput;
}

export const SdkInitializer = React.memo(({ draftMode, theme, tenantId }: SdkInitializerProps) => {
    initializeSdk({ preview: draftMode, theme, tenantId });

    return null;
});

SdkInitializer.displayName = "ContentSdkInitializer";
