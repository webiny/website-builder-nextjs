"use client";
import React from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import { useContainer } from "../FunnelContainer/ContainerProvider";

type FunnelStepProps = ComponentProps<{
  isSuccess: boolean;
  children: React.ReactNode;
}>;

export function FunnelStep({ element, inputs }: FunnelStepProps) {
  const { funnelSubmissionVm } = useContainer();

  if (element.id !== funnelSubmissionVm.activeStepId) {
    return null;
  }

  return <div data-component="Fub/Step">{inputs.children}</div>;
}
