"use client";

import React from "react";
import type { Language } from "@/src/webinySdk";
import { LanguageSelector } from "./LanguageSelector";
import type { LanguagePaths } from "./LanguageSelector";

const navigation = [
  { name: "Menu Item 1", href: "#" },
  { name: "Menu Item 2", href: "#" },
  { name: "Menu Item 3", href: "#" },
];

interface HeaderProps {
  languages?: Language[];
  languagePaths?: LanguagePaths;
  currentLanguageCode?: string;
}

export default function Header({
  languages = [],
  languagePaths = {},
  currentLanguageCode,
}: HeaderProps) {
  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex sm:flex-1">
          <a href="#" className="text-lg font-bold tracking-tight text-primary">
            ACME Inc
          </a>
        </div>
        <div className="hidden sm:flex sm:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-text-muted hover:text-text-base transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {languages.length > 0 && (
            <LanguageSelector
              languages={languages}
              languagePaths={languagePaths}
              currentLanguageCode={currentLanguageCode}
            />
          )}
          <a
            href="#"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 transition-colors"
          >
            Log in
          </a>
        </div>
      </nav>
    </header>
  );
}
