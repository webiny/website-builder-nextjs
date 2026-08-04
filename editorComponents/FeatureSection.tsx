"use client";
import React from "react";
import {
    BoltIcon,
    ChartBarIcon,
    CubeIcon,
    GlobeAltIcon,
    PuzzlePieceIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";
import {
    createComponent,
    createLongTextInput,
    createObjectInput,
    createSelectInput,
    createTextInput,
    type ComponentProps
} from "@webiny/sdk-nextjs";
import { Section, SectionHeading } from "./Section";

const ICONS = {
    sparkles: SparklesIcon,
    bolt: BoltIcon,
    shield: ShieldCheckIcon,
    chart: ChartBarIcon,
    globe: GlobeAltIcon,
    cube: CubeIcon,
    puzzle: PuzzlePieceIcon,
    rocket: RocketLaunchIcon
};

const ICON_OPTIONS = [
    { label: "Sparkles", value: "sparkles" },
    { label: "Bolt", value: "bolt" },
    { label: "Shield", value: "shield" },
    { label: "Chart", value: "chart" },
    { label: "Globe", value: "globe" },
    { label: "Cube", value: "cube" },
    { label: "Puzzle", value: "puzzle" },
    { label: "Rocket", value: "rocket" }
];

// Full class names per option, so Tailwind's scanner can find them.
const COLUMNS: Record<string, string> = {
    "2": "sm:grid-cols-2",
    "3": "sm:grid-cols-2 lg:grid-cols-3",
    "4": "sm:grid-cols-2 lg:grid-cols-4"
};

interface Feature {
    icon: string;
    title: string;
    description: string;
}

type FeatureSectionProps = ComponentProps<{
    eyebrow: string;
    headline: string;
    description: string;
    columns: string;
    features: Feature[];
}>;

export function FeatureSectionComponent({ inputs }: FeatureSectionProps) {
    const features = inputs.features ?? [];
    const columns = COLUMNS[inputs.columns] ?? COLUMNS["3"];

    return (
        <Section background="base">
            <SectionHeading
                eyebrow={inputs.eyebrow}
                headline={inputs.headline}
                description={inputs.description}
            />
            {features.length > 0 && (
                <dl className={`mt-16 grid grid-cols-1 gap-10 ${columns}`}>
                    {features.map((feature, index) => {
                        const Icon = ICONS[feature.icon as keyof typeof ICONS] ?? SparklesIcon;

                        return (
                            <div key={index}>
                                <dt className="flex items-center gap-3 text-base font-semibold text-text-base">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                                        <Icon aria-hidden="true" className="size-6 text-white" />
                                    </span>
                                    {feature.title}
                                </dt>
                                <dd className="mt-4 text-base/7 text-text-muted">
                                    {feature.description}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            )}
        </Section>
    );
}

export const FeatureSection = createComponent(FeatureSectionComponent, {
    name: "Sections/Features",
    label: "Features",
    group: "sections",
    aiContext:
        "A grid of short feature descriptions, each with an icon. Use it to explain what a product does.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>`,
    inputs: {
        eyebrow: createTextInput({ label: "Eyebrow", defaultValue: "Everything you need" }),
        headline: createTextInput({
            label: "Headline",
            defaultValue: "Built for teams that ship"
        }),
        description: createLongTextInput({
            label: "Description",
            defaultValue:
                "Every piece of the stack is editable, typed, and version controlled — no black boxes."
        }),
        columns: createSelectInput({
            label: "Columns",
            defaultValue: "3",
            options: [
                { label: "Two", value: "2" },
                { label: "Three", value: "3" },
                { label: "Four", value: "4" }
            ]
        }),
        features: createObjectInput({
            label: "Features",
            list: true,
            fields: [
                createSelectInput({
                    name: "icon",
                    label: "Icon",
                    defaultValue: "sparkles",
                    options: ICON_OPTIONS
                }),
                createTextInput({ name: "title", label: "Title", defaultValue: "New feature" }),
                createLongTextInput({
                    name: "description",
                    label: "Description",
                    defaultValue: "Describe what this feature does for your visitors."
                })
            ]
        })
    },
    defaults: {
        inputs: {
            features: [
                {
                    icon: "bolt",
                    title: "Instant previews",
                    description:
                        "Edit a page and watch it render in your own frontend, right as you type."
                },
                {
                    icon: "cube",
                    title: "Your components",
                    description:
                        "Register React components from your codebase and make them editable, without a plugin."
                },
                {
                    icon: "shield",
                    title: "Safe by default",
                    description:
                        "Granular permissions and full revision history for every page and content entry."
                }
            ]
        }
    }
});
