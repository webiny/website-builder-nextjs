"use client";
import React from "react";
import {
    createComponent,
    createLongTextInput,
    createSelectInput,
    createTextInput,
    type ComponentProps
} from "@webiny/sdk-nextjs";
import { CtaLink, Section, SectionHeading } from "./Section";

type CtaSectionProps = ComponentProps<{
    headline: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
    style: string;
}>;

export function CtaSectionComponent({ inputs }: CtaSectionProps) {
    const inverted = inputs.style !== "quiet";

    return (
        <Section background={inverted ? "primary" : "surface"}>
            <div className="flex flex-col items-center gap-8 text-center">
                <SectionHeading
                    headline={inputs.headline}
                    description={inputs.description}
                    inverted={inverted}
                />
                <CtaLink
                    label={inputs.ctaLabel}
                    url={inputs.ctaUrl}
                    variant={inverted ? "inverted" : "primary"}
                />
            </div>
        </Section>
    );
}

export const CtaSection = createComponent(CtaSectionComponent, {
    name: "Sections/CTA",
    label: "Call to action",
    group: "sections",
    aiContext:
        "A closing band with one headline and one button. Use it once per page, as the last section.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6h18v12H3V6zm2 2v8h14V8H5zm3 2h8v4H8v-4z"/></svg>`,
    inputs: {
        headline: createTextInput({ label: "Headline", defaultValue: "Ready to get started?" }),
        description: createLongTextInput({
            label: "Description",
            defaultValue: "Spin up a project locally in a couple of minutes. No credit card needed."
        }),
        ctaLabel: createTextInput({ label: "Button label", defaultValue: "Start building" }),
        ctaUrl: createTextInput({ label: "Button URL", defaultValue: "/" }),
        style: createSelectInput({
            label: "Style",
            defaultValue: "bold",
            options: [
                { label: "Bold (brand color)", value: "bold" },
                { label: "Quiet", value: "quiet" }
            ]
        })
    }
});
