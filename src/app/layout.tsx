import React from "react";
import { draftMode } from "next/headers";
import { ContentSdkInitializer } from "@/src/contentSdk";
import "./globals.css";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isEnabled } = await draftMode();

    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </head>
            <body>
                <ContentSdkInitializer draftMode={isEnabled} />
                {children}
            </body>
        </html>
    );
}
