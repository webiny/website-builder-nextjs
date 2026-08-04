"use client";
import { Hero } from "./Hero";
import { FeatureSection } from "./FeatureSection";
import { ContentSection } from "./ContentSection";
import { StatsSection } from "./StatsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { FaqSection } from "./FaqSection";
import { CtaSection } from "./CtaSection";

/**
 * The components the page editor can place on a page. Each one lives in its own file together with
 * its manifest, so adding a section to this starter kit means adding a file and a line here.
 */
export const editorComponents = [
    Hero,
    FeatureSection,
    ContentSection,
    StatsSection,
    TestimonialsSection,
    FaqSection,
    CtaSection
];
