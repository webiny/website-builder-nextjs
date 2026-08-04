"use client";
import React from "react";
import {
    createComponent,
    createLongTextInput,
    createObjectInput,
    createTextInput,
    type ComponentProps
} from "@webiny/sdk-nextjs";
import { Section, SectionHeading } from "./Section";

interface FaqItem {
    question: string;
    answer: string;
}

type FaqSectionProps = ComponentProps<{
    headline: string;
    description: string;
    items: FaqItem[];
}>;

export function FaqSectionComponent({ inputs }: FaqSectionProps) {
    const items = inputs.items ?? [];

    return (
        <Section background="base">
            <SectionHeading
                headline={inputs.headline}
                description={inputs.description}
                align="left"
            />
            {items.length > 0 && (
                <dl className="mt-12 max-w-3xl divide-y divide-border border-t border-border">
                    {items.map((item, index) => (
                        // `details` gives us expand/collapse without any client-side JavaScript.
                        <details key={index} className="group py-6">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-text-base marker:content-none">
                                {item.question}
                                <span
                                    aria-hidden="true"
                                    className="text-text-muted transition-transform group-open:rotate-45"
                                >
                                    +
                                </span>
                            </summary>
                            <p className="mt-4 whitespace-pre-line text-base/7 text-text-muted">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </dl>
            )}
        </Section>
    );
}

export const FaqSection = createComponent(FaqSectionComponent, {
    name: "Sections/FAQ",
    label: "FAQ",
    group: "sections",
    aiContext: "A list of expandable questions and answers. Place it near the bottom of a page.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h10v2H4v-2z"/></svg>`,
    inputs: {
        headline: createTextInput({
            label: "Headline",
            defaultValue: "Frequently asked questions"
        }),
        description: createLongTextInput({
            label: "Description",
            defaultValue: "Can't find what you're looking for? Get in touch."
        }),
        items: createObjectInput({
            label: "Questions",
            list: true,
            fields: [
                createTextInput({
                    name: "question",
                    label: "Question",
                    defaultValue: "Ask a question"
                }),
                createLongTextInput({
                    name: "answer",
                    label: "Answer",
                    defaultValue: "And answer it here."
                })
            ]
        })
    },
    defaults: {
        inputs: {
            items: [
                {
                    question: "Do I have to use Next.js?",
                    answer: "No. The editor talks to your frontend over a small SDK, and there are packages for React, Next.js, Nuxt, and Vue."
                },
                {
                    question: "Can I keep my existing components?",
                    answer: "Yes. You register the components you already have, describe their inputs, and they become editable in place."
                },
                {
                    question: "Where does my content live?",
                    answer: "In your own cloud account. Webiny deploys into your infrastructure, so nothing leaves it."
                }
            ]
        }
    }
});
