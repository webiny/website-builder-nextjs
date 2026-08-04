import { sdk, type WebsiteBuilderThemeInput } from "@webiny/sdk-nextjs";
import { componentGroups } from "./groups";

interface ContentSdkOptions {
    tenantId?: string;
    preview?: boolean;
    theme?: WebsiteBuilderThemeInput;
}

const initializeSdk = ({ tenantId, preview, theme }: ContentSdkOptions = {}) => {
    sdk.init({
        endpoint: String(process.env.NEXT_PUBLIC_WEBINY_API_HOST),
        token: String(process.env.NEXT_PUBLIC_WEBINY_API_KEY),
        tenant: tenantId ?? String(process.env.NEXT_PUBLIC_WEBINY_API_TENANT),
        preview,
        wb: { theme, componentGroups }
    });
};

export { sdk, initializeSdk };
