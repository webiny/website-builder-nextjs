"use client";
import React from "react";
import { ComponentProps } from "@webiny/sdk-nextjs";
import { openDialog } from "./dialogs";
import { LOGIN_DIALOG } from "./DemoLoginDialog";

interface DemoHeaderInputs {
    title: string;
    tagline: string;
    loginLabel: string;
}

// A global component: one instance for the whole site, placed by the page layout.
export function DemoHeader({
    inputs: { title, tagline, loginLabel }
}: ComponentProps<DemoHeaderInputs>) {
    return (
        <div className="bg-primary/10 border-b border-border px-6 py-4 flex items-center justify-between">
            <div>
                <p className="text-lg font-semibold text-text-base">{title}</p>
                {tagline && <p className="text-sm text-text-muted">{tagline}</p>}
            </div>
            {loginLabel && (
                <button
                    type="button"
                    className="rounded bg-primary px-4 py-2 text-sm text-white"
                    onClick={() => openDialog(LOGIN_DIALOG)}
                >
                    {loginLabel}
                </button>
            )}
        </div>
    );
}
