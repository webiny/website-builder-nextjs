"use client";
import {
  createComponent,
  createTextInput,
} from "@webiny/website-builder-nextjs";
import { Hero_1 } from "./components/Hero-1";

export const editorComponents = [
  createComponent(Hero_1, {
    name: "Webiny/Hero",
    label: "Hero #1",
    inputs: [],
  }),
];
