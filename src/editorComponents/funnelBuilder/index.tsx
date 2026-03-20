"use client";
import {
  createComponent,
  createObjectInput,
  createSlotInput,
  createTextInput,
  createNumberInput
} from "@webiny/website-builder-nextjs";
import { FunnelContainer } from "./FunnelContainer";
import { FunnelStep } from "./FunnelStep";
import { funnelTextFieldComponent } from "./fields/text";
import { funnelTextareaFieldComponent } from "./fields/textarea";
import { funnelCheckboxGroupFieldComponent } from "./fields/checkboxGroup";
import { childOfFunnel, noFieldsInLastStep, oneFunnelPerPage } from "./constraints";
// import { funnelOnDescendantChange } from "./funnelOnDescendantChange";
import { onStepCreate } from "./FunnelContainer/onStepCreate";
import { onStepUpdate } from "./FunnelContainer/onStepUpdate";
import { onStepDelete } from "./FunnelContainer/onStepDelete";
import { onFieldCreate } from "./FunnelContainer/onFieldCreate";
import { onFieldUpdate } from "./FunnelContainer/onFieldUpdate";
import { onFieldDelete } from "./FunnelContainer/onFieldDelete";
import { FunnelModelDto } from "./models/FunnelModel";

export const funnelComponents = [
  createComponent(FunnelContainer, {
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
  }),
  createComponent(FunnelStep, {
    name: "Fub/Step",
    label: "Funnel Step",
    group: "funnelBuilder",
    acceptsChildren: true,
    // hideFromToolbar: true,
    inputs: [
      createTextInput({
        name: "label",
        label: "Label"
      })
    ],
    canDelete: ctx => {
      ctx.log("Checking if step can be deleted...");
      if (ctx.component.isFirstChild()) {
        return ctx.block("Cannot delete first step.");
      }
      if (ctx.component.isLastChild()) {
        return ctx.block("Cannot delete last step.");
      }
    },
    constraints: [childOfFunnel],
    descendantConstraints: [noFieldsInLastStep],
    defaults: {
      inputs: {
        label: "New Step"
      }
    }
  }),
  funnelTextFieldComponent,
  funnelTextareaFieldComponent,
  funnelCheckboxGroupFieldComponent
];
