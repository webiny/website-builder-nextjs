import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "./FunnelContainer.js";

export const onFieldDelete: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.tags?.includes("funnel-field") && ctx.action === "delete") {
    ctx.updateInputs(inputs => {
      const fields = inputs.containerData.fields ?? [];
      const index = fields.findIndex(f => f.id === element.inputs.fieldData.id);
      if (index > -1) {
        inputs.containerData.fields.splice(index, 1);
      }
    });

    return ctx.stop();
  }
};
