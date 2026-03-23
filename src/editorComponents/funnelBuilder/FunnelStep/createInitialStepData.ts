import { FunnelStepModel } from "../models/FunnelStepModel";

export const createInitialStepData = () => {
  const step = new FunnelStepModel();
  return step.toDto();
};
