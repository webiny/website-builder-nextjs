import React from "react";
import NextImage from "next/image";
import { type Asset } from "@webiny/sdk-nextjs";

export interface HeroBlockProps {
    title: string;
    subtitle?: string;
    description: string;
    newImage?: Asset;
    callToActionButtonLabel?: string;
    callToActionButtonUrl?: string;
}

export const HeroBlockComponent = (props: HeroBlockProps) => {
    return (
        <section className="my-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
            <div className="flex items-center gap-12 p-10 md:p-14">
                <div className="flex-1">
                    {props.subtitle ? (
                        <p className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-3">
                            {props.subtitle}
                        </p>
                    ) : null}
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                        {props.title}
                    </h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        {props.description}
                    </p>
                    {props.callToActionButtonUrl ? (
                        <a
                            href={props.callToActionButtonUrl}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                        >
                            {props.callToActionButtonLabel}
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
                {props.newImage ? (
                    <div className="hidden md:block flex-shrink-0">
                        <NextImage
                            width={props.newImage.image?.width}
                            height={props.newImage.image?.height}
                            className="w-64 h-auto rounded-xl shadow-lg"
                            src={props.newImage.url}
                            alt={props.title}
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
};
