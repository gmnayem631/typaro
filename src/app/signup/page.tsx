import Link from "next/link";
import { AuthQuote } from "@/components/authQuote";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:block lg:w-1/2">
        <AuthQuote />
      </div>
      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:py-16">
        <Link
          href="/"
          className="mb-8 flex items-center gap-1.5 self-start font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={12} />
          Back to Typaro
        </Link>
        <div className="w-full max-w-sm space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl tracking-tight text-foreground italic">
              Start writing.
            </h1>
            <p className="text-sm text-muted-foreground">
              Create your account and join Typaro.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Name
              </label>
              <input
                type="text"
                autoComplete="name"
                className="w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                className="w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
                placeholder="••••••••"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-md bg-foreground py-2.5 text-sm text-background transition-colors hover:bg-foreground/80"
            >
              Create account
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 font-mono text-xs text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md border border-border py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <p className="text-center font-mono text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
