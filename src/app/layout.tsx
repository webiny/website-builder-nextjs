"use server";
import React from "react";
import { draftMode } from "next/headers";
import { ContentSdkInitializer, getTenant } from "@/src/contentSdk";
import "@/src/theme/tailwind.css";
import { theme, css } from "@/src/theme/theme";
import { getTenantThemeCss } from "@/src/lib/getTenantThemeCss";
import { Inter } from "next/font/google";

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
  const tenantThemeCss = await getTenantThemeCss(tenantId);

  return (
    <html lang="en" className={`${inter.className}`}>
      <head>
        <style>{css}</style>
        {tenantThemeCss && <style>{tenantThemeCss}</style>}
      </head>
      <body>
        <ContentSdkInitializer draftMode={isEnabled} theme={theme} tenantId={tenantId} />
        {children}
      </body>
    </html>
  );
}
