export default function CreateLoading() {
  return (
    <div className="relative pb-24">
      {/* Top bar skeleton */}
      <div className="sticky top-16 z-40 flex items-center justify-between border-b border-border bg-background/90 py-3 backdrop-blur-md">
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Editor skeleton */}
      <div className="mx-auto max-w-2xl py-16">
        <div className="mb-2 h-12 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mb-10 h-px w-12 bg-border" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
