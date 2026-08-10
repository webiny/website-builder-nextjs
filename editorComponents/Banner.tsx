import React from "react";
import { ComponentProps } from "@webiny/sdk-nextjs";

interface BannerInputs {
    headline: string;
    ctaLabel: string;
    ctaUrl: string;
}

export function Banner({ inputs: { headline, ctaLabel, ctaUrl } }: ComponentProps<BannerInputs>) {
    return (
        <div className="bg-primary py-12 px-6 text-center text-on-primary">
            <h2 className="text-3xl font-bold mb-4">{headline}</h2>
            {ctaLabel && ctaUrl && (
                <a
                    href={ctaUrl}
                    className="inline-block bg-background text-primary font-semibold px-6 py-3 rounded-control shadow-raised hover:bg-background/80 transition-colors"
                >
                    {ctaLabel}
                </a>
            )}
        </div>
    );
}
