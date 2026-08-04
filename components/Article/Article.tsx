"use client";

import React from "react";
import "./lexical.css";
import dynamic from "next/dynamic";
import type { CmsEntry, CmsModelDefinition } from "@webiny/sdk-nextjs";

const ArticleContentSSR = dynamic(() => import("./ArticleContent").then(m => m.ArticleContent), {
    ssr: true
});

const ArticleContentNoSSR = dynamic(() => import("./ArticleContent").then(m => m.ArticleContent), {
    ssr: false
});

interface ArticleProps {
    entry: CmsEntry | null;
    model: CmsModelDefinition;
    isEditing?: boolean;
}

export const Article = ({ entry, model, isEditing }: ArticleProps) => {
    if (!entry && !isEditing) {
        return <div className="p-8">Article not found.</div>;
    }

    return isEditing ? (
        <ArticleContentNoSSR entry={entry} model={model} />
    ) : (
        <ArticleContentSSR entry={entry} model={model} />
    );
};
