import { createComponent } from "@webiny/website-builder-nextjs";
import { FunnelStep } from "./FunnelStep";
import { childOfFunnel, noFieldsInLastStep } from "../constraints";
import { onDescendantChange } from "./onDescendantChange";
import { createBooleanInput } from "@webiny/website-builder-react";

export const funnelStepComponent = createComponent(FunnelStep, {
  name: "Fub/Step",
  label: "Funnel Step",
  group: "funnelBuilder",
  acceptsChildren: true,
  hideFromToolbar: true,
  inputs: {
    isSuccess: createBooleanInput({ hideFromUi: true })
  },
  canDelete: ctx => {
    // Block deletion of the success step.
    if (ctx.getElementInputs().isSuccess) {
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
  descendantConstraints: [noFieldsInLastStep],
  onDescendantChange
});
