import type { ComponentConstraint } from "@webiny/website-builder-nextjs";

export const oneFunnelPerPage: ComponentConstraint = ctx => {
  if (ctx.countInstances("Fub/Container") >= 1) {
    return ctx.block("Only one Funnel is allowed per page.");
  }
};
