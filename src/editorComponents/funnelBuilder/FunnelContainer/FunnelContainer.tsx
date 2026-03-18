"use client";
import React from "react";
import { contentSdk } from "@webiny/website-builder-nextjs";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import { FunnelModelDto } from "../models/FunnelModel";
import { ContainerProvider } from "./ContainerProvider";

type FunnelProps = ComponentProps<{
  containerData: FunnelModelDto;
  steps: React.ReactNode[];
  activeStep: number;
}>;

export function FunnelContainer({ inputs }: FunnelProps) {
  if (contentSdk.isEditing()) {
    console.log("containerData", inputs.containerData);
  }

  return (
    <ContainerProvider>
      <div
        data-component={"Fub/Container"}
        className={"border-solid border-1 border-amber-800 p-2"}
      >
        <p>Active step: {inputs.activeStep}</p>
        {inputs.steps}
      </div>
    </ContainerProvider>
  );
}
