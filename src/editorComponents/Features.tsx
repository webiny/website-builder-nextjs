import React from "react";
import { ComponentProps } from "@webiny/website-builder-nextjs";

interface CallToAction {
  label: string;
  buttonTitle: string;
  action: string;
  url: string;
}

// The file input stores an object, not a plain URL. The image src lives on `.src`.
interface FileValue {
  id?: string;
  name?: string;
  src?: string;
}

interface Feature {
  image: FileValue | null;
  title: string;
  label: string;
  callToAction: CallToAction;
}

interface FeaturesInputs {
  headline: string;
  features: Feature[];
}

export function Features({
  inputs: { headline, features },
}: ComponentProps<FeaturesInputs>) {
  return (
    <div className="bg-background py-16 px-6">
      <div className="mx-auto max-w-5xl">
        {headline && (
          <h2 className="text-3xl font-bold text-center text-text-base mb-12">
            {headline}
          </h2>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {(features ?? []).map((feature, index) => {
            const cta = feature.callToAction;
            return (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-border/60 overflow-hidden"
              >
                {feature.image?.src && (
                  <img
                    src={feature.image.src}
                    alt={feature.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="flex flex-col gap-2 p-6">
                  {feature.label && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {feature.label}
                    </span>
                  )}
                  {feature.title && (
                    <h3 className="text-xl font-semibold text-text-base">
                      {feature.title}
                    </h3>
                  )}
                  {cta?.label && (
                    <p className="text-sm text-text-muted">{cta.label}</p>
                  )}
                  {cta?.buttonTitle && cta?.action === "openUrl" && cta?.url && (
                    <a
                      href={cta.url}
                      className="mt-2 inline-block self-start rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/80 transition-colors"
                    >
                      {cta.buttonTitle}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
