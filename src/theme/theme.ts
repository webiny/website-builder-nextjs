import { createTheme } from "@webiny/website-builder-nextjs";

// Ambient declaration for TS.
// `__THEME_CSS__` is replaced at build time with the compiled contents of theme.css.
declare const __THEME_CSS__: string;

export const css = __THEME_CSS__;

export const theme = createTheme({
  css,
  fonts: ["https://fonts.googleapis.com/css2?family=Inter&display=swap"],
  colors: [
    {
      id: "color-primary",
      label: "Primary",
      value: "var(--wb-theme-color-primary)",
    },
    {
      id: "color-secondary",
      label: "Secondary",
      value: "var(--wb-theme-color-secondary)",
    },
    {
      id: "color-background",
      label: "Background",
      value: "var(--wb-theme-color-background)",
    },
    {
      id: "color-surface",
      label: "Surface",
      value: "var(--wb-theme-color-surface)",
    },
    {
      id: "color-text-base",
      label: "Text",
      value: "var(--wb-theme-color-text-base)",
    },
    {
      id: "color-text-muted",
      label: "Text Muted",
      value: "var(--wb-theme-color-text-muted)",
    },
    {
      id: "color-border",
      label: "Border",
      value: "var(--wb-theme-color-border)",
    },
    {
      id: "color-success",
      label: "Success",
      value: "var(--wb-theme-color-success)",
    },
    {
      id: "color-warning",
      label: "Warning",
      value: "var(--wb-theme-color-warning)",
    },
    { id: "color-error", label: "Error", value: "var(--wb-theme-color-error)" },
  ],
  typography: {
    headings: [
      {
        id: "heading1",
        label: "Heading 1",
        tag: "h1",
        className: "wb-heading-1",
      },
      {
        id: "heading2",
        label: "Heading 2",
        tag: "h2",
        className: "wb-heading-2",
      },
      {
        id: "heading3",
        label: "Heading 3",
        tag: "h3",
        className: "wb-heading-3",
      },
    ],
    paragraphs: [
      {
        id: "paragraph1",
        label: "Paragraph 1",
        tag: "p",
        className: "wb-paragraph-1",
      },
    ],
    quotes: [
      {
        id: "quote",
        label: "Quote",
        tag: "blockquote",
        className: "wb-blockquote-1",
      },
    ],
    lists: [
      {
        id: "list1",
        label: "List 1",
        tag: "ul",
        className: "wb-unordered-list-1",
      },
      {
        id: "list2",
        label: "List 2",
        tag: "ol",
        className: "wb-ordered-list-1",
      },
    ],
  },
});
