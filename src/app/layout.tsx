"use server";
import React from "react";
import { draftMode } from "next/headers";
import { ContentSdkInitializer, getTenant } from "@/src/contentSdk";
import "@/src/theme/globals.css";
import { getTheme } from "@/src/theme";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isEnabled } = await draftMode();
    const { theme, css } = await getTheme();
    const tenantId = await getTenant();

    return (
        <html lang="en">
            <head>
                <style>{css}</style>
            </head>
            <body>
                <ContentSdkInitializer draftMode={isEnabled} theme={theme} tenantId={tenantId} />
                {children}
            </body>
        </html>
    );
}
