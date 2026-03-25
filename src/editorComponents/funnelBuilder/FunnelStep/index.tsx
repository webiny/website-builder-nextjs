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
    // Block deletion of the success step.
    if (ctx.getElementInputs().stepData?.id === "success") {
      return ctx.block("Cannot delete the success step.");
    }
    // Block if this is the last non-success step (childCount includes the success step).
    if (ctx.component.childCount() <= 2) {
      return ctx.block("Cannot delete the last step.");
    }
    // Block if the step still has fields in it.
    if (ctx.hasDescendantWithTag("funnel-field")) {
      return ctx.block("Cannot delete a step that still has fields in it.");
    }
  },
  constraints: [childOfFunnel],
  descendantConstraints: [noFieldsInLastStep]
});
