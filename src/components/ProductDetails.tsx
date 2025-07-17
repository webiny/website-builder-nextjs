import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import type { SampleProduct } from "@/src/sampleApi/SampleApi";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductDetails({ product }: { product: SampleProduct }) {
    return (
        <div className="bg-white">
            <div className="pt-6 pb-16 sm:pb-24">
                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-gray-900">
                                    {product.title}
                                </h1>
                                <p className="text-xl font-medium text-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                            {/* Reviews */}
                            <div className="mt-4">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-700">
                                        {product.rating.rate}
                                        <span className="sr-only">
                                            {" "}
                                            out of {product.rating.count} stars
                                        </span>
                                    </p>
                                    <div className="ml-1 flex items-center">
                                        {[0, 1, 2, 3, 4].map(rating => (
                                            <StarIcon
                                                key={rating}
                                                aria-hidden="true"
                                                className={classNames(
                                                    product.rating.rate > rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-200",
                                                    "size-5 shrink-0"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                        ·
                                    </div>
                                </div>
                            </div>
                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                <div className="mt-4 space-y-4 text-sm/6 text-gray-500">
                                    {product.description}
                                </div>
                            </div>
                        </div>

                        {/* Image gallery */}
                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Images</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                <img
                                    alt={product.title}
                                    src={product.image}
                                    className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
