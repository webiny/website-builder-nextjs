import React from "react";
import { ComponentProps } from "@webiny/sdk-nextjs";

interface DemoFooterInputs {
    text: string;
}

// A global component: one instance for the whole site, placed by the page layout.
export function DemoFooter({ inputs: { text } }: ComponentProps<DemoFooterInputs>) {
    return (
        <footer className="border-t border-border px-6 py-6 text-center text-sm text-text-muted">
            {text}
        </footer>
    );
}
