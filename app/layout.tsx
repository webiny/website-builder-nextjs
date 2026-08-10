"use server";
import React from "react";
import { draftMode } from "next/headers";
import { SdkInitializer, getTenant, initializeSdk, sdk } from "@/sdk";
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
    const resolvedCss = tenantTheme ? (resolvedTheme.css ?? css) : css;
    const tenantFontUrl = tenantTheme ? getTenantFontUrl(tenantTheme) : null;

    // The theme's `<head>` tags: a stylesheet <link> to the stable `/_webiny/theme/tokens.css` (which
    // defines the `--wby-*` variables the Tailwind tokens resolve to, and loads the theme's fonts via
    // its own @import) plus a static preconnect. No theme resolution here — delivery serves whichever
    // version is active at that stable URL with a short TTL, so the tag set is the same for everyone and
    // a themeless site simply serves an empty stylesheet, leaving the `--wb-theme-*` fallbacks in play.
    const themeHeadTags = sdk.theme.getHeadTags();

    return (
        <html lang="en" className={tenantTheme?.font ? undefined : inter.className}>
            <head>
                {tenantFontUrl && (
                    <>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link
                            rel="preconnect"
                            href="https://fonts.gstatic.com"
                            crossOrigin="anonymous"
                        />
                        <link rel="stylesheet" href={tenantFontUrl} />
                    </>
                )}
                <style>{resolvedCss}</style>
                {themeHeadTags.map((tag, index) => (
                    <link
                        key={`wby-theme-${index}`}
                        rel={tag.rel}
                        href={tag.href}
                        crossOrigin={tag.crossOrigin}
                        as={tag.as}
                        type={tag.type}
                    />
                ))}
                {tenantTheme?.websiteTitle && <title>{tenantTheme.websiteTitle}</title>}
            </head>
            <body>
                <SdkInitializer draftMode={isEnabled} theme={resolvedTheme} tenantId={tenantId} />
                {children}
            </body>
        </html>
    );
}
