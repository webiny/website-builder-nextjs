"use client";
import { createWbComponent, createTextInput } from "@webiny/sdk-nextjs";
import { Hero1 } from "./Hero1";
import { Banner } from "./Banner";
import { DemoHeader } from "./DemoHeader";
import { DemoFooter } from "./DemoFooter";
import { DemoLoginDialog } from "./DemoLoginDialog";

export const editorComponents = [
    // Global components: one instance per site, rendered by the layout in `components/DocumentRenderer`.
    createWbComponent(DemoHeader, {
        name: "Demo/Header",
        label: "Site Header",
        global: true,
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "ACME Inc"
            }),
            createTextInput({
                name: "tagline",
                label: "Tagline",
                defaultValue: "Shown on every page"
            }),
            createTextInput({
                name: "loginLabel",
                label: "Login button label",
                defaultValue: "Log in"
            })
        ]
    }),
    createWbComponent(DemoLoginDialog, {
        name: "Demo/LoginDialog",
        label: "Login Dialog",
        global: true,
        // Render without a wrapper, so the editor's overlay covers the dialog, not an empty box.
        autoApplyStyles: false,
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "Log in to ACME"
            }),
            createTextInput({
                name: "text",
                label: "Text",
                defaultValue: "Use your ACME account to continue."
            }),
            createTextInput({
                name: "submitLabel",
                label: "Submit button label",
                defaultValue: "Log in"
            })
        ]
    }),
    createWbComponent(DemoFooter, {
        name: "Demo/Footer",
        label: "Site Footer",
        global: true,
        inputs: [
            createTextInput({
                name: "text",
                label: "Text",
                defaultValue: "© ACME Inc. All rights reserved."
            })
        ]
    }),
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
    })
];
