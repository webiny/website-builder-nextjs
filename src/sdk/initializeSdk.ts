import { sdk, type WebsiteBuilderThemeInput } from "@webiny/sdk-nextjs";
import { componentGroups } from "./groups";

interface ContentSdkOptions {
    tenantId?: string;
    preview?: boolean;
    theme?: WebsiteBuilderThemeInput;
}

export const initializeSdk = ({ tenantId, preview, theme }: ContentSdkOptions = {}) => {
    sdk.init({
        endpoint: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST),
        token: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
        tenant: tenantId ?? String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT),
        preview,
        wb: { theme, componentGroups }
    });
};
