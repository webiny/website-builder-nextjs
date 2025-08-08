import { trailingSlash } from "@/src/constants";
import { SlugNormalizer, type SlugInput } from "@/src/utils/SlugNormalizer";

const normalizer = new SlugNormalizer({ trailingSlash });

export const normalizeSlug = (slug: SlugInput) => {
    return normalizer.normalize(slug);
}

