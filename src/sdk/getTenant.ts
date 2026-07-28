import { headers } from "next/headers";

export const getTenant = async () => {
    try {
        const headersContainer = await headers();
        return headersContainer.get("X-Tenant") ?? "root";
    } catch {
        return "root";
    }
};
