import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelStep } from "../FunnelStep.js";

export const syncFieldStepIdOnCreate: InferDescendantChange<typeof FunnelStep> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.tags?.includes("funnel-field") && ctx.action === "create") {
    element.updateInputs(inputs => {
      inputs.fieldData.stepId = ctx.inputs.stepData.id;
    });

    return ctx.stop();
  }
};
