"use server";
import React from "react";
import { draftMode } from "next/headers";
import { ContentSdkInitializer } from "@/src/contentSdk";
import "@/src/theme/globals.css";
import { getTheme } from "@/src/theme";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isEnabled } = await draftMode();
    const { theme, css } = await getTheme();

    return (
        <html lang="en">
            <head>
                <style>{css}</style>
            </head>
            <body>
                <ContentSdkInitializer draftMode={isEnabled} theme={theme} />
                {children}
            </body>
        </html>
    );
}
