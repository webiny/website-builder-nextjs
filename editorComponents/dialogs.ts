"use client";
import { useSyncExternalStore } from "react";

// Which dialog is open is application state, not Website Builder data, so it lives in a
// client-side store owned by the frontend. A component opens a dialog by its id; the dialog
// component reads the store and shows itself when its id is the active one.

let active: string | null = null;
const listeners = new Set<() => void>();

function setActive(id: string | null) {
    active = id;
    listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export const openDialog = (id: string) => setActive(id);
export const closeDialog = () => setActive(null);

export function useActiveDialog() {
    return useSyncExternalStore(
        subscribe,
        () => active,
        () => null
    );
}
