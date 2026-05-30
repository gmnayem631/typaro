"use client";

import { useState, useEffect } from "react";

const PLACEHOLDERS = [
  "your@email.com",
  "writer@typaro.com",
  "reader@typaro.com",
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [pIndex, setPIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

   
  useEffect(() => {
    const current = PLACEHOLDERS[pIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setPlaceholder(current.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setPlaceholder(current.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, 60);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, pIndex]);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center">
        <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
          Stay in the loop
        </span>

        <h2 className="font-serif text-3xl tracking-tight text-foreground italic sm:text-4xl">
          Words worth reading, delivered.
        </h2>

        <p className="text-sm text-muted-foreground">
          No noise. Just the best posts from Typaro, straight to your inbox.
        </p>

        {submitted ? (
          <p className="font-mono text-sm text-foreground">
            _ you&apos;re in. watch your inbox.
          </p>
        ) : (
          <div className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-md border border-border bg-transparent px-4 py-2.5 font-mono text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-foreground px-4 py-2.5 text-sm text-background transition-colors hover:bg-foreground/80"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
