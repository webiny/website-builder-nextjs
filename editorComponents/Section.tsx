"use client";
import React from "react";

/**
 * Shared building blocks for the section components. Every section is a full-bleed band with a
 * centered container inside, which is what makes them stack into a page without extra layout work.
 */

type Background = "base" | "surface" | "primary";

// Full class names (not composed at runtime), so Tailwind's scanner can find them.
const BACKGROUNDS: Record<Background, string> = {
    base: "bg-background",
    surface: "bg-surface",
    primary: "bg-primary"
};

interface SectionProps {
    children: React.ReactNode;
    background?: Background;
    className?: string;
}

export function Section({ children, background = "base", className = "" }: SectionProps) {
    return (
        <section className={`w-full ${BACKGROUNDS[background]} py-16 sm:py-24 ${className}`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
        </section>
    );
}

interface SectionHeadingProps {
    eyebrow?: string;
    headline?: string;
    description?: string;
    align?: "center" | "left";
    inverted?: boolean;
}

export function SectionHeading({
    eyebrow,
    headline,
    description,
    align = "center",
    inverted = false
}: SectionHeadingProps) {
    if (!eyebrow && !headline && !description) {
        return null;
    }

    return (
        <div
            className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}
        >
            {eyebrow && (
                <p
                    className={`text-sm font-semibold uppercase tracking-wide ${
                        inverted ? "text-white/70" : "text-primary"
                    }`}
                >
                    {eyebrow}
                </p>
            )}
            {headline && (
                <h2
                    className={`mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl ${
                        inverted ? "text-white" : "text-text-base"
                    }`}
                >
                    {headline}
                </h2>
            )}
            {description && (
                <p
                    className={`mt-4 text-pretty text-lg/8 ${
                        inverted ? "text-white/80" : "text-text-muted"
                    }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

type CtaVariant = "primary" | "inverted" | "link";

interface CtaLinkProps {
    label?: string;
    url?: string;
    variant?: CtaVariant;
}

export function CtaLink({ label, url, variant = "primary" }: CtaLinkProps) {
    if (!label) {
        return null;
    }

    const href = url || "#";

    if (variant === "link") {
        return (
            <a href={href} className="text-sm/6 font-semibold text-text-base">
                {label} <span aria-hidden="true">→</span>
            </a>
        );
    }

    const styles =
        variant === "inverted"
            ? "bg-background text-primary hover:bg-background/90"
            : "bg-primary text-white hover:bg-primary/90";

    return (
        <a
            href={href}
            className={`inline-block rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors ${styles}`}
        >
            {label}
        </a>
    );
}

/**
 * The value shape the file input hands to a component.
 */
export interface ImageValue {
    id: string;
    name: string;
    size: number;
    mimeType: string;
    src: string;
}
