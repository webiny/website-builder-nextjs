import {
  registerComponentGroup,
  type ComponentManifest,
} from "@webiny/website-builder-nextjs";

export const registerComponentGroups = () => {
  registerComponentGroup({
    name: "basic",
    label: "Basic",
    description: "Components for simple content creation",
  });
  registerComponentGroup({
    name: "funnelBuilder",
    label: "Funnel Builder",
    description: "Components for building of funnels",
  });
  registerComponentGroup({
    name: "custom",
    label: "Custom",
    description: "Assorted custom components",
    filter: (component: ComponentManifest) => !component.group,
  });
};
