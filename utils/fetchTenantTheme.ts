import { sdk } from "@webiny/sdk-nextjs";
import { isBackendConfigured } from "@/sdk/backend";
import { rethrowIfNextControlFlow } from "@/utils/nextControlFlow";

export interface TenantTheme {
    websiteTitle: string;
    font: string;
    primaryColor: string;
    additionalColors: string[];
}

export async function fetchTenantTheme(): Promise<TenantTheme | null> {
    // Without a backend there is no tenant to ask; the local theme is used as-is.
    if (!isBackendConfigured) {
        return null;
    }

    try {
        const result = await sdk.tenantManager.getCurrentTenant();

        if (result.isFail()) {
            console.error("Failed to fetch tenant:", result.error);
            return null;
        }

        const values = result.value.values.extensions as Partial<TenantTheme>;

        if (!values.primaryColor && !values.font) {
            return null;
        }

        return {
            websiteTitle: values.websiteTitle ?? "",
            font: values.font ?? "",
            primaryColor: values.primaryColor ?? "",
            additionalColors: values.additionalColors ?? []
        };
    } catch (e) {
        rethrowIfNextControlFlow(e);
        console.error("Failed to fetch tenant theme:", e);
        return null;
    }
}
