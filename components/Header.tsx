"use client";

import React from "react";
import type { Language } from "@webiny/sdk-nextjs";
import { LanguageSelector } from "./LanguageSelector";
import type { LanguagePaths } from "./LanguageSelector";

const navigation = [
    { name: "Menu Item 1", href: "#" },
    { name: "Menu Item 2", href: "#" },
    { name: "Menu Item 3", href: "#" }
];

interface HeaderProps {
    languages?: Language[];
    languagePaths?: LanguagePaths;
    currentLanguageCode?: string;
}

export function Header({ languages = [], languagePaths = {}, currentLanguageCode }: HeaderProps) {
  return null;
}
