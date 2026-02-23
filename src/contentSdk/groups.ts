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
    name: "custom",
    label: "Custom",
    description: "Assorted custom components",
    filter: (component: ComponentManifest) => !component.group,
  });
};
