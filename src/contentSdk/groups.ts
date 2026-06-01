import {
  registerComponentGroup,
  type ComponentManifest,
} from "@webiny/website-builder-nextjs";

export const registerComponentGroups = () => {
  registerComponentGroup({
    name: "basic",
    label: "Basic",
    description: "Components for simple content creation",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3z"/></svg>'

  });
  registerComponentGroup({
    name: "custom",
    label: "Custom",
    description: "Assorted custom components",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.5 4.5c.28 0 .5.22.5.5v2h6v6h2c.28 0 .5.22.5.5s-.22.5-.5.5h-2v6h-2.12c-.68-1.75-2.39-3-4.38-3s-3.7 1.25-4.38 3H4v-2.12c1.75-.68 3-2.39 3-4.38 0-1.99-1.24-3.7-2.99-4.38L4 7h6V5c0-.28.22-.5.5-.5m0-2A2.5 2.5 0 0 0 8 5H4c-1.1 0-1.99.9-1.99 2v3.8h.29c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-.3c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7v.3H17c1.1 0 2-.9 2-2v-4a2.5 2.5 0 0 0 0-5V7c0-1.1-.9-2-2-2h-4a2.5 2.5 0 0 0-2.5-2.5z"/></svg>',
    filter: (component: ComponentManifest) => !component.group,
  });
};
