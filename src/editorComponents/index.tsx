"use client";
import { createComponent, createTextInput } from "@webiny/sdk-nextjs";
import { Hero1 } from "./Hero1";
import { Banner } from "./Banner";

export const editorComponents = [
    createComponent(Hero1, {
        name: "Webiny/Hero",
        label: "Hero #1",
        aiContext: "Create a hero section with a headline and a call-to-action button.",
        inputs: []
    }),
    createComponent(Banner, {
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
