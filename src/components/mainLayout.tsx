"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smoothScroll";
import { PageTransition } from "./pageTransition";

const AUTH_ROUTES = ["/login", "/signup"];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.includes(pathname);

  return (
    <PageTransition>
      <SmoothScroll>
        {!isAuth && <Navbar />}
        <main className="mx-auto w-full max-w-6xl flex-1 px-6">{children}</main>
        {!isAuth && <Footer />}
      </SmoothScroll>
    </PageTransition>
  );
}
