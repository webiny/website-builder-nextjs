import { createComponent } from "@webiny/website-builder-nextjs";
import { FunnelTextareaField } from "./FunnelTextareaField";
import { descendantOfFunnelStep } from "../../constraints";

export const funnelTextareaFieldComponent = createComponent(FunnelTextareaField, {
  name: "Fub/Field/Textarea",
  label: "Textarea",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-200v-80h640v80H160Zm0-160v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h400v80H160Zm0-160v-80h640v80H160Z"/></svg>`,
  group: "funnelBuilder",
  inputs: {},
  onChange: ctx => {
    if (ctx.action === "create") {
      const step = ctx.getAncestor("Fub/Step")!;
      const container = ctx.getAncestor("Fub/Container")!;

      container.updateInputs(inputs => {
        inputs.containerData.fields.push({
          id: ctx.id,
          fieldId: ctx.id,
          stepId: step.id,
          type: "textarea",
          label: "",
          helpText: "",
          validators: [],
          value: { type: "string", array: false, value: "" },
          extra: { placeholderText: "", rows: 4 }
        });
      });

      // Execute command to open the settings dialog
      ctx.executeCommand("Fub/OpenSettingsDialog", { elementId: ctx.id });
    }
  },
  canDelete: ctx => {
    // Cannot use const for name here b/c we need this fn to be serializable.
    const fieldId = ctx.getElementInputs().fieldData?.id;
    const containerInputs = ctx.getAncestorInputs("Fub/Container");
    if (fieldId && containerInputs) {
      if (JSON.stringify(containerInputs.containerData?.conditionRules ?? []).includes(fieldId)) {
        return ctx.block("Cannot delete this field because it is used in conditional rules.");
      }
    }
  },
  constraints: [descendantOfFunnelStep]
});
