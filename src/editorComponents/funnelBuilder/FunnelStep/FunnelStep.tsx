"use client";
import React from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import { useContainer } from "../FunnelContainer/ContainerProvider";

type FunnelStepProps = ComponentProps<{
  label: string;
  children: React.ReactNode;
}>;

export function FunnelStep({ inputs }: FunnelStepProps) {
  // TODO: use context provider to determine the active step, and render `null` if not active.

  const { funnelVm } = useContainer();

  console.log("asds22adsd", funnelVm);
  return (
    <div data-component="Fub/Step">
      <div>{inputs.label}</div>
      {inputs.children}
    </div>
  );
}
