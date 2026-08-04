# Webiny Website Builder — Next.js Starter

A Next.js starter kit for building sites powered by Webiny Website Builder.

---

## About this branch (`demo-frontend`)

This branch is the **demo frontend**: the one deployed at `https://wb-demo.webiny.com` and offered
from the Website Builder editor to people who haven't deployed a frontend of their own yet. It exists
so that a brand new Webiny instance still has something to render pages into, and so the editor can
be tried out before any frontend work has started.

Unlike the starter kit's other branches, it is **backend agnostic**: it runs with no
`NEXT_PUBLIC_WEBINY_*` variables at all, and connects to whichever Webiny instance opened it.

**What works without a backend**

- Building pages in the editor with the demo sections in [`editorComponents/`](./editorComponents)
  (hero, features, content, stats, testimonials, FAQ, CTA)
- Everything the editor drives: drag and drop, editing inputs, styles, breakpoints

That works because the editor sends the page you're editing straight to the preview, so the page
never has to be fetched.

**What needs your own Webiny instance**

- Previewing and viewing pages outside the editor, including published pages
- Redirects, languages, and the tenant theme
- Headless CMS content, and anything bound to it

To get those, deploy this starter kit against your own instance and point the editor's preview domain
at it. The [Learn Webiny Website Builder](https://www.webiny.com/learn/course/website-builder/setting-up-website-builder)
course walks through it.

> Keep this branch free of instance-specific configuration. Anything that assumes one particular
> Webiny deployment belongs on a branch of your own, not here.

---

## Get started

Follow the [Learn Webiny Website Builder](https://www.webiny.com/learn/course/website-builder/setting-up-website-builder) course to get up and running, or check out the [Learn Webiny](https://webiny.com/learn) course for a broader introduction.

## Documentation

For full documentation, visit [webiny.com/docs](https://www.webiny.com/docs).

## Multi-language

Languages are managed in Webiny. Each page has a `language` property and a set of `languagePaths` that map language codes to their corresponding URLs (e.g. `{ en: "/en/contact", de: "/de/kontakt" }`).

Rules of URLs in the Website Builder:

- 1 language in the system - pages are NOT prefixed with the language code
- 2 or more languages in the system - page paths are prefixed with their language code (e.g. `/de/about`).

The `LanguageSelector` component in the header reads the available languages and the current language from the server, and renders a dropdown that links directly to the equivalent page in each language. When no matching page exists for a given URL, the active language is inferred from the first URL segment.

## Community

For help, discussion about best practices, or feature ideas:

[Join our Slack community](https://www.webiny.com/slack)
