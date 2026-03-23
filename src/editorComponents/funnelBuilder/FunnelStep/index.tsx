import { createComponent, createTextInput } from "@webiny/website-builder-nextjs";
import { FunnelStep } from "./FunnelStep";
import { childOfFunnel, noFieldsInLastStep } from "../constraints";

export const funnelStepComponent = createComponent(FunnelStep, {
  name: "Fub/Step",
  label: "Funnel Step",
  group: "funnelBuilder",
  acceptsChildren: true,
  hideFromToolbar: true,
  inputs: [
    createTextInput({
      name: "label",
      label: "Label"
    })
  ],
  canDelete: ctx => {
    ctx.log("Checking if step can be deleted...");
    if (ctx.component.isFirstChild()) {
      return ctx.block("Cannot delete first step.");
    }
    if (ctx.component.isLastChild()) {
      return ctx.block("Cannot delete last step.");
    }
  },
  constraints: [childOfFunnel],
  descendantConstraints: [noFieldsInLastStep],
  defaults: {
    inputs: {
      label: "New Step"
    }
  }
});
