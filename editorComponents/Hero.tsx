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
import { CtaLink, type ImageValue } from "./Section";

type HeroProps = ComponentProps<{
    eyebrow: string;
    headline: string;
    description: string;
    primaryLabel: string;
    primaryUrl: string;
    secondaryLabel: string;
    secondaryUrl: string;
    image: ImageValue | null;
    align: string;
}>;

export function HeroSection({ inputs }: HeroProps) {
    const isCentered = inputs.align !== "left";

    return (
        <section className="w-full bg-background py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
                    {inputs.eyebrow && (
                        <span className="inline-block rounded-full px-3 py-1 text-sm/6 text-text-muted ring-1 ring-border">
                            {inputs.eyebrow}
                        </span>
                    )}
                    {inputs.headline && (
                        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-text-base sm:text-6xl">
                            {inputs.headline}
                        </h1>
                    )}
                    {inputs.description && (
                        <p className="mt-6 text-pretty text-lg font-medium text-text-muted sm:text-xl/8">
                            {inputs.description}
                        </p>
                    )}
                    <div
                        className={`mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 ${
                            isCentered ? "justify-center" : ""
                        }`}
                    >
                        <CtaLink label={inputs.primaryLabel} url={inputs.primaryUrl} />
                        <CtaLink
                            label={inputs.secondaryLabel}
                            url={inputs.secondaryUrl}
                            variant="link"
                        />
                    </div>
                </div>
                {inputs.image?.src && (
                    <div className="mt-16 overflow-hidden rounded-xl ring-1 ring-border shadow-xl">
                        <img src={inputs.image.src} alt={inputs.headline} className="w-full" />
                    </div>
                )}
            </div>
        </section>
    );
}

export const Hero = createComponent(HeroSection, {
    name: "Sections/Hero",
    label: "Hero",
    group: "sections",
    aiContext:
        "The opening section of a page: a headline, a short pitch, and up to two calls to action. Use at most one per page, at the very top.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 4h18v4H3V4zm0 6h12v3H3v-3zm0 5h8v3H3v-3z"/></svg>`,
    inputs: {
        eyebrow: createTextInput({
            label: "Eyebrow",
            description: "Small pill of text above the headline. Leave empty to hide it.",
            defaultValue: "Now in public beta"
        }),
        headline: createTextInput({
            label: "Headline",
            defaultValue: "Build websites your whole team can edit"
        }),
        description: createLongTextInput({
            label: "Description",
            defaultValue:
                "Ship pages in minutes with a visual editor, your own components, and content that stays in sync across every channel."
        }),
        primaryLabel: createTextInput({
            label: "Primary button label",
            defaultValue: "Get started"
        }),
        primaryUrl: createTextInput({ label: "Primary button URL", defaultValue: "/" }),
        secondaryLabel: createTextInput({
            label: "Secondary link label",
            defaultValue: "Learn more"
        }),
        secondaryUrl: createTextInput({ label: "Secondary link URL", defaultValue: "/" }),
        image: createFileInput({
            label: "Image",
            description: "Optional screenshot or illustration shown below the text.",
            allowedFileTypes: ["image/*"]
        }),
        align: createSelectInput({
            label: "Alignment",
            defaultValue: "center",
            options: [
                { label: "Center", value: "center" },
                { label: "Left", value: "left" }
            ]
        })
    }
});
