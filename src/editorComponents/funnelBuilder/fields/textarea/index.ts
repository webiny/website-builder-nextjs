import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelTextareaField } from "./FunnelTextareaField";
import { descendantOfFunnelStep } from "../../constraints";

export const funnelTextareaFieldComponent = createComponent(FunnelTextareaField, {
  name: "Fub/Field/Textarea",
  label: "Textarea",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-200v-80h640v80H160Zm0-160v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h400v80H160Zm0-160v-80h640v80H160Z"/></svg>`,
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
          type: "textarea",
          label: "",
          helpText: "",
          validators: [],
          value: { type: "string", array: false, value: "" },
          extra: { placeholderText: "", rows: 4 }
        };
      }
    })
  ],
  constraints: [descendantOfFunnelStep]
});
