"use server";
import React from "react";
import { draftMode } from "next/headers";
import { SdkInitializer, initializeSdk, getTenant } from "@/sdk";
import "@/theme/tailwind.css";
import { theme, css } from "@/theme/theme";
import { Inter } from "next/font/google";
import { fetchTenantTheme } from "@/utils/fetchTenantTheme";
import { fetchThemeCss } from "@/utils/fetchThemeCss";
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

    const [tenantTheme, themeCss] = await Promise.all([fetchTenantTheme(), fetchThemeCss(tenantId)]);
    const resolvedTheme = tenantTheme ? mergeThemes(theme, tenantTheme) : theme;
    const resolvedCss = tenantTheme ? resolvedTheme.css ?? css : css;
    const tenantFontUrl = tenantTheme ? getTenantFontUrl(tenantTheme) : null;

    return (
        /*
         * Light mode always. The theme stylesheet switches to its dark values when the visitor's
         * system is in dark mode, unless the page opts out with this attribute. A migrated site was
         * captured and generated in its light appearance only, so the dark values (the theme's
         * defaults) turned its pages a dark blue the source never had.
         */
        <html
            lang="en"
            data-wby-theme-mode="light"
            className={tenantTheme?.font ? undefined : inter.className}
        >
            <head>
                {tenantFontUrl && (
                    <>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                        <link rel="stylesheet" href={tenantFontUrl} />
                    </>
                )}
                {/* The tenant's Theme App theme: the `--wby-*` values its pages' elements read. */}
                {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
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
