import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelTextField } from "./FunnelTextField";
import { descendantOfFunnelStep } from "../../constraints";
import { createInitialFieldData } from "../createInitialFieldData";

export const funnelTextFieldComponent = createComponent(FunnelTextField, {
  name: "Fub/Field/Text",
  label: "Text Field",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-200v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Z"/></svg>`,
  group: "funnelBuilder",
  tags: ["funnel-field"],
  onChange: ctx => {
    ctx.log("TextField.onChange", ctx);
  },
  inputs: [
    createObjectInput({
      name: "fieldData",
      hideFromUi: true,
      fields: [],
      defaultValue: createInitialFieldData("text")
    })
  ],
  constraints: [descendantOfFunnelStep]
});
