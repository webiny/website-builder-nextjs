import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { Funnel } from "../Funnel.js";

export const onStepDelete: InferDescendantChange<typeof Funnel> = ctx => {
  const element = ctx.descendant;
  if (element.component.name === "FunnelBuilder/Step" && ctx.action === "delete") {
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
