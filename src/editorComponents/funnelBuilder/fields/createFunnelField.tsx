"use client";
import React, { useState, useCallback, useMemo } from "react";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
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

type FunnelFieldProps = ComponentProps;

export function createFunnelField<
  TField extends FunnelFieldDefinitionModel = FunnelFieldDefinitionModel
>(Component: React.ComponentType<FunnelFieldRendererProps<TField>>) {
  function FunnelField({ element }: FunnelFieldProps) {
    const { funnelSubmissionVm } = useContainer();
    const fieldId = element.id;

    // Local validation state — populated by on-blur validate() calls.
    const [localValidation, setLocalValidation] = useState<FieldValidation>({
      isValid: null,
      message: ""
    });

    const field = fieldId ? funnelSubmissionVm.getFieldById(fieldId) : null;

    const validate = useCallback(async () => {
      if (!field) {
        return;
      }
      const result = await field.validate();
      setLocalValidation({
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

    // Merge local validation with errors set by submitActiveStep().
    // VM errors (from a submit attempt) take precedence over local on-blur state.
    const validation = useMemo<FieldValidation>(() => {
      if (!fieldId) {
        return localValidation;
      }
      const submitError = funnelSubmissionVm.getFieldValidationError(fieldId);
      if (submitError !== null) {
        return { isValid: false, message: submitError };
      }
      return localValidation;
    }, [fieldId, funnelSubmissionVm, funnelSubmissionVm.validationErrors, localValidation]);

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
