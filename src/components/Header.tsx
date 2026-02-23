"use client";

import React from "react";

const navigation = [
  { name: "Menu Item 1", href: "#" },
  { name: "Menu Item 2", href: "#" },
  { name: "Menu Item 3", href: "#" },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex sm:flex-1">
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-indigo-600"
          >
            ACME Inc
          </a>
        </div>
        <div className="hidden sm:flex sm:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Log in
          </a>
        </div>
      </nav>
    </header>
  );
}
