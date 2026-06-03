"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/blogs": "Blogs",
  "/about": "About",
  "/login": "Login",
  "/signup": "Sign up",
  "/blogs/create": "Write",
  "/blogs/manage": "Manage",
};

function getPageName(pathname: string) {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  if (pathname.startsWith("/blogs/") && pathname.split("/").length === 3)
    return "Reading";
  return null;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const name = getPageName(pathname);
    if (!name) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed("");
    setVisible(true);
    setFading(false);
    setDisplayed("");
    setVisible(true);
    setFading(false);

    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setDisplayed(name.slice(0, i));
      if (i === name.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
            setDisplayed("");
          }, 400);
        }, 300);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [pathname]);

  return (
    <>
      {visible && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-400 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="font-serif text-4xl tracking-tight text-foreground italic sm:text-6xl">
            {displayed}
            <span className="cursor-blink ml-0.5 inline-block h-[1em] w-0.5 bg-current align-middle" />
          </p>
        </div>
      )}
      {children}
    </>
  );
}
