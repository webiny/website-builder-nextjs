"use client";

import type { CmsEntry } from "@webiny/sdk-nextjs";
import React from "react";

type AuthorValues = {
    name: string;
    bio: string;
    avatar: string;
};

export interface AuthorBlockProps {
    author: CmsEntry<AuthorValues> | null;
}

export const AuthorBlockComponent = ({ author }: AuthorBlockProps) => {
    if (!author || !("values" in author)) {
        return <div className="py-4 text-sm text-gray-400">Loading author...</div>;
    }

    const values = author.values;

    return (
        <section className="py-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
                <img
                    src={values.avatar}
                    alt={values.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{values.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{values.bio}</p>
                </div>
            </div>
        </section>
    );
};
