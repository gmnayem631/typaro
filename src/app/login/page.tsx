import Link from "next/link";
import { AuthQuote } from "@/components/authQuote";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
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
              Welcome back.
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to continue writing.
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center font-mono text-xs text-muted-foreground">
            No account?{" "}
            <Link
              href="/signup"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
