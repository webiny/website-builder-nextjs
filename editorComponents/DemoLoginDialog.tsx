"use client";
import React from "react";
import { ComponentProps, useIsElementSelected } from "@webiny/sdk-nextjs";
import { closeDialog, useActiveDialog } from "./dialogs";

export const LOGIN_DIALOG = "login";

interface DemoLoginDialogInputs {
    title: string;
    text: string;
    submitLabel: string;
}

// A global dialog: its texts are edited once for the whole site. It's opened at runtime by
// the header's login button, and in the editor it opens itself while it's selected.
export function DemoLoginDialog({
    inputs: { title, text, submitLabel },
    element
}: ComponentProps<DemoLoginDialogInputs>) {
    const activeDialog = useActiveDialog();
    const isSelected = useIsElementSelected(element);

    if (activeDialog !== LOGIN_DIALOG && !isSelected) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={closeDialog}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
                onClick={event => event.stopPropagation()}
            >
                <h2 className="text-lg font-semibold text-text-base">{title}</h2>
                {text && <p className="mt-2 text-sm text-text-muted">{text}</p>}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        className="rounded px-4 py-2 text-sm text-text-muted hover:bg-black/5"
                        onClick={closeDialog}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="rounded bg-primary px-4 py-2 text-sm text-white"
                        onClick={closeDialog}
                    >
                        {submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
