import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelCheckboxGroupField } from "./FunnelCheckboxGroupField";
import { descendantOfFunnelStep } from "../../constraints";
import { createInitialFieldData } from "../createInitialFieldData";

export const funnelCheckboxGroupFieldComponent = createComponent(FunnelCheckboxGroupField, {
  name: "Fub/Field/CheckboxGroup",
  label: "Checkbox Group",
  group: "funnelBuilder",
  tags: ["funnel-field"],
  onChange: ctx => {
    ctx.log("CheckboxGroupField.onChange", ctx);
  },
  inputs: [
    createObjectInput({
      name: "fieldData",
      hideFromUi: true,
      fields: [],
      defaultValue: createInitialFieldData("checkboxGroup")
    })
  ],
  constraints: [descendantOfFunnelStep]
});
