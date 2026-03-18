"use client";
import React from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";

type FunnelTextFieldProps = ComponentProps<{
  label: string;
  placeholder: string;
  required: boolean;
}>;

export function FunnelTextField({ inputs }: FunnelTextFieldProps) {
  return (
    <div data-component="Fub/TextField">
      <label>{inputs.label}</label>
      <input type="text" placeholder={inputs.placeholder} required={inputs.required} />
    </div>
  );
}
