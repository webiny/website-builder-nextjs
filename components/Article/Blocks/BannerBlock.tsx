import React from "react";

export interface BannerBlockProps {
    title: string;
    actionUrl?: string;
    actionLabel?: string;
    image?: string;
}

export const BannerBlockComponent = (props: BannerBlockProps) => {
    return (
        <section className="my-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 overflow-hidden">
            <div className="flex items-center gap-8 p-8 md:p-10">
                {props.image ? (
                    <div className="hidden md:block flex-shrink-0">
                        <img
                            className="w-20 h-20 rounded-xl object-cover"
                            src={props.image}
                            alt={props.title}
                        />
                    </div>
                ) : null}
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{props.title}</h3>
                    {props.actionUrl ? (
                        <a
                            href={props.actionUrl}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
                        >
                            {props.actionLabel}
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </a>
                    ) : null}
                </div>
            </div>
        </section>
    );
};
