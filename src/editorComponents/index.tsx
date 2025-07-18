"use client";
import { createComponent, createTextInput } from "@webiny/website-builder-nextjs";
import { Hero_1 } from "./components/Hero-1";
import { ProductRecommendations } from "./components/ProductRecommendations";

export const editorComponents = [
    createComponent(ProductRecommendations, {
        name: "SampleEcommerce/ProductRecommendations",
        label: "Product Recommendations",
        group: "sample",
        inputs: [
            createTextInput({
                name: "title",
                label: "Title",
                defaultValue: "",
                required: true
            }),
            createTextInput({
                name: "productIds",
                list: true,
                renderer: "SampleEcommerce/Product/List",
                label: "Products"
            })
        ]
    }),
    createComponent(Hero_1, {
        name: "Webiny/Hero",
        label: "Hero #1"
    })
];
