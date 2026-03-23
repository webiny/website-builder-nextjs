import { FunnelModel } from "../models/FunnelModel";

export const createInitialContainerData = () => {
  const funnel = new FunnelModel();
  return funnel.toDto();
};
