import { FunnelVm } from "../viewModels/FunnelVm";
import { FunnelSubmissionVm } from "../viewModels/FunnelSubmissionVm";

export interface ButtonElementData {
  actions: ButtonActionDto[];
  label: string;
}

export interface ActionParams {
  funnelVm: FunnelVm;
  funnelSubmissionVm: FunnelSubmissionVm;
}

export interface CanAddParams {
  actions: ButtonActionDto[];
}

export interface ButtonActionDefinition {
  type: string;
  name: string;
  description?: string;
  updateButtonLabel?: string;
  action: (params: ActionParams) => boolean | Promise<boolean>;
  canAdd?: (params: CanAddParams) => boolean;
  extra?: any;
}

export interface ButtonActionDto {
  id: string;
  type: string;
  extra: any;
}
