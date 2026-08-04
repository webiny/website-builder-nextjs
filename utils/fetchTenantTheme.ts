import { sdk } from "@webiny/sdk-nextjs";

export interface TenantTheme {
    websiteTitle: string;
    font: string;
    primaryColor: string;
    additionalColors: string[];
}

export async function fetchTenantTheme(): Promise<TenantTheme | null> {
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
        console.error("Failed to fetch tenant theme:", e);
        return null;
    }
}
