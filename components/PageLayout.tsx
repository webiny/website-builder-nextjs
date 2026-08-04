import React from "react";
import { Header } from "./Header";
import type { Language } from "@webiny/sdk-nextjs";
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
    currentLanguageCode
}: PageLayoutProps) => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header
                languages={languages}
                languagePaths={languagePaths}
                currentLanguageCode={currentLanguageCode}
            />
            {/* Sections are full width bands that bring their own container and padding. */}
            <main className="flex-1 w-full">{children}</main>
        </div>
    );
};
