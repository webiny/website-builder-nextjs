import type { SampleProduct } from "./SampleApi";
import { sampleApi } from "./SampleApi";
import { useEffect, useState } from "react";

export const useProductsByIds = (ids: string[]) => {
    const [products, setProducts] = useState<SampleProduct[]>([]);

    useEffect(() => {
        sampleApi.listProducts().then(products => {
            setProducts(() => {
                const filteredProducts = products.filter(p => ids.includes(p.id));

                // Sort products to match the `ids` order.
                const orderMap = new Map(ids.map((id, index) => [id, index]));

                return filteredProducts.slice().sort((a, b) => {
                    return (orderMap.get(a.id) ?? Infinity) - (orderMap.get(b.id) ?? Infinity);
                });
            });
        });
    }, [ids]);

    return products;
};
