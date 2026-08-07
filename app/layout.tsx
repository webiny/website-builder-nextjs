"use server";
import React from "react";
import { draftMode } from "next/headers";
import { SdkInitializer, initializeSdk } from "@/sdk";
import { getTenant } from "@/sdk/getTenant";
import "@/theme/tailwind.css";
import { theme, css } from "@/theme/theme";
import { Inter } from "next/font/google";
import { fetchTenantTheme } from "@/utils/fetchTenantTheme";
import { mergeThemes, getTenantFontUrl } from "@/utils/mergeThemes";

// Fallback font
const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"]
});

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isEnabled } = await draftMode();
    const tenantId = await getTenant();

    initializeSdk({ preview: isEnabled, tenantId });

    const tenantTheme = await fetchTenantTheme();
    const resolvedTheme = tenantTheme ? mergeThemes(theme, tenantTheme) : theme;
    const resolvedCss = tenantTheme ? resolvedTheme.css ?? css : css;
    const tenantFontUrl = tenantTheme ? getTenantFontUrl(tenantTheme) : null;

    return (
        <html lang="en" className={tenantTheme?.font ? undefined : inter.className}>
            <head>
                {tenantFontUrl && (
                    <>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                        <link rel="stylesheet" href={tenantFontUrl} />
                    </>
                )}
                <style>{resolvedCss}</style>
                {tenantTheme?.websiteTitle && <title>{tenantTheme.websiteTitle}</title>}
            </head>
            <body>
                <SdkInitializer draftMode={isEnabled} theme={resolvedTheme} tenantId={tenantId} />
                {children}
            </body>
        </html>
    );
}
