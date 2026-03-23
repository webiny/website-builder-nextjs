import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelTextareaField } from "./FunnelTextareaField";
import { descendantOfFunnelStep } from "../../constraints";
import { createInitialFieldData } from "../createInitialFieldData";

export const funnelTextareaFieldComponent = createComponent(FunnelTextareaField, {
  name: "Fub/Field/Textarea",
  label: "Textarea",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-200v-80h640v80H160Zm0-160v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h400v80H160Zm0-160v-80h640v80H160Z"/></svg>`,
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
