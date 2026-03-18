import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "../FunnelContainer/FunnelContainer.js";

export const onStepDelete: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;
  if (element.component.name === "Fub/Step" && ctx.action === "delete") {
    ctx.updateInputs(inputs => {
      const steps = inputs.registry.steps ?? [];
      const index = steps.findIndex(s => s.id === element.id);
      if (index > -1) {
        inputs.registry.steps.splice(index, 1);
      }
    });

    return ctx.stop();
  }
};
