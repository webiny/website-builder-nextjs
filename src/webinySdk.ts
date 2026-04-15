import { Webiny } from "@webiny/sdk";

export const webinySdk = new Webiny({
  endpoint: process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST || "",
  token: process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY,
  tenant: process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT ?? "root",
});

export type Language = Awaited<
  ReturnType<typeof webinySdk.languages.listLanguages>
>["value"][number];
