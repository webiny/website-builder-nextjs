"use client";
import React, { useState, useCallback } from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import type { FunnelFieldDefinitionModelDto } from "../models/FunnelFieldDefinitionModel";
import type { FunnelFieldDefinitionModel } from "../models/FunnelFieldDefinitionModel";
import type { FunnelSubmissionFieldModel } from "../models/FunnelSubmissionFieldModel";
import { useContainer } from "../FunnelContainer/ContainerProvider";

export interface FieldValidation {
  isValid: boolean | null;
  message: string;
}

export interface FunnelFieldRendererProps<
  TField extends FunnelFieldDefinitionModel = FunnelFieldDefinitionModel
> {
  field: FunnelSubmissionFieldModel<TField>;
  value: TField["value"]["value"];
  onChange: (value: TField["value"]["value"]) => void;
  validate: () => Promise<void>;
  validation: FieldValidation;
  isDisabled: boolean;
  isHidden: boolean;
}

type FunnelFieldProps = ComponentProps<{
  fieldData: FunnelFieldDefinitionModelDto;
}>;

export function createFunnelField<
  TField extends FunnelFieldDefinitionModel = FunnelFieldDefinitionModel
>(Component: React.ComponentType<FunnelFieldRendererProps<TField>>) {
  function FunnelField({ inputs }: FunnelFieldProps) {
    const { funnelSubmissionVm } = useContainer();
    const fieldId = inputs.fieldData?.fieldId;

    const [validation, setValidation] = useState<FieldValidation>({
      isValid: null,
      message: ""
    });

    const field = fieldId ? funnelSubmissionVm.getField(fieldId) : null;

    const validate = useCallback(async () => {
      if (!field) {
        return;
      }
      const result = await field.validate();
      setValidation({
        isValid: result.isValid,
        message: result.isValid ? "" : result.errorMessage
      });
    }, [field]);

    const onChange = useCallback(
      (value: TField["value"]["value"]) => {
        if (!field) {
          return;
        }
        field.value.value = value;
        funnelSubmissionVm.evaluateConditionRulesForActiveStep();
      },
      [field, funnelSubmissionVm]
    );

    if (!field) {
      return (
        <div style={{ padding: 12 }}>
          Field <strong>{fieldId}</strong> not found in the funnel.
        </div>
      );
    }

    if (field.hidden) {
      return null;
    }

    return (
      <Component
        field={field as FunnelSubmissionFieldModel<TField>}
        value={field.getRawValue() as TField["value"]["value"]}
        onChange={onChange}
        validate={validate}
        validation={validation}
        isDisabled={field.disabled}
        isHidden={field.hidden}
      />
    );
  }

  FunnelField.displayName = Component.displayName || Component.name || "FunnelField";

  return FunnelField;
}
