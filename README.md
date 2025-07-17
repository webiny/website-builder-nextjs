This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

> NOTE: This is a sample project to get you started. You're free to change everything.

## What's included?

- Typecript 
- Tailwind
- sample ecommerce API
- sample components
- sample component groups

> This project uses [App Router](https://nextjs.org/docs/app)!

## Connecting to Webiny Website Builder

To connect to Webiny Website Builder, you'll need the following:

- Webiny API host URL
- Webiny API key
- Webiny Tenant ID

Configure the following ENV vars:

```dotenv
# .env
NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY: {YOU_API_KEY}
NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST: {YOU_API_HOST}
NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT: {YOU_API_TENANT}
```

## Content SDK

Webiny Content SDK is located in `src/contentSdk` folder. The [initializeContentSdk.ts](./src/contentSdk/initializeContentSdk.ts) file contains the SDK initialization, and editor component group registration. Customize your component groups here.

## Custom components

Custom components are passed directly to the `DocumentRenderer` (see the example in [./src/app/[[...slug]]/page.tsx](./src/app/[[...slug]]/page.tsx)).
To create custom components, see examples in [./src/editorComponents/index.tsx](./src/editorComponents/index.tsx).
