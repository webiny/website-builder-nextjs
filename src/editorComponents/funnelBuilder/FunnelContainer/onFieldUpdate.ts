import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "./FunnelContainer.js";

export const onFieldUpdate: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.tags?.includes("funnel-field") && ctx.action === "update") {
    ctx.updateInputs(inputs => {
      const fields = inputs.containerData.fields ?? [];
      const index = fields.findIndex(f => f.id === element.inputs.fieldData.id);

      ctx.log("f", element.inputs.fieldData);
      if (index > -1) {
        fields[index] = element.inputs.fieldData;
      }
      inputs.containerData.fields = fields;
      ctx.log(inputs.containerData.fields);
    });

    return ctx.stop();
  }
};
