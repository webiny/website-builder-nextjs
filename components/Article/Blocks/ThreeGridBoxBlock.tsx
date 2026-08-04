import React from "react";

export interface ThreeGridBoxBlockProps {
    boxes: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
}

export const ThreeGridBoxBlockComponent = (props: ThreeGridBoxBlockProps) => {
    return (
        <section className="my-8">
            <div className="grid md:grid-cols-3 gap-6">
                {(props.boxes || []).map((box, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                        {box.icon ? (
                            <div className="rounded-lg bg-slate-100 mb-4 overflow-hidden">
                                <img src={box.icon} alt={box.title} className="w-full h-auto" />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                                <svg
                                    className="w-5 h-5 text-emerald-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                        )}
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{box.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{box.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
