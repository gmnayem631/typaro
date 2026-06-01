"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { name: "Farhan Aziz", role: "UI & Frontend", initial: "FA" },
  { name: "Faisal Mahmud", role: "Auth & Infrastructure", initial: "FM" },
  { name: "Gulam Mustafa Nayem", role: "Blog Core & AI", initial: "GN" },
];

function ScrollHint() {
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(hintRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1000",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={hintRef}
      className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
    >
      <span className="font-mono text-xs tracking-widest">scroll</span>
      <div className="h-8 w-px bg-border" />
    </div>
  );
}

function TypedSection({
  eyebrow,
  lines,
  scrollLength = 1500,
}: {
  eyebrow: string;
  lines: { text: string; className?: string }[];
  scrollLength?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const totalChars = lines.reduce((a, b) => a + b.text.length, 0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollLength}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const charsToShow = Math.round(self.progress * totalChars);
          let activeLineIndex = 0;

          let remaining = charsToShow;
          for (let i = 0; i < lines.length; i++) {
            if (remaining <= lines[i].text.length) {
              activeLineIndex = i;
              break;
            }
            remaining -= lines[i].text.length;
            activeLineIndex = i;
          }

          if (charsToShow >= totalChars) {
            activeLineIndex = lines.length - 1;
          }

          let chars = charsToShow;
          lines.forEach((line, i) => {
            const el = lineRefs.current[i];
            const cursor = cursorRefs.current[i];
            if (!el || !cursor) return;

            const take = Math.min(Math.max(chars, 0), line.text.length);
            el.textContent = line.text.slice(0, take);
            chars = Math.max(0, chars - line.text.length);

            cursor.style.display =
              i === activeLineIndex ? "inline-block" : "none";
          });
        },
      });
      const firstCursor = cursorRefs.current[0];
      if (firstCursor) {
        firstCursor.style.display = "inline-block";
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lines, scrollLength]);

  return (
    <div
      ref={sectionRef}
      className="relative flex h-[calc(100vh-64px)] flex-col justify-center px-6 sm:px-16 md:px-24"
    >
      <div className="max-w-4xl space-y-8">
        <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <div className="space-y-6">
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                line.className ??
                "font-serif text-3xl leading-tight tracking-tight break-words text-foreground italic sm:text-4xl md:text-5xl"
              }
            >
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
              />
              <span
                ref={(el) => {
                  cursorRefs.current[i] = el;
                }}
                className="cursor-blink ml-0.5 inline-block h-[1em] w-0.5 bg-current align-middle"
                style={{ display: "none" }}
              />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const teamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);

      const ctx = gsap.context(() => {
        const MEMBER_DURATION = 600;
        const HOLD_AFTER = 800;
        const teamScrollLength = TEAM.length * MEMBER_DURATION + HOLD_AFTER;

        ScrollTrigger.create({
          trigger: teamRef.current,
          start: "top top",
          end: `+=${teamScrollLength}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            TEAM.forEach((_, i) => {
              const el = memberRefs.current[i];
              if (!el) return;

              const start = i / TEAM.length;
              const end = (i + 0.6) / TEAM.length;

              const memberOpacity = Math.min(
                Math.max((progress - start) / (end - start), 0),
                1,
              );
              const memberY = 24 - memberOpacity * 24;

              el.style.opacity = String(memberOpacity);
              el.style.transform = `translateY(${memberY}px)`;
            });
          },
        });

        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative">
      <ScrollHint />

      {/* Section 1 */}
      <TypedSection
        eyebrow="About Typaro"
        scrollLength={1200}
        lines={[{ text: "We built Typaro." }]}
      />

      {/* Section 2 */}
      <TypedSection
        eyebrow="What we believe"
        scrollLength={2200}
        lines={[
          { text: "Writing should feel like thinking." },
          {
            text: "Not like filling out a form.",
            className:
              "break-words font-serif text-3xl italic leading-tight tracking-tight text-muted-foreground sm:text-4xl md:text-5xl",
          },
        ]}
      />

      {/* Section 3 */}
      <TypedSection
        eyebrow="What we promise"
        scrollLength={2200}
        lines={[
          { text: "Reading should feel like a conversation." },
          {
            text: "Not like doing research.",
            className:
              "break-words font-serif text-3xl italic leading-tight tracking-tight text-muted-foreground sm:text-4xl md:text-5xl",
          },
        ]}
      />

      {/* Section 4 */}
      <TypedSection
        eyebrow="The story"
        scrollLength={2800}
        lines={[
          {
            text: "Three developers. A team project. One goal — build something real.",
            className:
              "break-words font-mono text-base leading-relaxed text-muted-foreground sm:text-lg",
          },
          {
            text: "So we chose to build a blogging platform that actually thinks.",
            className:
              "break-words font-serif text-2xl italic leading-tight tracking-tight text-foreground sm:text-3xl",
          },
        ]}
      />

      {/* Section 5 — Team */}
      <div
        ref={teamRef}
        className="flex h-screen flex-col justify-center px-6 sm:px-16 md:px-24"
      >
        <div className="space-y-10">
          <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            The team
          </span>
          <div className="mt-2 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                ref={(el) => {
                  memberRefs.current[i] = el;
                }}
                className="flex flex-col items-center space-y-4 text-center"
                style={{ opacity: 0 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border font-mono text-base text-muted-foreground">
                  {member.initial}
                </div>
                <div>
                  <p className="font-serif text-2xl leading-tight tracking-tight text-foreground italic">
                    {member.name}
                  </p>
                  <p className="mt-0.5 font-mono text-xs leading-relaxed text-muted-foreground sm:text-lg">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 6 — CTA */}
      <div
        ref={ctaRef}
        className="flex h-screen flex-col items-center justify-center border-t border-border px-6 text-center"
        style={{ opacity: 0 }}
      >
        <h2 className="font-serif text-4xl leading-tight tracking-tight text-foreground italic sm:text-5xl">
          Ready to start writing?
        </h2>
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          Join Typaro and write things worth reading.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-md bg-foreground px-6 py-2.5 text-sm text-background transition-colors hover:bg-foreground/80"
          >
            Join Typaro
          </Link>
          <Link
            href="/blogs"
            className="rounded-md border border-border px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
          >
            Explore Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
