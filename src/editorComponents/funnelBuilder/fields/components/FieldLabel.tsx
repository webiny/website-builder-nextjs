"use client";
import React from "react";
import type { FunnelFieldDefinitionModel } from "../../models/FunnelFieldDefinitionModel";

interface FieldLabelProps {
  field: FunnelFieldDefinitionModel;
}

export function FieldLabel({ field }: FieldLabelProps) {
  return (
    <label className="w-full inline-block mb-1 ml-px">
      {field.label}
      {field.validators?.some(v => v.type === "required") && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </label>
  );
}
