import type { ComponentConstraint } from "@webiny/website-builder-nextjs";

export const oneFunnelPerPage: ComponentConstraint = ctx => {
  if (ctx.countInstances("FunnelBuilder/Funnel") >= 1) {
    return ctx.block("Only one Funnel is allowed per page.");
  }
};

export const descendantOfFunnel: ComponentConstraint = ctx => {
  if (!ctx.isDescendantOf("FunnelBuilder/Funnel")) {
    return ctx.block("This component must be placed inside a Funnel.");
  }
};

export const childOfFunnel: ComponentConstraint = ctx => {
  if (!ctx.isChildOf("FunnelBuilder/Funnel")) {
    return ctx.block("This component must be placed inside a Funnel.");
  }
};

export const descendantOfFunnelStep: ComponentConstraint = ctx => {
  if (!ctx.isDescendantOf("FunnelBuilder/Step")) {
    return ctx.block("This component must be placed inside a Funnel Step.");
  }
};

/**
 * Used as a descendantConstraint on FunnelBuilder/Step.
 * Blocks funnel-field tagged components from being placed in the last step.
 */
export const noFieldsInLastStep: ComponentConstraint = ctx => {
  if (!ctx.hasTag("funnel-field")) {
    return;
  }
  const step = ctx.getAncestor("FunnelBuilder/Step");
  if (!step || !step.isLastChild()) {
    return;
  }
  return ctx.block("Funnel fields cannot be placed in the last step.");
};
