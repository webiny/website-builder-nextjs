"use client";
import {
  createComponent,
  createTextInput,
  createFileInput,
  createObjectInput,
  createSelectInput,
} from "@webiny/website-builder-nextjs";
import { Hero1 } from "./Hero1";
import { Banner } from "./Banner";
import { Features } from "./Features";

export const editorComponents = [
  createComponent(Hero1, {
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
  createComponent(Features, {
    name: "Custom/Features",
    label: "Features",
    inputs: [
      createTextInput({
        name: "headline",
        label: "Headline",
        description: "The section heading shown above the features.",
        defaultValue: "Everything you need",
      }),
      // A repeatable (list) object field. Each item is itself an object made up of
      // nested inputs - including another object field ("callToAction").
      createObjectInput({
        name: "features",
        label: "Features",
        description: "The list of features to display.",
        list: true,
        fields: [
          createFileInput({
            name: "image",
            label: "Image",
            description: "The feature image.",
            allowedFileTypes: ["image/*"],
          }),
          createTextInput({
            name: "title",
            label: "Title",
            defaultValue: "Feature title",
          }),
          createTextInput({
            name: "label",
            label: "Label",
            description: "A short label/eyebrow shown above the title.",
          }),
          // A nested (single) object field inside each list item.
          createObjectInput({
            name: "callToAction",
            label: "Call to action",
            description: "An optional call-to-action button for this feature.",
            fields: [
              createTextInput({
                name: "label",
                label: "Label",
                description: "Supporting text shown next to the button.",
              }),
              createTextInput({
                name: "buttonTitle",
                label: "Button title",
                defaultValue: "Learn more",
              }),
              createSelectInput({
                name: "action",
                label: "Action",
                defaultValue: "openUrl",
                options: [{ label: "Open URL", value: "openUrl" }],
              }),
              createTextInput({
                name: "url",
                label: "URL",
                defaultValue: "/",
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];
