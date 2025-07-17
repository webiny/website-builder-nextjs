"use client";
import React from "react";
import { initializeContentSdk } from "./initializeContentSdk";

export const ContentSdkInitializer = React.memo(({ draftMode }: { draftMode: boolean }) => {
    initializeContentSdk({ preview: draftMode });

    return null;
});

ContentSdkInitializer.displayName = "ContentSdkInitializer";
