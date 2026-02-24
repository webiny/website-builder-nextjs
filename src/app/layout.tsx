"use server";
import React from "react";
import { draftMode } from "next/headers";
import { ContentSdkInitializer, getTenant } from "@/src/contentSdk";
import "@/src/theme/tailwind.css";
import { getWbTheme } from "@/src/theme/wbTheme";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();
  const { theme, css } = await getWbTheme();
  const tenantId = await getTenant();

  return (
    <html lang="en">
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
