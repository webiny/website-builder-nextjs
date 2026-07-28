import { sdk } from "@webiny/sdk-nextjs";
import { initializeSdk } from "@/src/sdk";
import { redirectsCacheTtl } from "@/src/constants";

// We don't want to cache the response!
const noCacheHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache no-store",
    Pragma: "no-cache",
    Expires: "0"
};

const cacheControl = [
    `max-age=${redirectsCacheTtl}`,
    `s-maxage=${redirectsCacheTtl}`,
    `stale-while-revalidate=${redirectsCacheTtl - 1}`
];

const headers = {
    "Content-Type": "application/json",
    "Cache-Control": `public, ${cacheControl.join(", ")}`
};

/**
 * This route uses the Content SDK to check if there's a redirect defined for the given pathname.
 */
export async function GET(request: Request) {
    const noRedirectResponse = Response.json({ redirect: null }, { headers: noCacheHeaders });

    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("wb.tenant");
    const pathname = searchParams.get("pathname");

    if (!pathname || !tenantId) {
        return noRedirectResponse;
    }

    // Check if there's a redirect defined for the requested page.
    initializeSdk({ tenantId });
    const result = await sdk.wb.getRedirectByPath(pathname);

    if (result.isOk() && result.value) {
        return Response.json({ redirect: result.value }, { headers });
    }

    return noRedirectResponse;
}
