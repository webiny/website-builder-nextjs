"use client";
import React, { useState } from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import type { FunnelFieldDefinitionModelDto } from "../../models/FunnelFieldDefinitionModel";
import { FunnelFieldDefinitionModel } from "../../models/FunnelFieldDefinitionModel";
import { Field } from "../components/Field";
import { FieldLabel } from "../components/FieldLabel";
import { FieldHelperMessage } from "../components/FieldHelperMessage";
import { FieldErrorMessage } from "../components/FieldErrorMessage";

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

type FunnelCheckboxGroupFieldProps = ComponentProps<{
  fieldData: FunnelFieldDefinitionModelDto;
}>;

export function FunnelCheckboxGroupField({ inputs }: FunnelCheckboxGroupFieldProps) {
  const field = FunnelFieldDefinitionModel.fromDto(inputs.fieldData);
  const [selected, setSelected] = useState<string[]>((field.value?.value as string[]) ?? []);
  const [validation, setValidation] = useState<{ isValid: boolean | null; message: string }>({
    isValid: null,
    message: ""
  });

  const options: CheckboxOption[] = (field.extra as any)?.options ?? [];

  const toggle = (optionValue: string) => {
    const next = selected.includes(optionValue)
      ? selected.filter(v => v !== optionValue)
      : [...selected, optionValue];
    setSelected(next);

    const isRequired = field.validators.some(v => v.type === "required");
    if (isRequired && next.length === 0) {
      setValidation({ isValid: false, message: "This field is required." });
    } else {
      setValidation({ isValid: true, message: "" });
    }
  };

  return (
    <Field>
      <FieldLabel field={field} />
      {field.helpText && <FieldHelperMessage>{field.helpText}</FieldHelperMessage>}
      <div className="flex flex-col gap-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={field.fieldId}
              id={`checkbox-${field.fieldId}-${option.value}`}
              checked={selected.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="w-5 h-5 rounded border border-gray-300 bg-gray-50 accent-blue-500 cursor-pointer"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldErrorMessage isValid={validation.isValid} message={validation.message} />
    </Field>
  );
}
