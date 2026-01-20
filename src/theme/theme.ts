import { createTheme } from "@webiny/website-builder-nextjs";

// Ambient declaration for TS.
declare const __THEME_CSS__: string;

export const getTheme = async () => {
  // This is injected via a webpack.DefinePlugin
  const css = __THEME_CSS__;

  /**
   * Create a theme for the Website Builder.
   */
  const theme = createTheme({
    css,
    fonts: ["https://fonts.googleapis.com/css2?family=Roboto&display=swap"],
    colors: [
      {
        id: "color1",
        label: "Color 1",
        value: "var(--wb-theme-color1)"
      },
      {
        id: "color2",
        label: "Color 2",
        value: "var(--wb-theme-color2)"
      },
      {
        id: "color3",
        label: "Color 3",
        value: "var(--wa-theme-color-text-base)"
      }
    ],
    typography: {
      headings: [
        {
          id: "heading1",
          label: "Heading 1",
          tag: "h1",
          className: "wb-heading-1"
        },
        {
          id: "heading2",
          label: "Heading 2",
          tag: "h2",
          className: "wb-heading-2"
        },
        {
          id: "heading3",
          label: "Heading 3",
          tag: "h3",
          className: "wb-heading-3"
        }
      ],
      paragraphs: [
        {
          id: "paragraph1",
          label: "Paragraph 1",
          tag: "p",
          className: "wb-paragraph-1"
        }
      ],
      quotes: [
        {
          id: "quote",
          label: "Quote",
          tag: "blockquote",
          className: "wb-blockquote-1"
        }
      ],
      lists: [
        {
          id: "list1",
          label: "List 1",
          tag: "ul",
          className: "wb-unordered-list-1"
        },
        {
          id: "list2",
          label: "List 2",
          tag: "ol",
          className: "wb-ordered-list-1"
        }
      ]
    }
  });

  return { theme, css };
};
