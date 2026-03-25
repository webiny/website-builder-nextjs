import { createSdk } from "./webiny";

interface TenantExtensionsTheme {
  primaryColor?: string;
  secondaryColor?: string;
}

export async function getTenantThemeCss(tenantId: string): Promise<string> {
  const result = await createSdk(tenantId).tenantManager.getCurrentTenant();
  if (!result.isOk()) {
    return "";
  }
  const theme = ((result.value.values.extensions as any)?.theme ?? {}) as TenantExtensionsTheme;
  const primary = theme.primaryColor || "#000000";
  const secondary = theme.secondaryColor || "#000000";
  return `:root { --fub-primary-color: ${primary}; --fub-secondary-color: ${secondary}; }`;
}
