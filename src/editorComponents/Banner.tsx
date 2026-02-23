import React from "react";
import { ComponentProps } from "@webiny/website-builder-nextjs";

interface BannerInputs {
  headline: string;
  ctaLabel: string;
  ctaUrl: string;
}

export function Banner({
  inputs: { headline, ctaLabel, ctaUrl },
}: ComponentProps<BannerInputs>) {
  return (
    <div className="bg-color1 py-12 px-6 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">{headline}</h2>
      {ctaLabel && ctaUrl && (
        <a
          href={ctaUrl}
          className="inline-block bg-white text-color1 font-semibold px-6 py-3 rounded-md hover:bg-white/80 transition-colors"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
