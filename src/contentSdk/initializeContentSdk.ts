import {
  contentSdk,
  type WebsiteBuilderThemeInput,
} from "@webiny/website-builder-nextjs";
import { registerComponentGroups } from "./groups";

interface ContentSdkOptions {
  tenantId?: string;
  preview?: boolean;
  theme?: WebsiteBuilderThemeInput;
}

export const initializeContentSdk = ({
  tenantId,
  preview,
  theme,
}: ContentSdkOptions = {}) => {
  contentSdk.init(
    {
      apiKey: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
      apiHost: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST),
      apiTenant:
        tenantId ?? String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT),
      preview,
      theme,
    },
    registerComponentGroups,
  );
};
