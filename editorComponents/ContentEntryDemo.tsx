"use client";
import React from "react";
import {
    type ComponentProps,
    type ResolvedContentEntryQuery,
    useContentEntryList
} from "@webiny/sdk-nextjs";

/**
 * Shape of a typical CMS entry returned by the resolver.
 * Adjust the `values` fields to match whichever CMS model you point the inputs at.
 */
interface CmsEntryShape {
    entryId: string;
    values: Record<string, unknown>;
}

interface ContentEntryDemoInputs {
    /** Manual single — resolves to a single CMS entry (or null). */
    featuredArticle: CmsEntryShape | null;
    /** Manual list — resolves to an array of CMS entries. */
    handpickedArticles: CmsEntryShape[];
    /** Query mode — resolves to { items, pageInfo, query? }. */
    latestArticles: ResolvedContentEntryQuery<CmsEntryShape>;
}

/**
 * Demo component that exercises all three content-entry input modes:
 *  1. Manual single  (featuredArticle)
 *  2. Manual list    (handpickedArticles)
 *  3. Query          (latestArticles) — with loadMore pagination
 */
export function ContentEntryDemo({
    inputs: { featuredArticle, handpickedArticles, latestArticles }
}: ComponentProps<ContentEntryDemoInputs>) {
    const { items, hasMore, loading, loadMore } = useContentEntryList(latestArticles);

    return (
        <section className="max-w-4xl mx-auto py-12 px-6 space-y-12">
            {/* ── 1. Manual single ──────────────────────────────────── */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Featured Article (manual single)</h2>
                {featuredArticle ? (
                    <EntryCard entry={featuredArticle} />
                ) : (
                    <p className="text-gray-400 italic">No featured article selected.</p>
                )}
            </div>

            {/* ── 2. Manual list ────────────────────────────────────── */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Hand-picked Articles (manual list)</h2>
                {handpickedArticles?.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {handpickedArticles.map(entry => (
                            <EntryCard key={entry.entryId} entry={entry} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No articles hand-picked yet.</p>
                )}
            </div>

            {/* ── 3. Query mode with pagination ────────────────────── */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Latest Articles (query mode)</h2>
                {items.length > 0 ? (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map(entry => (
                                <EntryCard key={entry.entryId} entry={entry} />
                            ))}
                        </div>
                        {hasMore && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={loadMore}
                                    disabled={loading}
                                    className="px-6 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/80 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? "Loading…" : "Load more"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-gray-400 italic">No articles matched the query.</p>
                )}
            </div>
        </section>
    );
}

/** Renders a single CMS entry as a card. Adapts to whatever values are present. */
function EntryCard({ entry }: { entry: CmsEntryShape }) {
    const title =
        (entry.values?.title as string) ??
        (entry.values?.name as string) ??
        entry.entryId;
    const description = entry.values?.description as string | undefined;

    return (
        <div className="rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
            )}
            <pre className="mt-3 text-xs text-gray-400 overflow-auto max-h-32">
                {JSON.stringify(entry.values, null, 2)}
            </pre>
        </div>
    );
}
