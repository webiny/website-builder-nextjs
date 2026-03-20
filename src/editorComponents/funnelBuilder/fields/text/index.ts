import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelTextField } from "./FunnelTextField";
import { descendantOfFunnelStep } from "../../constraints";
import { createInitialFieldData } from "../createInitialFieldData";

export const funnelTextFieldComponent = createComponent(FunnelTextField, {
  name: "Fub/Field/Text",
  label: "Text Field",
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
