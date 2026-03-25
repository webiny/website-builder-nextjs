import { ButtonActionDefinition } from "../types";

export const previousStepButtonAction: ButtonActionDefinition = {
  type: "previousStep",
  name: "Previous Step",
  updateButtonLabel: "Previous step",
  description:
    "Moves to the previous step in the funnel. Cannot be added twice or together with the next step action.",
  canAdd: ({ actions }) => {
    return (
      !actions.some(action => action.type === "nextStep") &&
      !actions.some(action => action.type === "previousStep")
    );
  },
  action: ({ funnelSubmissionVm }) => {
    funnelSubmissionVm.activatePreviousStep();
    return true;
  }
};
