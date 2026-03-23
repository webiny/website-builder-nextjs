import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "../FunnelContainer/FunnelContainer.js";

export const onStepUpdate: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.name === "Fub/Step" && ctx.action === "update") {
    ctx.updateInputs(inputs => {
      const steps = inputs.containerData.steps ?? [];
      const index = steps.findIndex(s => s.id === element.inputs.stepData.id);
      if (index > -1) {
        steps[index] = { id: element.inputs.stepData.id, title: element.inputs.label };
      }
      inputs.containerData.steps = steps;
    });

    return ctx.stop();
  }
};
