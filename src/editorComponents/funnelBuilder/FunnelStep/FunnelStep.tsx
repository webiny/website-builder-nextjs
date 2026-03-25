"use client";
import React from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import { useContainer } from "../FunnelContainer/ContainerProvider";
import type { FunnelStepModelDto } from "../models/FunnelStepModel";

type FunnelStepProps = ComponentProps<{
  label: string;
  stepData: FunnelStepModelDto;
  children: React.ReactNode;
}>;

export function FunnelStep({ inputs }: FunnelStepProps) {
  const { funnelSubmissionVm } = useContainer();

  if (inputs.stepData.id !== funnelSubmissionVm.activeStepId) {
    return null;
  }

  return <div data-component="Fub/Step">{inputs.children}</div>;
}
