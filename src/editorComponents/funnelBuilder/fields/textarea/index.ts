import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelTextareaField } from "./FunnelTextareaField";
import { descendantOfFunnelStep } from "../../constraints";
import { createInitialFieldData } from "../createInitialFieldData";

export const funnelTextareaFieldComponent = createComponent(FunnelTextareaField, {
  name: "Fub/Field/Textarea",
  label: "Textarea",
  group: "funnelBuilder",
  tags: ["funnel-field"],
  onChange: ctx => {
    ctx.log("TextareaField.onChange", ctx);
  },
  inputs: [
    createObjectInput({
      name: "fieldData",
      hideFromUi: true,
      fields: [],
      defaultValue: createInitialFieldData("textarea")
    })
  ],
  constraints: [descendantOfFunnelStep]
});
