"use client";
import React from "react";
import { contentSdk } from "@webiny/website-builder-nextjs";
import type { ComponentProps } from "@webiny/website-builder-nextjs";

type FunnelProps = ComponentProps<{
  registry: {
    steps: Array<{ id: string; label: string }>;
    fields: Array<{ id: string; [key: string]: any }>;
    conditionalRules: Array<{ id: string; [key: string]: any }>;
  };
  activeStep: number;
  steps: React.ReactNode[];
  conditionRules: { sourceField: string; operator: string; value: string }[];
}>;

export function Funnel({ inputs }: FunnelProps) {
  if (contentSdk.isEditing()) {
    console.log("registry", inputs.registry);
  }
  // TODO: add context provider
  return (
    <div
      data-component="FunnelBuilder/Funnel"
      className={"border-solid border-1 border-amber-800 p-2"}
    >
      <p>Active step: {inputs.activeStep}</p>
      {inputs.steps}
    </div>
  );
}
