"use client";
import React from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";

type FunnelStepProps = ComponentProps<{
  label: string;
  children: React.ReactNode;
}>;

export function FunnelStep({ inputs }: FunnelStepProps) {
  // TODO: use context provider to determine the active step, and render `null` if not active.
  return (
    <div data-component="FunnelBuilder/Step">
      <div>{inputs.label}</div>
      {inputs.children}
    </div>
  );
}
