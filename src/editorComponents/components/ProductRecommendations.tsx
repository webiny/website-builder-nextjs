import React from "react";
import Link from "next/link";
import type { ComponentProps } from "@webiny/website-builder-nextjs";
import { contentSdk } from "@webiny/website-builder-nextjs";
import { useProductsByIds } from "@/src/sampleApi/useProductsByIds";

type ProductRecommendationsProps = ComponentProps<{
    title: string;
    productIds: Array<string>;
}>;

export function ProductRecommendations({ inputs }: ProductRecommendationsProps) {
    const products = useProductsByIds(inputs.productIds ?? []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{inputs.title}</h2>
                {products.length === 0 && contentSdk.isEditing() ? (
                    <div className={"flex w-full p-8"}>Select some products from the catalog!</div>
                ) : null}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map(product => (
                        <div key={product.id} className="group relative">
                            <img
                                alt={product.title}
                                src={product.image}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700 truncate w-28">
                                        <Link href={`/product/${product.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </Link>
                                    </h3>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
