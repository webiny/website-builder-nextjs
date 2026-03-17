import type { ComponentConstraint } from "@webiny/website-builder-nextjs";

export const descendantOfBox: ComponentConstraint["check"] = ctx => {
  return ctx.isDescendantOf("Webiny/Box");
};

export const childOfBox: ComponentConstraint["check"] = ctx => {
  if (ctx.isChildOf("Webiny/Box")) {
    return true;
  }
  throw new Error("Drop it into a Box dude....");
};

export const childOfBoxInGrid: ComponentConstraint["check"] = ctx => {
  if (!ctx.isChildOf("Webiny/Box")) {
    throw new Error("Drop it into a Box dude....");
  }

  if (!ctx.isDescendantOf("Webiny/Grid")) {
    throw new Error("Your box must be a descendant of a Grid.");
  }

  return true;
};
