import {
  createComponent,
  createObjectInput,
  createSlotInput
} from "@webiny/website-builder-nextjs";
import { FunnelContainer } from "./FunnelContainer";
import { oneFunnelPerPage } from "./constraints";
import { onDescendantChange } from "./onDescendantChange";
import { FunnelModelDto } from "@/src/editorComponents/funnelBuilder/models/FunnelModel";

export const funnelContainerComponent = createComponent(FunnelContainer, {
  name: "Fub/Container",
  label: "Funnel",
  group: "funnelBuilder",
  canDelete: true,
  hideFromToolbar: true,
  constraints: [oneFunnelPerPage],
  onDescendantChange,
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
    createSlotInput({
      name: "steps",
      list: true,
      components: ["Fub/Step"]
    })
  ]
});
