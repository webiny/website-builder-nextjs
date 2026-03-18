import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "../FunnelContainer/FunnelContainer.js";

export const onStepUpdate: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.name === "Fub/Step" && ctx.action === "update") {
    ctx.updateInputs(inputs => {
      const steps = inputs.registry.steps ?? [];
      const index = steps.findIndex(s => s.id === element.id);
      if (index > -1) {
        steps[index] = { id: element.id, title: element.inputs.title };
      }
      inputs.registry.steps = steps;
    });

    return ctx.stop();
  }
};
