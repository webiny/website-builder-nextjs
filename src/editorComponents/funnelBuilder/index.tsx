"use client";
import {
  createComponent,
  createObjectInput,
  createSlotInput,
  createTextInput,
  createNumberInput
} from "@webiny/website-builder-nextjs";
import type { FunnelFieldDefinitionModelDto } from "./models/FunnelFieldDefinitionModel";
import { FunnelContainer } from "./FunnelContainer/FunnelContainer";
import { FunnelStep } from "./FunnelStep";
import { FunnelTextField } from "./FunnelTextField";
import {
  childOfFunnel,
  descendantOfFunnelStep,
  noFieldsInLastStep,
  oneFunnelPerPage
} from "./constraints";
// import { funnelOnDescendantChange } from "./funnelOnDescendantChange";
import { onStepCreate } from "./FunnelContainer/onStepCreate";
import { onStepUpdate } from "./FunnelContainer/onStepUpdate";
import { onStepDelete } from "./FunnelContainer/onStepDelete";

export const funnelComponents = [
  createComponent(FunnelContainer, {
    name: "Fub/Container",
    label: "Funnel",
    group: "funnelBuilder",
    canDelete: true,
    hideFromToolbar: true,
    constraints: [oneFunnelPerPage],
    onDescendantChange: [onStepCreate, onStepUpdate, onStepDelete],
    inputs: [
      createObjectInput({
        name: "containerData",
        hideFromUi: true,
        fields: [],
        defaultValue: {}
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
  createComponent(FunnelTextField, {
    name: "Fub/TextField",
    label: "Text Field",
    group: "funnelBuilder",
    tags: ["funnel-field"],
    onChange: ctx => {
      ctx.log("TextField.onChange", ctx);
    },
    inputs: [
      createObjectInput({
        name: "fieldData",
        hideFromUi: true,
        fields: [],
        defaultValue: { type: "text" } as FunnelFieldDefinitionModelDto
      })
    ],
    constraints: [descendantOfFunnelStep]
  })
];
