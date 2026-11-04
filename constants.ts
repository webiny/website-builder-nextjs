/**
 * Define your trailing slash behavior here.
 * This is then used in `next.config.ts` and slug normalization utility.
 */
export const trailingSlash = false;

/**
 * Cache redirects for this amount of time on the Next.js API.
 */
export const redirectsCacheTtl = 60;

/**
 * The CMS model the `articles` routes render. Its `layout` setting names the layout articles render in.
 */
export const articleModelId = "code-article";
