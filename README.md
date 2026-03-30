# Webiny Website Builder — Next.js Starter Kit

A Next.js starter kit for building multi-tenant sites powered by Webiny Website Builder, with support for funnel pages and dynamic theming.

---

## Quick Start

Follow the [Learn Webiny Website Builder](https://www.webiny.com/learn/course/website-builder/setting-up-website-builder) course to get up and running, or check out the [Learn Webiny](https://webiny.com/learn) course for a broader introduction.

## Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY=your-api-key-here
NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST=https://your-api-host.com
```

**Getting your credentials:**

In Webiny Admin:

1. Click **Support** in the bottom-left sidebar
2. Select **Configure Next.js**
3. Copy the environment variables

**Note on `NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT`:**

The dialog will show a `NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT=root` variable. This is **only needed for single-tenant setups**. This starter kit supports multi-tenancy out of the box by resolving tenant at runtime (see Multi-Tenancy section below).

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).

## Multi-Tenancy

This starter kit supports multi-tenant architectures without requiring the `NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT` environment variable.

### How Tenant Resolution Works

Tenant identification happens at runtime via the middleware (`src/middleware.ts:16`):

```typescript
const tenantId = searchParams.get("wb.tenant") ?? resolveTenantFromHostname(hostname);
```

**Two resolution strategies:**

1. **Query Parameter** (`wb.tenant`): Used by the Webiny editor iframe when loading your app in preview/editing mode
2. **Subdomain** (hostname): Used for public traffic

**Example:**

```
# Editor preview
http://localhost:3000?wb.tenant=tenant-a&wb.editing=true

# Public traffic
https://tenant-a.example.com/pricing  → resolves to "tenant-a"
https://tenant-b.example.com/pricing  → resolves to "tenant-b"
```

### Subdomain Resolution Logic

The `resolveTenantFromHostname` function extracts the subdomain:

```typescript
function resolveTenantFromHostname(hostname: string): string | undefined {
  // Example: tenant-a.example.com → "tenant-a"
  const subdomain = hostname.split(".")[0];
  return subdomain !== "www" ? subdomain : undefined;
}
```

- `tenant-a.example.com` → `"tenant-a"`
- `www.example.com` → `undefined` (falls back to root tenant)
- `example.com` → `"example"` (single-label domain)

### Using Tenant in Your Code

The resolved tenant ID is stored in the `X-Tenant` header and can be accessed via:

```typescript
import { getTenant } from "@/src/contentSdk";

const tenantId = await getTenant(); // Returns "root" as fallback
```

This is used throughout the app:

- **Page fetching**: `initializeContentSdk({ tenantId: await getTenant() })`
- **Theme loading**: `getTenantThemeCss(tenantId)`
- **Direct SDK calls**: `createSdk(tenantId).tenantManager.getCurrentTenant()`

## Theming

The starter kit combines **static theme definitions** (in your code) with **dynamic tenant-specific styles** (fetched from Webiny).

### Static Theme (`src/theme/theme.ts`)

Define your base theme configuration:

```typescript
export const theme = createTheme({
  css,
  fonts: ["https://fonts.googleapis.com/css2?family=Inter&display=swap"],
  colors: [
    { id: "color-primary", label: "Primary", value: "var(--wb-theme-color-primary)" },
    { id: "color-secondary", label: "Secondary", value: "var(--wb-theme-color-secondary)" }
    // ... more colors
  ],
  typography: {
    headings: [
      { id: "heading1", label: "Heading 1", tag: "h1", className: "wb-heading-1" }
      // ... more typography
    ]
  }
});
```

This theme object is passed to the Website Builder SDK and used in the editor for component configuration.

### Dynamic Tenant Theming (`src/lib/getTenantThemeCss.ts`)

Tenant-specific theme values are stored in **Tenant Settings** in Webiny Admin under `extensions.theme`:

```typescript
interface TenantExtensionsTheme {
  primaryColor?: string;
  secondaryColor?: string;
}
```

**How it works:**

1. On each request, `getTenantThemeCss(tenantId)` fetches the current tenant's settings via the SDK:

   ```typescript
   const result = await createSdk(tenantId).tenantManager.getCurrentTenant();
   const theme = result.value.values.extensions?.theme ?? {};
   ```

2. Generates CSS custom properties:

   ```typescript
   return `:root { 
     --fub-primary-color: ${theme.primaryColor || "#000000"}; 
     --fub-secondary-color: ${theme.secondaryColor || "#000000"}; 
   }`;
   ```

3. Injects into `<head>` in `src/app/layout.tsx`:

   ```typescript
   const tenantThemeCss = await getTenantThemeCss(tenantId);

   <head>
     <style>{css}</style>
     {tenantThemeCss && <style>{tenantThemeCss}</style>}
   </head>
   ```

### Setting Tenant Theme Values

Theme values are managed in the **Funnel Builder extension** in your Webiny project:

1. In Webiny Admin, the extension provides a UI to configure `primaryColor` and `secondaryColor`
2. Values are saved to the tenant's `extensions.theme` object
3. Your Next.js app fetches these values on each request and applies them as CSS variables

**Example usage in components:**

```css
.my-button {
  background-color: var(--fub-primary-color);
  border-color: var(--fub-secondary-color);
}
```

### Theme CSS Variables

The starter kit defines base CSS variables in `src/theme/theme.css`:

```css
:root {
  /* Base theme colors (static) */
  --wb-theme-color-primary: #3b82f6;
  --wb-theme-color-secondary: #8b5cf6;
  --wb-theme-color-background: #ffffff;
  /* ... */

  /* Tenant-specific colors (dynamic, overridden by getTenantThemeCss) */
  --fub-primary-color: #000000;
  --fub-secondary-color: #000000;
}
```

## Project Structure

```
src/
├── app/
│   ├── [[...slug]]/
│   │   └── page.tsx         # Catch-all route — renders all pages
│   ├── api/
│   │   └── preview/         # Enables Next.js draft mode for preview
│   └── layout.tsx           # Root layout with theme injection
├── components/
│   ├── DocumentRenderer.tsx # Renders page documents using editorComponents
│   ├── Header.tsx
│   ├── NotFound.tsx
│   └── PageLayout.tsx
├── contentSdk/
│   ├── initializeContentSdk.ts  # SDK initialization
│   ├── getTenant.ts             # Tenant resolution from headers
│   ├── groups.ts                # Component group registration
│   └── ContentSdkInitializer.ts # Client-side SDK initializer
├── editorComponents/
│   ├── index.tsx            # Register your components here
│   ├── funnel/              # Funnel-specific components
│   └── ...                  # Standard components (Hero, CTA, etc.)
├── lib/
│   ├── getTenantThemeCss.ts # Fetches tenant theme from Webiny
│   └── webiny.ts            # SDK factory
├── theme/
│   ├── theme.css            # CSS variables + base styles
│   ├── theme.ts             # createTheme() configuration
│   └── tailwind.css
├── middleware.ts            # Tenant resolution, preview mode, redirects
└── constants.ts
```

## Funnel Builder Support

This starter kit includes components for building multi-step funnels:

- **Funnel Container**: Manages step state and form submissions
- **Form Fields**: Text, textarea, checkbox groups with validation
- **Step Navigation**: Client-side step progression

### Key Directories for Funnel Customization

- **`src/editorComponents/funnelBuilder/fields/`** - Create new field page elements (e.g., date picker, dropdown)
- **`src/editorComponents/funnelBuilder/button/buttonActions/`** - Add custom button actions (e.g., submit to API, redirect)
- **`src/editorComponents/funnelBuilder/models/conditionActions/`** - Define actions triggered by conditions (e.g., hide/show fields)
- **`src/editorComponents/funnelBuilder/models/conditionOperators/`** - Add custom condition logic operators (e.g., "contains", "is empty")
- **`src/editorComponents/funnelBuilder/models/validators/`** - Create custom field validators (e.g., credit card, phone format)

## Customization

### Adding New Components

1. Create a new component in `src/editorComponents/`
2. Register it in `src/editorComponents/index.tsx`
3. The component will appear in the editor palette automatically

### Modifying Theme

- **Static theme**: Edit `src/theme/theme.ts` and `src/theme/theme.css`
- **Tenant theme**: Configure in Webiny Admin (requires Funnel Builder extension)

### Multi-Domain Setup

To support multiple domains (e.g., `tenant-a.com`, `tenant-b.com`):

1. Update `resolveTenantFromHostname` in `src/middleware.ts` with your domain mapping logic
2. Configure DNS/hosting to point all domains to your Next.js app
3. Add domain-to-tenant mapping (e.g., via environment variables or a config file)

## Documentation

For full documentation, visit [webiny.com/docs](https://www.webiny.com/docs).
