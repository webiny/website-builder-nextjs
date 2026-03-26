import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "../FunnelContainer.js";

export const syncStepOnDelete: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;
  if (element.component.name === "Fub/Step" && ctx.action === "delete") {
    ctx.updateInputs(inputs => {
      const steps = inputs.containerData.steps ?? [];
      const index = steps.findIndex(s => s.id === element.inputs.stepData.id);
      if (index > -1) {
        inputs.containerData.steps.splice(index, 1);
      }
    });

    return ctx.stop();
  }
};
