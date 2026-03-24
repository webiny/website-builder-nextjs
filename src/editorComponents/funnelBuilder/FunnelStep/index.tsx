import { createComponent, createObjectInput } from "@webiny/website-builder-nextjs";
import { FunnelStep } from "./FunnelStep";
import { childOfFunnel, noFieldsInLastStep } from "../constraints";

export const funnelStepComponent = createComponent(FunnelStep, {
  name: "Fub/Step",
  label: "Funnel Step",
  group: "funnelBuilder",
  acceptsChildren: true,
  hideFromToolbar: true,
  inputs: [
    createObjectInput({
      name: "stepData",
      hideFromUi: true,
      fields: [],
      defaultValue: () => {
        // Copied from src/editorComponents/funnelBuilder/utils/getRandomId.ts
        const getRandomId = () => Math.random().toString(36).substr(2, 7);

        return {
          id: getRandomId(),
          title: "New step"
        };
      }
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
    if (ctx.hasDescendantWithTag("funnel-field")) {
      return ctx.block("Cannot delete a step that still has fields in it.");
    }
  },
  constraints: [childOfFunnel],
  descendantConstraints: [noFieldsInLastStep]
});
