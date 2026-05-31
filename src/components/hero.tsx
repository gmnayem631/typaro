"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BASE = "Built for people who type things ";
const VARIANTS = [
  "worth reading.",
  "worth sharing.",
  "worth remembering.",
  "that matter.",
  "that last.",
];

function getSharedPrefix(a: string, b: string) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

type Phase = "typing-base" | "typing-variant" | "deleting" | "pause";

export function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing-base");
  const [variantIndex, setVariantIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing-base") {
      if (charIndex < BASE.length) {
        timeout = setTimeout(() => {
          setDisplayed(BASE.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          // assign to timeout so it gets cleaned up
          setCharIndex(0);
          setPhase("typing-variant");
        }, 80);
      }
    }

    if (phase === "typing-variant") {
      const variant = VARIANTS[variantIndex];
      const isLast = variantIndex === VARIANTS.length - 1;
      if (charIndex < variant.length) {
        timeout = setTimeout(() => {
          setDisplayed(BASE + variant.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, 80);
      } else {
        if (isLast) return;
        timeout = setTimeout(() => {
          setCharIndex(0);
          setPhase("deleting");
        }, 2000);
      }
    }

    if (phase === "deleting") {
      const current = VARIANTS[variantIndex];
      const next = VARIANTS[variantIndex + 1];
      const sharedLen = getSharedPrefix(current, next);
      const deleteDownTo = sharedLen; // keep shared prefix, delete the rest

      const currentDisplayedVariantLen = current.length - charIndex;

      if (currentDisplayedVariantLen > deleteDownTo) {
        timeout = setTimeout(() => {
          setDisplayed(BASE + current.slice(0, currentDisplayedVariantLen - 1));
          setCharIndex((i) => i + 1);
        }, 60);
      } else {
        timeout = setTimeout(() => {
          setVariantIndex((i) => i + 1);
          setCharIndex(sharedLen); // start typing from shared prefix point
          setPhase("pause");
        }, 200);
      }
    }

    if (phase === "pause") {
      timeout = setTimeout(() => {
        setPhase("typing-variant");
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex, variantIndex]);

  return (
    <section className="relative flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-6 text-center md:min-h-[calc(100vh-64px)]">
      {/* Eyebrow */}
      <span className="mb-6 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
        A place to write
      </span>

      {/* Heading */}
      <h1 className="font-serif text-5xl leading-tight tracking-tight text-foreground italic sm:text-6xl md:text-7xl">
        Typaro
      </h1>

      {/* Typewriter tagline */}
      <p className="mt-6 min-h-8 font-mono text-sm text-muted-foreground sm:text-base">
        {displayed}
        <span className="cursor-blink ml-0.5 inline-block h-4 w-0.5 bg-current align-middle" />
      </p>

      {/* CTAs */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/blogs"
          className="rounded-md bg-foreground px-6 py-2.5 text-sm text-background transition-colors hover:bg-foreground/80"
        >
          Explore Blogs
        </Link>
        <Link
          href="/signup"
          className="rounded-md border border-border px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Join Typaro
        </Link>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-mono text-xs tracking-widest">scroll</span>
        <div className="h-8 w-px bg-border" />
      </div>
    </section>
  );
}
