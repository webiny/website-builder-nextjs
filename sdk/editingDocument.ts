import type { Document } from "@webiny/sdk-nextjs";

interface CreateEditingDocumentParams {
    // The `wb.id` the editor put in the preview URL.
    id: string;
    // The `wb.path` the editor put in the preview URL.
    path: string;
}

/**
 * Builds a placeholder document, used when the editor asks us to render a page we can't fetch —
 * either because no backend is configured, or because the page has never been saved.
 *
 * The renderer needs *a* document to mount its editing bridge (with `null` it renders nothing and
 * the editor never connects), but it doesn't need a real one: as soon as the bridge is up, the
 * editor pushes the page being edited over `postMessage` and that replaces this placeholder.
 *
 * `path` matters. The SDK compares it against the `wb.path` search param to decide whether the
 * requested page is the one being edited; when they match it serves the document from the editor
 * instead of calling the API. A mismatch sends it to the network, which is what we're avoiding.
 */
export function createEditingDocument({ id, path }: CreateEditingDocumentParams): Document {
    return {
        id,
        version: 1,
        state: {},
        properties: { id, path },
        extensions: {},
        metadata: { documentType: "page" },
        bindings: {},
        elements: {}
    };
}
