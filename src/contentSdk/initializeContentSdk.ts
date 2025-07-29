import {
    contentSdk,
    registerComponentGroup,
    type ComponentManifest,
    type WebsiteBuilderThemeInput
} from "@webiny/website-builder-nextjs";

interface ContentSdkOptions {
    preview?: boolean;
    theme?: WebsiteBuilderThemeInput
}

export const initializeContentSdk = (options: ContentSdkOptions = {}) => {
    contentSdk.init(
        {
            apiKey: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
            apiHost: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST),
            apiTenant: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT),
            preview: options.preview === true,
            theme: options.theme
        },
        () => {
            registerComponentGroup({
                name: "basic",
                label: "Basic",
                description: "Components for simple content creation"
            });

            registerComponentGroup({
                name: "sample",
                label: "Sample Ecommerce",
                description: "Sample ecommerce components"
            });

            registerComponentGroup({
                name: "custom",
                label: "Custom",
                description: "Assorted custom components",
                filter: (component: ComponentManifest) => !component.group
            });
        }
    );
};
