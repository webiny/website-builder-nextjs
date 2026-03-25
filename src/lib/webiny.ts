import { Sdk } from "@webiny/sdk";

export const createSdk = (tenantId: string) =>
  new Sdk({
    token: process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY!,
    endpoint: process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST!,
    tenant: tenantId
  });
