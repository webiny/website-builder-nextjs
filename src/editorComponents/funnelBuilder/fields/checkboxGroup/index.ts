import { createComponent } from "@webiny/website-builder-nextjs";
import { FunnelCheckboxGroupField } from "./FunnelCheckboxGroupField";
import { descendantOfFunnelStep } from "../../constraints";

export const funnelCheckboxGroupFieldComponent = createComponent(FunnelCheckboxGroupField, {
  name: "Fub/Field/CheckboxGroup",
  label: "Checkbox Group",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`,
  group: "funnelBuilder",
  inputs: {},
  tags: ["funnel-field"],
  onChange: ctx => {
    if (ctx.action === "create") {
      const step = ctx.getAncestor("Fub/Step")!;
      const container = ctx.getAncestor("Fub/Container")!;

      container.updateInputs(inputs => {
        inputs.containerData.fields.push({
          id: ctx.id,
          fieldId: ctx.id,
          stepId: step.id,
          type: "checkboxGroup",
          label: "",
          helpText: "",
          validators: [],
          value: { type: "stringArray", array: true, value: [] },
          extra: { options: [] }
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
