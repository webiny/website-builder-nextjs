import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelCheckboxGroupField } from "./FunnelCheckboxGroupField";
import { descendantOfFunnelStep } from "../../constraints";

export const funnelCheckboxGroupFieldComponent = createComponent(FunnelCheckboxGroupField, {
  name: "Fub/Field/CheckboxGroup",
  label: "Checkbox Group",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`,
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
          type: "checkboxGroup",
          label: "",
          helpText: "",
          validators: [],
          value: { type: "stringArray", array: true, value: [] },
          extra: { options: [] }
        };
      }
    })
  ],
  constraints: [descendantOfFunnelStep]
});
