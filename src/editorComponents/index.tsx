"use client";
import {
  createComponent,
  createTextInput,
} from "@webiny/website-builder-nextjs";
import { Hero_1 } from "./Hero-1";
import { Banner } from "./Banner";

export const editorComponents = [
  createComponent(Hero_1, {
    name: "Webiny/Hero",
    label: "Hero #1",
    inputs: [],
  }),
  createComponent(Banner, {
    name: "Custom/Banner",
    label: "Banner",
    inputs: [
      createTextInput({
        name: "headline",
        label: "Headline",
        description: "The main headline text displayed on the banner.",
        defaultValue: "Ready to get started?",
      }),
      createTextInput({
        name: "ctaLabel",
        label: "Button Label",
        description: "The text displayed on the call-to-action button.",
        defaultValue: "Get started",
      }),
      createTextInput({
        name: "ctaUrl",
        label: "Button URL",
        description: "The URL the button links to.",
        defaultValue: "/",
      }),
    ],
  }),
];
