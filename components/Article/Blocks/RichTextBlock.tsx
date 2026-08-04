import React from "react";

export interface RichTextBlockProps {
    content: { html: string; state: string } | string;
}

export const RichTextBlockComponent = (props: RichTextBlockProps) => {
    const richText = typeof props.content === "string" ? props.content : props.content?.html;

    return (
        <div
            className="my-8 prose prose-slate max-w-none prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: richText ?? "" }}
        />
    );
};
