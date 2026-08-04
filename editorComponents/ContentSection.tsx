"use client";
import React from "react";
import {
    createComponent,
    createFileInput,
    createLongTextInput,
    createSelectInput,
    createTextInput,
    type ComponentProps
} from "@webiny/sdk-nextjs";
import { CtaLink, Section, type ImageValue } from "./Section";

type ContentSectionProps = ComponentProps<{
    eyebrow: string;
    headline: string;
    body: string;
    ctaLabel: string;
    ctaUrl: string;
    image: ImageValue | null;
    imagePosition: string;
}>;

export function ContentSectionComponent({ inputs }: ContentSectionProps) {
    const imageFirst = inputs.imagePosition === "left";

    return (
        <Section background="base">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={imageFirst ? "lg:order-2" : ""}>
                    {inputs.eyebrow && (
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                            {inputs.eyebrow}
                        </p>
                    )}
                    {inputs.headline && (
                        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-base sm:text-4xl">
                            {inputs.headline}
                        </h2>
                    )}
                    {inputs.body && (
                        <div className="mt-6 whitespace-pre-line text-base/7 text-text-muted">
                            {inputs.body}
                        </div>
                    )}
                    {inputs.ctaLabel && (
                        <div className="mt-8">
                            <CtaLink label={inputs.ctaLabel} url={inputs.ctaUrl} />
                        </div>
                    )}
                </div>
                <div className={imageFirst ? "lg:order-1" : ""}>
                    {inputs.image?.src ? (
                        <img
                            src={inputs.image.src}
                            alt={inputs.headline}
                            className="w-full rounded-xl ring-1 ring-border shadow-lg"
                        />
                    ) : (
                        <div className="aspect-[4/3] w-full rounded-xl bg-surface ring-1 ring-border" />
                    )}
                </div>
            </div>
        </Section>
    );
}

export const ContentSection = createComponent(ContentSectionComponent, {
    name: "Sections/Content",
    label: "Content + Image",
    group: "sections",
    aiContext:
        "A two column section pairing a block of text with an image. Use it to explain a single idea in more depth.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 5h8v2H3V5zm0 4h8v2H3V9zm0 4h6v2H3v-2zm10-8h8v10h-8V5z"/></svg>`,
    inputs: {
        eyebrow: createTextInput({ label: "Eyebrow", defaultValue: "How it works" }),
        headline: createTextInput({
            label: "Headline",
            defaultValue: "Content and code, finally in one place"
        }),
        body: createLongTextInput({
            label: "Body",
            description: "Line breaks are preserved.",
            defaultValue:
                "Developers own the components. Editors own the content. Both work in the same editor, on the same page, without stepping on each other.\n\nEverything is versioned, so publishing is never a surprise."
        }),
        ctaLabel: createTextInput({ label: "Button label", defaultValue: "Read the docs" }),
        ctaUrl: createTextInput({ label: "Button URL", defaultValue: "/" }),
        image: createFileInput({
            label: "Image",
            description: "Shown as a placeholder box until you pick a file.",
            allowedFileTypes: ["image/*"]
        }),
        imagePosition: createSelectInput({
            label: "Image position",
            defaultValue: "right",
            options: [
                { label: "Right", value: "right" },
                { label: "Left", value: "left" }
            ]
        })
    }
});
