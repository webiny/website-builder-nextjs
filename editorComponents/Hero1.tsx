"use client";
import React from "react";

export function Hero1() {
    return (
        <div className="bg-background">
            <div className="relative isolate px-6 pt-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-8 sm:py-8 lg:py-8">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-pill px-3 py-1 text-sm/6 text-text-muted ring-1 ring-border hover:ring-border-strong">
                            Announcing our next round of funding.{" "}
                            <a href="#" className="font-semibold text-link">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-text-base sm:text-7xl">
                            Data to enrich your online business
                        </h1>
                        <p className="mt-8 text-pretty text-lg font-medium text-text-muted sm:text-xl/8">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                            cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-control bg-primary px-3.5 py-2.5 text-sm font-semibold text-on-primary shadow-raised hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                            >
                                Get started
                            </a>
                            <a href="#" className="text-sm/6 font-semibold text-text-base">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
