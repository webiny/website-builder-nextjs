import { draftMode, cookies } from "next/headers";

/**
 * This route enables draft mode and redirects to the requested page pathname.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("wb.path");

    const targetPathname = `${path}?${searchParams.toString()}`;

    // TODO: implement access control, if you want to secure your preview.

    // Enable Draft Mode
    const draft = await draftMode();
    draft.enable();

    // For cross-origin draft mode, re-set the same cookies manually with desired attributes
    const cookieStore = await cookies();
    const bypass = cookieStore.get("__prerender_bypass")?.value;
    const previewData = cookieStore.get("__next_preview_data")?.value;

    const headers = new Headers();

    if (bypass) {
        headers.append(
            "Set-Cookie",
            `__prerender_bypass=${bypass}; Path=/; SameSite=None; Secure; HttpOnly`
        );
    }

    if (previewData) {
        headers.append(
            "Set-Cookie",
            `__next_preview_data=${previewData}; Path=/; SameSite=None; Secure; HttpOnly`
        );
    }

    headers.set("Location", targetPathname);

    return new Response(null, {
        status: 307,
        headers
    });
}
