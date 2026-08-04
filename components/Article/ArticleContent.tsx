"use client";

import React from "react";
import {
    EntryRenderer,
    DynamicZoneField,
    RefField,
    useEntry,
    createReactiveComponent
} from "@webiny/sdk-nextjs";
import type { CmsEntry, CmsModelDefinition } from "@webiny/sdk-nextjs";
import { articleComponents } from "./articleComponents";

type Author = {
    name: string;
    bio: string;
    avatar: string;
};

interface ArticleContentProps {
    entry: CmsEntry | null;
    model: CmsModelDefinition;
}

export const ArticleContent = ({ entry, model }: ArticleContentProps) => {
    return (
        <EntryRenderer entry={entry} model={model} components={articleComponents}>
            <ArticleLayout />
        </EntryRenderer>
    );
};

const ArticleLayout = createReactiveComponent(() => {
    const entry = useEntry<{
        title: string;
        description: string;
        author: RefField.Value;
        content: any;
    }>();

    if (!entry) {
        return null;
    }

    return (
        <div className="mx-auto max-w-[1100px] px-[10px] flex flex-col antialiased">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    {entry.values.title ?? "Untitled"}
                </span>
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                {entry.values.description ?? ""}
            </p>

            <RefField<Author>
                value={entry.values.author}
                loading={<p className="text-sm text-gray-400">Loading author...</p>}
            >
                {([author]) => (
                    <div className="flex items-center gap-3 my-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-500">Written by</p>
                            <p className="font-semibold">{author.values.name}</p>
                        </div>
                    </div>
                )}
            </RefField>

            <DynamicZoneField value={entry.values.content} />
        </div>
    );
});
