"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/authClient";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Menu, X, FileText, Plus, LogOut, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-foreground italic transition-opacity hover:opacity-60"
        >
          Typaro
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                  pathname === link.href
                    ? "font-medium text-foreground after:absolute after:right-3 after:bottom-0.5 after:left-3 after:h-px after:bg-foreground after:content-['']"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-9 w-[83px] items-center overflow-visible px-3 py-1">
            <div className="origin-left scale-[0.55]">
              <ThemeToggle />
            </div>
          </div>

          <div className="h-5 w-px rotate-12 bg-border" />

          {isPending && <Spinner />}

          {!isPending && (
            <>
              {session ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full focus:outline-none"
                      aria-label="User menu"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name || ""}
                        />
                        <AvatarFallback>
                          {session.user.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  >
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={session.user.image || ""}
                            alt={session.user.name || ""}
                          />
                          <AvatarFallback>
                            {session.user.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {session.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/blogs/manage">
                        <FileText className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/blogs/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        size={"sm"}
                        onClick={handleSignOut}
                        className="w-full justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-md bg-foreground px-3 py-0.5 text-sm text-background transition-colors hover:bg-foreground/80"
                  >
                    Login
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pt-2 pb-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === link.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-border" />

          <div className="flex items-center gap-3 px-1.5 py-1">
            <span className="text-sm text-muted-foreground">Theme</span>
            <div className="flex h-9 w-[83px] items-center overflow-visible">
              <div className="origin-left scale-[0.55]">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {!isPending && (
            <>
              {session ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      aria-label="User menu"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name || ""}
                        />
                        <AvatarFallback>
                          {session.user.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex-1 text-left">
                        {session.user.name}
                      </span>
                      <ChevronsUpDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="start"
                    className="w-[--radix-dropdown-menu-trigger-width]"
                  >
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={session.user.image || ""}
                            alt={session.user.name || ""}
                          />
                          <AvatarFallback>
                            {session.user.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {session.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/blogs/manage">
                        <FileText className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/blogs/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/api/auth/logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Link
                    href="/login"
                    className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background transition-colors hover:bg-foreground/80"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
