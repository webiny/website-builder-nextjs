# Webiny Website Builder — Next.js Starter

A Next.js starter kit for building sites powered by Webiny Website Builder.

---

## Get started

Follow the [Learn Webiny Website Builder](https://www.webiny.com/learn/course/website-builder/setting-up-website-builder) course to get up and running, or check out the [Learn Webiny](https://webiny.com/learn) course for a broader introduction.

## Documentation

For full documentation, visit [webiny.com/docs](https://www.webiny.com/docs).

## Multi-language

Languages are managed in Webiny. Each page has a `language` property and a set of `languagePaths` that map language codes to their corresponding URLs (e.g. `{ en: "/en/contact", de: "/de/kontakt" }`).

The default language is served at the root path (e.g. `/about`). All other languages are prefixed with their language code (e.g. `/de/about`).

The `LanguageSelector` component in the header reads the available languages and the current language from the server, and renders a dropdown that links directly to the equivalent page in each language. When no matching page exists for a given URL, the active language is inferred from the first URL segment.

## Community

For help, discussion about best practices, or feature ideas:

[Join our Slack community](https://www.webiny.com/slack)
