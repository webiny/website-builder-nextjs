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
            {/*
             * Full-bleed on purpose. A migrated page's components carry their own layout — hero
             * bands, footers and section backgrounds that run edge to edge, each applying its own
             * inner max-width — so a wrapper that centres and pads them boxes every one of those in
             * a margin the source site does not have.
             *
             * Measured against source screenshots across four migrated sites, this single wrapper was
             * the largest visual difference on all 28 comparable pages, and it disguised how closely
             * some of them otherwise match.
             */}
            <main className="flex-1 w-full">{children}</main>
        </div>
    );
};
