"use client";

import { createCmsComponent } from "@webiny/sdk-nextjs";
import { HeroBlockComponent } from "./Blocks/HeroBlock";
import { BannerBlockComponent } from "./Blocks/BannerBlock";
import { RichTextBlockComponent } from "./Blocks/RichTextBlock";
import { ThreeGridBoxBlockComponent } from "./Blocks/ThreeGridBoxBlock";
import { AuthorBlockComponent } from "./Blocks/AuthorBlock";

export const articleComponents = [
    createCmsComponent(HeroBlockComponent, {
        name: "Article/Hero",
        label: "Hero Section",
        description:
            "Full-width hero with title, subtitle, description, image, and a call-to-action button."
    }),
    createCmsComponent(BannerBlockComponent, {
        name: "Article/Banner",
        label: "Banner",
        description: "Promotional banner with title, image, and an action link."
    }),
    createCmsComponent(RichTextBlockComponent, {
        name: "Article/RichText",
        label: "Rich Text",
        description: "Free-form rich text content rendered as HTML."
    }),
    createCmsComponent(ThreeGridBoxBlockComponent, {
        name: "Article/ThreeGridBox",
        label: "Three Grid Box",
        description: "A grid of three boxes, each with an icon, title, and description."
    }),
    createCmsComponent(AuthorBlockComponent, {
        name: "Article/Author",
        label: "Author",
        description: "Displays author info loaded from a ref field."
    })
];
