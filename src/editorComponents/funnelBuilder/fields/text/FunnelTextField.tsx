"use client";
import React, { useCallback, useState } from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import type { FunnelFieldDefinitionModelDto } from "../../models/FunnelFieldDefinitionModel";
import { FunnelFieldDefinitionModel } from "../../models/FunnelFieldDefinitionModel";
import { Field } from "../components/Field";
import { FieldLabel } from "../components/FieldLabel";
import { FieldHelperMessage } from "../components/FieldHelperMessage";
import { FieldErrorMessage } from "../components/FieldErrorMessage";

type FunnelTextFieldProps = ComponentProps<{
  fieldData: FunnelFieldDefinitionModelDto;
}>;

export function FunnelTextField({ inputs }: FunnelTextFieldProps) {
  const field = FunnelFieldDefinitionModel.fromDto(inputs.fieldData);
  const [value, setValue] = useState<string>((field.value?.value as string) ?? "");
  const [validation, setValidation] = useState<{ isValid: boolean | null; message: string }>({
    isValid: null,
    message: ""
  });

  const onBlur = useCallback(() => {
    const isRequired = field.validators.some(v => v.type === "required");
    if (isRequired && !value) {
      setValidation({ isValid: false, message: "This field is required." });
    } else {
      setValidation({ isValid: true, message: "" });
    }
  }, [field, value]);

  return (
    <Field>
      <FieldLabel field={field} />
      {field.helpText && <FieldHelperMessage>{field.helpText}</FieldHelperMessage>}
      <input
        type="text"
        id={field.fieldId}
        name={field.fieldId}
        value={value}
        placeholder={(field.extra as any)?.placeholderText ?? ""}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        className="w-full px-[10px] py-[10px] border border-gray-200 bg-gray-50 rounded box-border transition-[border-color,box-shadow] duration-150 ease-in-out focus:border-blue-500 focus:shadow-[0_0_0_0.2rem_rgba(0,123,255,0.25)] focus:outline-none"
      />
      <FieldErrorMessage isValid={validation.isValid} message={validation.message} />
    </Field>
  );
}
