import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { Funnel } from "../Funnel.js";

export const onStepUpdate: InferDescendantChange<typeof Funnel> = ctx => {
  const element = ctx.descendant;
  if (element.component.name === "FunnelBuilder/Step" && ctx.action === "update") {
    ctx.updateInputs(inputs => {
      const steps = inputs.registry.steps ?? [];
      const index = steps.findIndex(s => s.id === element.id);
      if (index > -1) {
        steps[index] = { id: element.id, label: element.inputs.label };
      }
      inputs.registry.steps = steps;
    });

    return ctx.stop();
  }
};
