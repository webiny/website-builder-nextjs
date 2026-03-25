import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelButton } from "./FunnelButton";
import { descendantOfFunnelStep } from "../constraints";
import { ButtonElementData } from "./types";

export const funnelButtonComponent = createComponent(FunnelButton, {
  name: "Fub/Button",
  label: "Button",
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>`,
  group: "funnelBuilder",
  inputs: [
    createObjectInput({
      name: "buttonData",
      hideFromUi: true,
      fields: [],
      defaultValue: {
        actions: [],
        label: "Next"
      } as ButtonElementData
    })
  ],
  constraints: [descendantOfFunnelStep]
});
