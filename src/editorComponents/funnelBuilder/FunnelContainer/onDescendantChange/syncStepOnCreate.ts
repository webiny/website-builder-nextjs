import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "../FunnelContainer.js";

export const syncStepOnCreate: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.name === "Fub/Step" && ctx.action === "create") {
    ctx.updateInputs(inputs => {
      const steps = inputs.containerData.steps ?? [];
      const successIndex = steps.findIndex(s => s.id === "success");
      if (successIndex > -1) {
        steps.splice(successIndex, 0, element.inputs.stepData);
      } else {
        steps.push(element.inputs.stepData);
      }
      inputs.containerData.steps = steps;
    });

    return ctx.stop();
  }
};
