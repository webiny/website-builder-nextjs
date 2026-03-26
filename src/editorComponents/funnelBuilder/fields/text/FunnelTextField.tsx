"use client";
import React, { useCallback } from "react";
import { Field } from "../components/Field";
import { FieldLabel } from "../components/FieldLabel";
import { FieldHelperMessage } from "../components/FieldHelperMessage";
import { FieldErrorMessage } from "../components/FieldErrorMessage";
import { createFunnelField, FunnelFieldRendererProps } from "../createFunnelField";
import type { TextField } from "../../models/fields/TextField";

function TextFieldRenderer({
  field,
  value,
  onChange,
  validate,
  validation,
  isDisabled
}: FunnelFieldRendererProps<TextField>) {
  const { definition } = field;

  const onBlur = useCallback(async () => {
    await validate();
  }, [validate]);

  return (
    <Field disabled={isDisabled}>
      <FieldLabel field={definition} />
      {definition.helpText && <FieldHelperMessage>{definition.helpText}</FieldHelperMessage>}
      <input
        type="text"
        disabled={isDisabled}
        id={definition.fieldId}
        name={definition.fieldId}
        value={(value as string) ?? ""}
        placeholder={(definition.extra as any)?.placeholderText ?? ""}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-full px-[10px] py-[10px] border border-gray-200 bg-gray-50 rounded box-border transition-[border-color,box-shadow] duration-150 ease-in-out focus:border-blue-500 focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)] focus:outline-none"
      />
      <FieldErrorMessage isValid={validation.isValid} message={validation.message} />
    </Field>
  );
}

export const FunnelTextField = createFunnelField<TextField>(TextFieldRenderer);
