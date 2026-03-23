import type { InferDescendantChange } from "@webiny/website-builder-nextjs";
import type { FunnelContainer } from "./FunnelContainer.js";

export const onFieldCreate: InferDescendantChange<typeof FunnelContainer> = ctx => {
  const element = ctx.descendant;

  // Cannot use const for name here b/c we need this fn to be serializable.
  if (element.component.tags?.includes("funnel-field") && ctx.action === "create") {
    ctx.updateInputs(inputs => {
      const fields = inputs.containerData.fields ?? [];
      fields.push(element.inputs.fieldData);
      inputs.containerData.fields = fields;
    });

    // Execute command to open the settings dialog
    ctx.executeCommand("Fub/OpenSettingsDialog", { elementId: element.id });

    return ctx.stop();
  }
};
