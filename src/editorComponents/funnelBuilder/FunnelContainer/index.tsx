import {
  createComponent,
  createObjectInput,
  createNumberInput,
  createSlotInput
} from "@webiny/website-builder-nextjs";
import { FunnelContainer } from "./FunnelContainer";
import { oneFunnelPerPage } from "../constraints";
import { onStepCreate } from "./onStepCreate";
import { onStepUpdate } from "./onStepUpdate";
import { onStepDelete } from "./onStepDelete";
import { onFieldCreate } from "./onFieldCreate";
import { onFieldUpdate } from "./onFieldUpdate";
import { onFieldDelete } from "./onFieldDelete";
import { FunnelModelDto } from "../models/FunnelModel";

export const funnelContainerComponent = createComponent(FunnelContainer, {
  name: "Fub/Container",
  label: "Funnel",
  group: "funnelBuilder",
  canDelete: true,
  hideFromToolbar: true,
  constraints: [oneFunnelPerPage],
  onDescendantChange: [
    onStepCreate,
    onStepUpdate,
    onStepDelete,
    onFieldCreate,
    onFieldUpdate,
    onFieldDelete
  ],
  inputs: [
    createObjectInput({
      name: "containerData",
      hideFromUi: true,
      fields: [],
      defaultValue: {
        steps: [],
        fields: [],
        conditionRules: []
      } as FunnelModelDto
    }),
    createNumberInput({
      name: "activeStep",
      label: "Active Step",
      defaultValue: 0,
      hideFromUi: true
    }),
    createSlotInput({
      name: "steps",
      list: true,
      components: ["Fub/Step"]
    })
  ]
});
