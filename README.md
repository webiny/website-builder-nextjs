This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

> [!NOTE]
> This is a sample project to get you started. You're free to change everything.

> [!WARNING]
> Pick the right branch for your Webiny project! If your Webiny project runs on `v6.0.0-alpha.1`, you need to check out the appropriate branch from this repo. If there isn't a matching branch, use the latest available.

## What's included?

- Typescript
- Tailwind
- Sample ecommerce API
- Sample components
- Sample component groups

> [!IMPORTANT]
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

## Cross-Origin Configuration

If you're using your Next.js project in an editor that is hosted on a domain different from your Next.js domain, you'll have to whitelist the editor's domain.

Open `next.config.ts`, and add your domain to the `Content-Security-Policy` header. For example:

```
{
    key: "Content-Security-Policy",
    value: "frame-ancestors http://localhost:3001 https://d3fak6u4cx01ke.cloudfront.net"
}
```

## Sample Routes

- `src/app/[[...slug]]` - this directory contains an example of simple static page generation, using pages from the Webiny Website Builder

- `src/app/product/[slug]` - this directory contains an example of Product Details Page (PDP) generation, using a combination of a remote ecommerce API, and optional editorial content.

## Website Builder SDK

When you initially clone this repo, `@webiny/website-builder-nextjs` package in the `package.json` will be set to `*`. We recommend you set the version to whatever is the latest version at the time of cloning. Also, keep in mind that it's preferable to keep this version in sync with your actual Webiny Admin app version, so the Editor SDK and the Contend SDK are on the same version.


> [!TIP]
> For developers: inspect the sample code for more inline comments!

## Ecommerce Integrations and Component Inputs

> [!IMPORTANT]
> This section is closely connected to, and depends on, ecommerce integrations in your Webiny Admin app. If you don't have any ecommerce integrations, you can skip this part.

Webiny Website Builder provides a way to integrate with your ecommerce platform of choice. Once an integration is enabled in Webiny Admin app, you get access to specialized component input renderers, which allow you to browse and select your ecommerce resources (products, categories, etc.) to assign them to your components in the editor.

To use a specific renderer in your component inputs definition, you need to follow a naming convention.
Here's an example, which creates a "text" input, which contains a list of string values, and uses a renderer called `SampleEcommerce/Product/List`.

### Single Resource Picker

```
createTextInput({
    name: "productId",
    renderer: "SampleEcommerce/Product",
    label: "Product"
})
```

<img src="./docs/single_resource_picker.png" alt="Single Resource Picker">

### Multiple Resources Picker

```
createTextInput({
    name: "productIds",
    list: true,
    renderer: "SampleEcommerce/Product/List",
    label: "Products"
})
```

<img src="./docs/multiple_resources_picker.png" alt="Multiple Resources Picker">
