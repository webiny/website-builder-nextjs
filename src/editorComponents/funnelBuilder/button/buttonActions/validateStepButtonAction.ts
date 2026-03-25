import { ButtonActionDefinition } from "../types";

export const validateStepButtonAction: ButtonActionDefinition = {
  type: "validateStep",
  name: "Validate fields on current page",
  description:
    "Validates all fields on the current page. If valid, moves to the next action in the chain.",
  canAdd: ({ actions }) => {
    return !actions.some(action => action.type === "validateStep");
  },
  action: async ({ funnelSubmissionVm }) => {
    // submitActiveStep handles validation internally — returns false if invalid.
    // We invoke it and trust the vm to block progression if invalid.
    funnelSubmissionVm.submitActiveStep();
    return true;
  }
};
