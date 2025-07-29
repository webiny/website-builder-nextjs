import { createTheme, useCss } from "@webiny/website-builder-nextjs";

export const getTheme = async () => {
    /**
     * Import raw theme CSS (default location: `src/themes/theme.css`).
     */
    const css = await useCss();

    /**
     * Create a theme for the Website Builder.
     */
    const theme = createTheme({
        css,
        cssVariables: {
            "--wb-theme-font-family": "Roboto, sans-serif"
        },
        fonts: ["https://fonts.googleapis.com/css2?family=Roboto&display=swap"],
        styles: {
            colors: {
                color1: "var(--wb-theme-color1)",
                color2: "var(--wb-theme-color2)",
                color3: "var(--wb-theme-color3)",
                color4: "var(--wb-theme-color4)",
                color5: "var(--wb-theme-color5)",
                color6: "var(--wb-theme-color6)"
            },
            typography: {
                headings: [
                    {
                        id: "heading1",
                        name: "Heading 1",
                        tag: "h1",
                        className: "wb-heading-1"
                    },
                    {
                        id: "heading2",
                        name: "Heading 2",
                        tag: "h2",
                        className: "wb-heading-2"
                    },
                    {
                        id: "heading3",
                        name: "Heading 3",
                        tag: "h3",
                        className: "wb-heading-3"
                    },
                    {
                        id: "heading4",
                        name: "Heading 4",
                        tag: "h4",
                        className: "wb-heading-4"
                    },
                    {
                        id: "heading5",
                        name: "Heading 5",
                        tag: "h5",
                        className: "wb-heading-5"
                    },
                    {
                        id: "heading6",
                        name: "Heading 6",
                        tag: "h6",
                        className: "wb-heading-6"
                    }
                ],
                paragraphs: [
                    {
                        id: "paragraph1",
                        name: "Paragraph 1",
                        tag: "p",
                        className: "wb-paragraph-1"
                    },
                    {
                        id: "paragraph2",
                        name: "Paragraph 2",
                        tag: "p",
                        className: "wb-paragraph-2"
                    }
                ],
                quotes: [
                    {
                        id: "quote",
                        name: "Quote",
                        tag: "blockquote",
                        className: "wb-blockquote-1"
                    }
                ],
                lists: [
                    { id: "list1", name: "List 1", tag: "ul", className: "wb-unordered-list-1" },
                    { id: "list2", name: "List 2", tag: "ol", className: "wb-ordered-list-1" }
                ]
            }
        }
    });

    return { theme, css };
};
