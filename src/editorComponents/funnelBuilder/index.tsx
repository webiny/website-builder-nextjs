"use client";
import {
  createComponent,
  createObjectInput,
  createSlotInput,
  createTextInput,
  createBooleanInput,
  createNumberInput
} from "@webiny/website-builder-nextjs";
import { Funnel } from "./Funnel";
import { FunnelStep } from "./FunnelStep";
import { FunnelTextField } from "./FunnelTextField";
import {
  childOfFunnel,
  descendantOfFunnelStep,
  noFieldsInLastStep,
  oneFunnelPerPage
} from "./constraints";
// import { funnelOnDescendantChange } from "./funnelOnDescendantChange";
import { onStepCreate } from "./Funnel/onStepCreate";
import { onStepUpdate } from "./Funnel/onStepUpdate";
import { onStepDelete } from "./Funnel/onStepDelete";

export const funnelComponents = [
  createComponent(Funnel, {
    name: "FunnelBuilder/Funnel",
    label: "Funnel",
    group: "funnelBuilder",
    canDelete: true,
    hideFromToolbar: true,
    constraints: [oneFunnelPerPage],
    onDescendantChange: [onStepCreate, onStepUpdate, onStepDelete],
    inputs: [
      createObjectInput({
        name: "registry",
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
        components: ["FunnelBuilder/Step"]
      }),
      createObjectInput({
        name: "conditionRules",
        list: true,
        renderer: "FunnelBuilder/ConditionRulesRenderer",
        fields: []
      })
    ]
  }),
  createComponent(FunnelStep, {
    name: "FunnelBuilder/Step",
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
    name: "FunnelBuilder/TextField",
    label: "Text Field",
    group: "funnelBuilder",
    tags: ["funnel-field"],
    onChange: ctx => {
      ctx.log("TextField.onChange", ctx);
    },
    inputs: [
      createTextInput({
        name: "label",
        label: "Label",
        defaultValue: "Label"
      }),
      createTextInput({
        name: "placeholder",
        label: "Placeholder",
        defaultValue: "Enter text..."
      }),
      createBooleanInput({
        name: "required",
        label: "Required",
        defaultValue: false
      })
    ],
    constraints: [descendantOfFunnelStep]
  })
];
