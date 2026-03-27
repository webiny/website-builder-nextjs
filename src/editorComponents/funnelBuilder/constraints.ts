import type { ComponentConstraint } from "@webiny/website-builder-nextjs";

export const descendantOfFunnel: ComponentConstraint = ctx => {
  if (!ctx.isDescendantOf("Fub/Container")) {
    return ctx.block("This component must be placed inside a Funnel.");
  }
};

export const childOfFunnel: ComponentConstraint = ctx => {
  if (!ctx.isChildOf("Fub/Container")) {
    return ctx.block("This component must be placed inside a Funnel.");
  }
};

export const descendantOfFunnelStep: ComponentConstraint = ctx => {
  if (!ctx.isDescendantOf("Fub/Step")) {
    return ctx.block("This component must be placed inside a Funnel Step.");
  }
};

/**
 * Used as a descendantConstraint on Fub/Step.
 * Blocks funnel-field tagged components from being placed in the last step.
 */
export const noFieldsInLastStep: ComponentConstraint = ctx => {
  console.log("ctx.component.name, ");
  if (!ctx.component.name.startsWith("Fub/Field/")) {
    return;
  }

  const step = ctx.getAncestor("Fub/Step");
  if (step && step.isLastChild()) {
    return ctx.block("Funnel fields cannot be placed in the last step.");
  }

  return;
};
