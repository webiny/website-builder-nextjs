import type { WebsiteBuilderThemeInput } from "@webiny/sdk-nextjs";
import type { TenantTheme } from "./fetchTenantTheme";

function getGoogleFontUrl(fontName: string): string | null {
    if (!fontName) {
        return null;
    }
    const formatted = fontName.trim().replace(/\s+/g, "+");
    return `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`;
}

function quoteFontFamily(font: string): string {
    return font
        .split(",")
        .map(part => {
            const trimmed = part.trim();
            const isGeneric = [
                "sans-serif",
                "serif",
                "monospace",
                "cursive",
                "fantasy",
                "system-ui"
            ].includes(trimmed);
            const isAlreadyQuoted = trimmed.startsWith('"') || trimmed.startsWith("'");
            if (isGeneric || isAlreadyQuoted || !trimmed.includes(" ")) {
                return trimmed;
            }
            return `"${trimmed}"`;
        })
        .join(", ");
}

export function mergeThemes(
    theme: WebsiteBuilderThemeInput,
    tenantTheme: TenantTheme
): WebsiteBuilderThemeInput {
    const merged = { ...theme };

    if (tenantTheme.font) {
        const fontUrl = getGoogleFontUrl(tenantTheme.font.split(",")[0]);
        if (fontUrl) {
            merged.fonts = [...(merged.fonts ?? []), fontUrl];
        }
    }

    const fontFamily = quoteFontFamily(tenantTheme.font);

    merged.css =
        (merged.css ?? "") +
        `
        :root {
            --wb-theme-color-primary: ${tenantTheme.primaryColor};
            --wb-theme-font-family: ${fontFamily};
        }
    `;

    if (tenantTheme.additionalColors?.length) {
        const extraColors = tenantTheme.additionalColors.map((color, index) => ({
            id: `tenant-color-${index}`,
            label: `Color ${index + 1}`,
            value: color
        }));
        merged.colors = [...(merged.colors ?? []), ...extraColors];
    }

    return merged;
}

export function getTenantFontUrl(tenantTheme: TenantTheme): string | null {
    if (!tenantTheme.font) {
        return null;
    }
    return getGoogleFontUrl(tenantTheme.font.split(",")[0]);
}
