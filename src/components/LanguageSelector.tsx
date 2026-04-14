"use client";

import React, { useState, useRef, useEffect } from "react";
import type { Language } from "@webiny/sdk";

// { en: '/about', de: '/de/about', ... }
export type LanguagePaths = Record<string, string>;

interface LanguageSelectorProps {
  languages: Language[];
  languagePaths: LanguagePaths;
  currentLanguageCode: string | null | undefined;
}

export function LanguageSelector({
  languages,
  languagePaths,
  currentLanguageCode,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!languages.length) return null;

  const defaultLanguage = languages.find((l) => l.isDefault);
  const activeCode = currentLanguageCode ?? defaultLanguage?.code ?? null;

  const activeLabel =
    languages.find((l) => l.code === activeCode)?.name ??
    activeCode?.toUpperCase() ??
    "—";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-base hover:bg-surface transition-colors cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {activeLabel}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 min-w-[8rem] rounded-md border border-border bg-background shadow-md z-50">
          <ul role="listbox" className="py-1">
            {languages.map((lang) => {
              const isActive = lang.code === activeCode;
              const path = languagePaths[lang.code] ?? `/${lang.code}`;

              return (
                <li key={lang.code} role="option" aria-selected={isActive}>
                  <a
                    href={path}
                    className={`block px-4 py-2 text-sm transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "font-semibold text-primary bg-surface"
                        : "text-text-base hover:bg-surface"
                    }`}
                  >
                    {lang.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
