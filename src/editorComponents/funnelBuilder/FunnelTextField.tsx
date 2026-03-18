"use client";
import React from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import type { FunnelFieldDefinitionModelDto } from "./models/FunnelFieldDefinitionModel";

type FunnelTextFieldProps = ComponentProps<{
  fieldData: FunnelFieldDefinitionModelDto;
}>;

export function FunnelTextField({ inputs }: FunnelTextFieldProps) {
  return (
    <div data-component="Fub/TextField">
      <label>{inputs.fieldData.label}</label>
      <input type="text" required={false} />
    </div>
  );
}
