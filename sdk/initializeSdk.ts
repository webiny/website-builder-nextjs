import { sdk, type WebsiteBuilderThemeInput } from "@webiny/sdk-nextjs";
import { backend } from "./backend";
import { componentGroups } from "./groups";

interface ContentSdkOptions {
    tenantId?: string;
    preview?: boolean;
    theme?: WebsiteBuilderThemeInput;
}

// The SDK is initialized even when no backend is configured: the theme and the component groups it
// carries are what the editor needs to render this frontend's components. Data fetching is guarded
// separately, through `fromBackend`.
const initializeSdk = ({ tenantId, preview, theme }: ContentSdkOptions = {}) => {
    sdk.init({
        endpoint: backend.apiHost,
        token: backend.apiKey,
        tenant: tenantId ?? backend.tenant,
        preview,
        wb: { theme, componentGroups }
    });
};

export { sdk, initializeSdk };
