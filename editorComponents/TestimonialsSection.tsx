"use client";
import React from "react";
import {
    createComponent,
    createFileInput,
    createLongTextInput,
    createObjectInput,
    createTextInput,
    type ComponentProps
} from "@webiny/sdk-nextjs";
import { Section, SectionHeading, type ImageValue } from "./Section";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatar: ImageValue | null;
}

type TestimonialsSectionProps = ComponentProps<{
    eyebrow: string;
    headline: string;
    testimonials: Testimonial[];
}>;

export function TestimonialsSectionComponent({ inputs }: TestimonialsSectionProps) {
    const testimonials = inputs.testimonials ?? [];

    return (
        <Section background="surface">
            <SectionHeading eyebrow={inputs.eyebrow} headline={inputs.headline} />
            {testimonials.length > 0 && (
                <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <figure
                            key={index}
                            className="flex flex-col justify-between rounded-xl bg-background p-8 ring-1 ring-border"
                        >
                            <blockquote className="text-base/7 text-text-base">
                                “{testimonial.quote}”
                            </blockquote>
                            <figcaption className="mt-6 flex items-center gap-4">
                                {testimonial.avatar?.src ? (
                                    <img
                                        src={testimonial.avatar.src}
                                        alt={testimonial.author}
                                        className="size-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                        {(testimonial.author || "?").charAt(0).toUpperCase()}
                                    </span>
                                )}
                                <div>
                                    <div className="text-sm font-semibold text-text-base">
                                        {testimonial.author}
                                    </div>
                                    <div className="text-sm text-text-muted">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            )}
        </Section>
    );
}

export const TestimonialsSection = createComponent(TestimonialsSectionComponent, {
    name: "Sections/Testimonials",
    label: "Testimonials",
    group: "sections",
    aiContext: "Customer quotes with an author, a role, and an optional avatar.",
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 7h5v6H9l-2 4V7zm7 0h5v6h-3l-2 4V7z"/><path d="M3 3h18v18H3V3zm2 2v14h14V5H5z"/></svg>`,
    inputs: {
        eyebrow: createTextInput({ label: "Eyebrow", defaultValue: "Testimonials" }),
        headline: createTextInput({
            label: "Headline",
            defaultValue: "What people say after switching"
        }),
        testimonials: createObjectInput({
            label: "Testimonials",
            list: true,
            fields: [
                createLongTextInput({
                    name: "quote",
                    label: "Quote",
                    defaultValue: "Add the quote here."
                }),
                createTextInput({ name: "author", label: "Author", defaultValue: "Full name" }),
                createTextInput({ name: "role", label: "Role", defaultValue: "Title, Company" }),
                createFileInput({
                    name: "avatar",
                    label: "Avatar",
                    allowedFileTypes: ["image/*"]
                })
            ]
        })
    },
    defaults: {
        inputs: {
            testimonials: [
                {
                    quote: "Our marketing team stopped filing tickets for copy changes. That alone paid for the migration.",
                    author: "Dana Whitfield",
                    role: "Head of Engineering, Northwind"
                },
                {
                    quote: "We kept our Next.js frontend exactly as it was and got a visual editor on top of it.",
                    author: "Marco Silva",
                    role: "Tech Lead, Fieldstone"
                },
                {
                    quote: "Setting up the first page took an afternoon. The second one took five minutes.",
                    author: "Priya Raman",
                    role: "Product Manager, Lumen"
                }
            ]
        }
    }
});
