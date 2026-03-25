import { ButtonActionDefinition } from "../types";

export const nextStepButtonAction: ButtonActionDefinition = {
  type: "nextStep",
  name: "Next Step",
  updateButtonLabel: "Next step",
  description:
    "Moves to the next step in the funnel. Cannot be added twice or together with the previous step action.",
  canAdd: ({ actions }) => {
    return (
      !actions.some(action => action.type === "nextStep") &&
      !actions.some(action => action.type === "previousStep")
    );
  },
  action: async ({ funnelSubmissionVm }) => {
    funnelSubmissionVm.submitActiveStep();
    return true;
  }
};
