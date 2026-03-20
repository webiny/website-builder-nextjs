import { fieldFromDto } from "../models/fields/fieldFactory";

export const createInitialFieldData = (fieldType: string) => {
  const field = fieldFromDto({ type: fieldType, stepId: "" });
  return field.toDto();
};
