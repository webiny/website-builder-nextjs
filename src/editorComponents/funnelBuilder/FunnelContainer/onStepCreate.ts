import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "./FunnelContainer.js";

export const onStepCreate: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.name === "Fub/Step" && ctx.action === "create") {
    ctx.updateInputs(inputs => {
      const steps = inputs.containerData.steps ?? [];
      steps.splice(steps.length - 1, 0, element.inputs.stepData);
      inputs.containerData.steps = steps;
    });

    return ctx.stop();
  }
};
