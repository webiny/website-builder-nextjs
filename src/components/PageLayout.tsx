import React from "react";
import Header from "./Header";
import type { Language } from "@/src/webinySdk";
import type { LanguagePaths } from "./LanguageSelector";

interface PageLayoutProps {
  children: React.ReactNode;
  languages?: Language[];
  languagePaths?: LanguagePaths;
  currentLanguageCode?: string;
}

export const PageLayout = ({
  children,
  languages,
  languagePaths,
  currentLanguageCode,
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        languages={languages}
        languagePaths={languagePaths}
        currentLanguageCode={currentLanguageCode}
      />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};
