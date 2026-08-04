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

interface Stat {
    value: string;
    label: string;
}

type StatsSectionProps = ComponentProps<{
    headline: string;
    description: string;
    stats: Stat[];
}>;

export function StatsSectionComponent({ inputs }: StatsSectionProps) {
    const stats = inputs.stats ?? [];

    return (
        <Section background="surface">
            <SectionHeading headline={inputs.headline} description={inputs.description} />
            {stats.length > 0 && (
                <dl className="mt-14 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-background p-8 ring-1 ring-border"
                        >
                            <dd className="text-4xl font-semibold tracking-tight text-primary">
                                {stat.value}
                            </dd>
                            <dt className="mt-2 text-sm/6 text-text-muted">{stat.label}</dt>
                        </div>
                    ))}
                </dl>
            )}
        </Section>
    );
}

export const StatsSection = createComponent(StatsSectionComponent, {
    name: "Sections/Stats",
    label: "Stats",
    group: "sections",
    aiContext: "A row of headline numbers with short labels. Use it as social proof.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 14h3v6H4v-6zm5-5h3v11H9V9zm5-5h3v16h-3V4zm5 8h3v8h-3v-8z"/></svg>`,
    inputs: {
        headline: createTextInput({
            label: "Headline",
            defaultValue: "Trusted by teams of every size"
        }),
        description: createLongTextInput({
            label: "Description",
            defaultValue: "Numbers from the last twelve months."
        }),
        stats: createObjectInput({
            label: "Stats",
            list: true,
            fields: [
                createTextInput({ name: "value", label: "Value", defaultValue: "100%" }),
                createTextInput({ name: "label", label: "Label", defaultValue: "Describe it" })
            ]
        })
    },
    defaults: {
        inputs: {
            stats: [
                { value: "12k+", label: "Projects deployed" },
                { value: "40ms", label: "Median response time" },
                { value: "99.99%", label: "Uptime" },
                { value: "24/7", label: "Support" }
            ]
        }
    }
});
