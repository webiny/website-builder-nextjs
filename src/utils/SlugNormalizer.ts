// ==> Trailing slash
// const norm = new SlugNormalizer({ trailingSlash: true });
//
// norm.normalize("/");                     // "/".
// norm.normalize("/es");                   // "/es/".
// norm.normalize(["/Blog", "My  Post"]);   // "/blog/my-post/".
// norm.normalize("///ES///contacto///");   // "/es/contacto/".
//
// ==> No trailing slash
// const noSlash = new SlugNormalizer({ trailingSlash: false });
// noSlash.normalize("/es/");               // "/es".
// noSlash.normalize(["blog", "post"]);     // "/blog/post".

export type SlugInput = string | string[];

export interface SlugOptions {
    /** If true, ensure a trailing slash (except for root). If false, strip trailing slash. */
    trailingSlash?: boolean;
}

export class SlugNormalizer {
    private opts: Required<SlugOptions>;

    constructor(options?: SlugOptions) {
        this.opts = {
            trailingSlash: true,
            ...options,
        };
    }

    /** Normalize a slug into a pathname like `/`, `/es/`, or `/blog/post`. */
    public normalize(input: SlugInput): string {
        const raw: string = Array.isArray(input) ? input.join("/") : input;

        // Collapse duplicate slashes and trim surrounding slashes/spaces.
        const compact: string = raw.replace(/\/+/g, "/").trim();
        const trimmed: string = compact.replace(/^\/+|\/+$/g, "");

        // Early return for empty → root.
        if (trimmed.length === 0) {
            return "/";
        }

        // Split, clean, and drop empty segments.
        const parts: string[] = trimmed
            .split("/")
            .map((s) => {
                return this.cleanSegment(s);
            })
            .filter((s) => {
                return s.length > 0;
            });

        // If all segments vanished, return root.
        if (parts.length === 0) {
            return "/";
        }

        // Join with a single leading slash.
        let out: string = `/${parts.join("/")}`;

        // Trailing slash policy.
        if (this.opts.trailingSlash) {
            if (!out.endsWith("/")) {
                out = `${out}/`;
            }
        } else {
            if (out !== "/" && out.endsWith("/")) {
                out = out.slice(0, -1);
            }
        }

        return out;
    }

    /** Clean a single path segment according to options. */
    private cleanSegment(seg: string): string {
        let s: string = seg;

        // Remove dot segments entirely.
        if (s === "." || s === "..") {
            return "";
        }

        return s.trim();
    }
}
