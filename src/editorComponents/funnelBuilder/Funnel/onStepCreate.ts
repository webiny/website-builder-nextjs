import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { Funnel } from "../Funnel.js";

export const onStepCreate: InferDescendantChange<typeof Funnel> = ctx => {
  const element = ctx.descendant;
  if (element.component.name === "FunnelBuilder/Step" && ctx.action === "create") {
    ctx.updateInputs(inputs => {
      const steps = inputs.registry.steps ?? [];
      steps.push({ id: element.id, label: element.inputs.label });
      inputs.registry.steps = steps;
    });

    return ctx.stop();
  }
};
