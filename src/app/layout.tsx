"use server";
import React from "react";
import { draftMode } from "next/headers";
import { ContentSdkInitializer, getTenant } from "@/src/contentSdk";
import "@/src/theme/tailwind.css";
import { theme, css } from "@/src/theme/theme";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  const tenantId = await getTenant();

  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <style>{css}</style>
      </head>
      <body>
        <ContentSdkInitializer
          draftMode={isEnabled}
          theme={theme}
          tenantId={tenantId}
        />
        {children}
      </body>
    </html>
  );
}
