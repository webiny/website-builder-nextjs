import { ButtonActionDefinition } from "../types";

// Mock function to simulate email verification.
const mockVerifyEmail = async (email: string | undefined): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || email !== "me@forth.com") {
        reject(new Error("Please verify your email before continuing."));
      } else {
        console.log(`Email ${email} has been verified.`);
        resolve();
      }
    }, 1000);
  });
};

// Mock function to simulate saving user data to CRM.
const mockSaveUserToCrm = async (email: string): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`User with email ${email} saved to CRM.`);
      resolve();
    }, 1000);
  });
};

export const saveUserToCrmButtonAction: ButtonActionDefinition = {
  type: "saveUserToCrm",
  name: "Save User to CRM",
  description:
    "Verifies the user's email and saves their data to the CRM. Must have a field with 'email' field ID present in the form.",
  canAdd: ({ actions }) => {
    return !actions.some(action => action.type === "saveUserToCrm");
  },
  action: async ({ funnelSubmissionVm }) => {
    const enteredEmail = funnelSubmissionVm.getField("email").getRawValue() as string | undefined;
    await mockVerifyEmail(enteredEmail);
    await mockSaveUserToCrm(enteredEmail!);
    return true;
  }
};
