import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelTextField } from "./FunnelTextField";
import { descendantOfFunnelStep } from "../../constraints";

export const funnelTextFieldComponent = createComponent(FunnelTextField, {
  name: "Fub/Field/Text",
  label: "Text Field",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-200v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Z"/></svg>`,
  group: "funnelBuilder",
  tags: ["funnel-field"],
  inputs: [
    createObjectInput({
      name: "fieldData",
      hideFromUi: true,
      fields: [],
      defaultValue: () => {
        // Copied from src/editorComponents/funnelBuilder/utils/getRandomId.ts
        const getRandomId = () => Math.random().toString(36).substr(2, 7);

        return {
          id: getRandomId(),
          fieldId: getRandomId(),
          stepId: "",
          type: "text",
          label: "",
          helpText: "",
          validators: [],
          value: { type: "string", array: false, value: "" },
          extra: { placeholderText: "" }
        };
      }
    })
  ],
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
