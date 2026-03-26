"use client";
import React from "react";
import { Field } from "../components/Field";
import { FieldLabel } from "../components/FieldLabel";
import { FieldHelperMessage } from "../components/FieldHelperMessage";
import { FieldErrorMessage } from "../components/FieldErrorMessage";
import { createFunnelField, FunnelFieldRendererProps } from "../createFunnelField";
import type { CheckboxGroupField } from "../../models/fields/CheckboxGroupField";

function CheckboxGroupFieldRenderer({
  field,
  value,
  onChange,
  validation,
  isDisabled
}: FunnelFieldRendererProps<CheckboxGroupField>) {
  const { definition } = field;
  const selected = (value as string[]) ?? [];
  const options = definition.extra.options ?? [];

  const toggle = (optionValue: string) => {
    const next = selected.includes(optionValue)
      ? selected.filter(v => v !== optionValue)
      : [...selected, optionValue];
    onChange(next);
  };

  return (
    <Field disabled={isDisabled}>
      <FieldLabel field={definition} />
      {definition.helpText && <FieldHelperMessage>{definition.helpText}</FieldHelperMessage>}
      <div className="flex flex-col gap-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              disabled={isDisabled}
              name={definition.fieldId}
              id={`checkbox-${definition.fieldId}-${option.value}`}
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

export const FunnelCheckboxGroupField = createFunnelField<CheckboxGroupField>(
  CheckboxGroupFieldRenderer
);
