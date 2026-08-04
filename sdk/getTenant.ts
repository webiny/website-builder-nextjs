import { headers } from "next/headers";
import { rethrowIfNextControlFlow } from "@/utils/nextControlFlow";

export const getTenant = async () => {
    try {
        const headersContainer = await headers();
        return headersContainer.get("X-Tenant") ?? "root";
    } catch (error) {
        // Reading headers is what tells Next this render can't be static. That signal has to get
        // through, or the render carries on statically and fails with `DYNAMIC_SERVER_USAGE`.
        rethrowIfNextControlFlow(error);
        return "root";
    }
};
