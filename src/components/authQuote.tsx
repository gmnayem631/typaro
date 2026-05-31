"use client";

import Link from "next/dist/client/link";
import { useEffect, useState } from "react";

const QUOTES = [
  "The scariest moment is always just before you start.",
  "You can always edit a bad page. You can't edit a blank page.",
  "Write drunk, edit sober.",
  "A word after a word after a word is power.",
  "Fill your page with the breathings of your heart.",
  "There is no greater agony than bearing an untold story inside you.",
  "Easy reading is damn hard writing.",
  "The first draft of anything is shit.",
  "You don't write because you want to say something. You write because you have something to say.",
  "Start writing, no matter what. The water does not flow until the faucet is turned on.",
  "Words are, of course, the most powerful drug used by mankind.",
  "The art of writing is the art of discovering what you believe.",
  "Writing is thinking on paper.",
  "You fail only if you stop writing.",
  "The purpose of a writer is to keep civilization from destroying itself.",
  "Your story might be exactly what someone needs today.",
  "A blog is a conversation that never ends.",
  "Write with purpose. Publish with confidence.",
  "Every published post is progress.",
  "The hardest post to publish is often the most important.",
  "Write what you wish existed.",
  "Your next post could change someone's day.",
  "Start writing. Someone is waiting to read it.",
  "Every expert was once a beginner with a draft.",
  "Every post starts with a single sentence.",
  "Your thoughts deserve a place in the world.",
  "The internet needs your perspective.",
  "A blank page is full of possibilities.",
];

export function AuthQuote() {
  const [displayed, setDisplayed] = useState("");
  const [qIndex, setQIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

   
  useEffect(() => {
    const current = QUOTES[qIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 3000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, 60);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQIndex((i) => (i + 1) % QUOTES.length);
        setDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, qIndex]);

  return (
    <div className="hidden h-full flex-col justify-between border-r border-border bg-muted/30 px-12 py-16 lg:flex">
      <Link
        href="/"
        className="font-serif text-2xl tracking-tight text-foreground italic"
      >
        Typaro
      </Link>

      <div className="space-y-4">
        <p className="font-mono text-lg leading-relaxed text-foreground">
          &ldquo;{displayed}
          <span className="cursor-blink ml-0.5 inline-block h-4 w-0.5 bg-current align-middle" />
          &rdquo;
        </p>
        <p className="font-mono text-xs text-muted-foreground">— on writing</p>
      </div>

      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Typaro by Brogrammers
      </p>
    </div>
  );
}
