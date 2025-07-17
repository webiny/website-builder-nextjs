"use client";

import React from "react";

const navigation = [
    { name: "Product 1", href: "#" },
    { name: "Features 2", href: "#" },
    { name: "Marketplace 3", href: "#" },
    { name: "Company 4", href: "#" }
];

export default function Header() {
    return (
        <header className="bg-white">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            >
                <div className="flex sm:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="hidden sm:flex sm:gap-x-12">
                    {navigation.map(item => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm/6 font-semibold text-gray-900"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm/6 font-semibold text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}
