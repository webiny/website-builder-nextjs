import { createWbComponent, createTextInput, createContentEntryInput } from "@webiny/sdk-nextjs";
import { Hero1 } from "./Hero1";
import { Banner } from "./Banner";
import { ContentEntryDemo } from "./ContentEntryDemo";

export const editorComponents = [
    createWbComponent(Hero1, {
        name: "Webiny/Hero",
        label: "Hero #1",
        aiContext: "Create a hero section with a headline and a call-to-action button.",
        inputs: []
    }),
    createWbComponent(Banner, {
        name: "Custom/Banner",
        label: "Banner",
        aiContext: "Never place multiple banners next to each other.",
        inputs: [
            createTextInput({
                name: "headline",
                label: "Headline",
                description: "The main headline text displayed on the banner.",
                defaultValue: "Ready to get started?"
            }),
            createTextInput({
                name: "ctaLabel",
                label: "Button Label",
                description: "The text displayed on the call-to-action button.",
                defaultValue: "Get started"
            }),
            createTextInput({
                name: "ctaUrl",
                label: "Button URL",
                description: "The URL the button links to.",
                defaultValue: "/"
            })
        ]
    }),
    createWbComponent(ContentEntryDemo, {
        name: "Custom/ContentEntryDemo",
        label: "Content Entry Demo",
        aiContext:
            "Demonstrates all three content-entry input modes: manual single, manual list, and dynamic query with pagination.",
        inputs: [
            // 1. Manual single — pick one article
            createContentEntryInput({
                name: "featuredArticle",
                label: "Featured Article",
                description: "Pick a single CMS entry to feature.",
                models: ["article"],
                mode: "manual"
            }),
            // 2. Manual list — pick multiple articles
            createContentEntryInput({
                name: "handpickedArticles",
                label: "Hand-picked Articles",
                description: "Select multiple CMS entries to display.",
                models: ["article"],
                mode: "manual",
                list: true
            }),
            // 3. Query mode — dynamic query with sort, limit, search, pagination
            createContentEntryInput({
                name: "latestArticles",
                label: "Latest Articles",
                description: "Dynamically query articles with sort, limit, and pagination.",
                models: ["article"],
                mode: "query",
                query: {
                    sort: {
                        fields: [
                            { field: "createdOn", label: "Created On" },
                            { field: "values_title", label: "Title" }
                        ]
                    },
                    limit: { default: 6, max: 20 },
                    search: true,
                    pagination: true
                }
            })
        ]
    })
];
