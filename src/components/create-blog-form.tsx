"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, type CreatePostInput } from "@/validations/post";
import { authClient } from "@/lib/authClient";

const MOCK_CATEGORIES = [
  { id: "1", name: "Writing", slug: "writing" },
  { id: "2", name: "Technology", slug: "technology" },
  { id: "3", name: "AI", slug: "ai" },
  { id: "4", name: "Life", slug: "life" },
  { id: "5", name: "Culture", slug: "culture" },
];

function autoResize(el: HTMLTextAreaElement | null) {
  if (!el) return;

  const scrollY = window.scrollY;

  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;

  window.scrollTo({
    top: scrollY,
    behavior: "instant" as ScrollBehavior,
  });
}

export default function CreateBlogForm() {
  const { data } = authClient.useSession();
  const router = useRouter();
  const [step, setStep] = useState<"write" | "meta">("write");
  const [wordCount, setWordCount] = useState(0);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { readingTime: 5 },
  });

  // set author from current session user
  useEffect(() => {
    if (data?.user?.name) setValue("author", data.user.name);
  }, [data, setValue]);

  const contentValue = watch("content", "");
  const titleValue = watch("title", "");
  const excerptValue = watch("excerpt", "");
  const readingTimeValue = watch("readingTime", 5);
  const categoryIdValue = watch("categoryId", "");

  const category = MOCK_CATEGORIES.find(
    (cat) => cat.id === categoryIdValue,
  ) ?? {
    id: "",
    name: "Uncategorized",
    slug: "uncategorized",
  };

  // word count + reading time
  useEffect(() => {
    const words = contentValue.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setValue("readingTime", Math.max(1, Math.ceil(words / 200)));
  }, [contentValue, setValue]);

  // re-size both textareas whenever step returns to "write"
  useEffect(() => {
    autoResize(titleRef.current);
  }, [titleValue]);

  useEffect(() => {
    autoResize(contentRef.current);
  }, [contentValue]);

  useEffect(() => {
    if (step !== "write") return;
    // wait one frame for the DOM to paint
    const raf = requestAnimationFrame(() => {
      autoResize(titleRef.current);
      autoResize(contentRef.current);
    });
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const onSubmit = async (data: CreatePostInput) => {
    console.log(data);
    router.push("/blogs/manage");
  };

  const canProceed = titleValue.length >= 5 && contentValue.length >= 50;

  const { ref: titleFormRef, ...titleRest } = register("title");
  const { ref: contentFormRef, ...contentRest } = register("content");

  return (
    <div className="relative pb-24">
      {/* Top bar */}
      <div className="sticky top-16 z-40 flex items-center justify-between border-b border-border bg-background/90 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            ← discard
          </button>

          {step === "meta" && (
            <button
              type="button"
              onClick={() => setStep("write")}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              ← back to editor
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {step === "write" && (
            <span className="font-mono text-xs text-muted-foreground/50">
              {wordCount > 0 ? `${wordCount} words` : "start writing"}
            </span>
          )}

          {step === "write" ? (
            <button
              type="button"
              disabled={!canProceed}
              onClick={() => setStep("meta")}
              className="rounded-md bg-foreground px-4 py-1.5 font-mono text-xs text-background transition-colors hover:bg-foreground/80 disabled:cursor-not-allowed disabled:opacity-30"
            >
              continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="rounded-md bg-foreground px-4 py-1.5 font-mono text-xs text-background transition-colors hover:bg-foreground/80 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isSubmitting ? "publishing..." : "publish"}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      {step === "write" && (
        <div className="mx-auto max-w-2xl py-16">
          <div className="mb-2">
            <textarea
              {...titleRest}
              ref={(el) => {
                titleFormRef(el);
                titleRef.current = el;
              }}
              rows={1}
              placeholder="Title"
              onInput={(e) => autoResize(e.currentTarget)}
              className="w-full resize-none bg-transparent font-serif text-4xl leading-tight tracking-tight text-foreground italic outline-none placeholder:text-muted-foreground/30 sm:text-5xl"
            />
            {errors.title && (
              <p className="mt-1 font-mono text-xs text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-10 h-px w-12 bg-border" />

          <div>
            <textarea
              {...contentRest}
              ref={(el) => {
                contentFormRef(el);
                contentRef.current = el;
              }}
              rows={12}
              placeholder="Write something worth reading…"
              onInput={(e) => autoResize(e.currentTarget)}
              className="w-full resize-none bg-transparent text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/30"
            />
            {errors.content && (
              <p className="mt-1 font-mono text-xs text-destructive">
                {errors.content.message}
              </p>
            )}
          </div>

          {wordCount > 0 && (
            <div className="mt-16 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs text-muted-foreground/40">
                ~{Math.max(1, Math.ceil(wordCount / 200))} min read
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}
        </div>
      )}

      {/* Meta step */}
      {step === "meta" && (
        <div className="mx-auto max-w-xl py-16">
          <div className="mb-10 space-y-1">
            <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Almost there
            </span>
            <h2 className="font-serif text-3xl tracking-tight text-foreground italic">
              A few details.
            </h2>
          </div>

          <div className="space-y-8">
            {/* hidden author field populated from session */}
            <input type="hidden" {...register("author")} />
            <div className="space-y-2">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Excerpt
              </label>
              <textarea
                {...register("excerpt")}
                rows={3}
                placeholder="A one or two sentence summary of your post…"
                className="w-full resize-none rounded-md border border-border bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
              />
              {errors.excerpt && (
                <p className="font-mono text-xs text-destructive">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Category
              </label>
              <select
                {...register("categoryId")}
                defaultValue=""
                className="w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground"
              >
                <option
                  value=""
                  disabled
                  className="bg-background text-foreground"
                >
                  Pick a category
                </option>

                {MOCK_CATEGORIES.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="bg-background text-foreground"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="font-mono text-xs text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Cover image{" "}
                <span className="text-muted-foreground/50 normal-case">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                {...register("coverImage")}
                placeholder="https://images.unsplash.com/…"
                className="w-full rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/40 focus:border-foreground"
              />
              {errors.coverImage && (
                <p className="font-mono text-xs text-destructive">
                  {errors.coverImage.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Reading time
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={60}
                  {...register("readingTime")}
                  className="w-20 rounded-md border border-border bg-transparent px-4 py-2.5 text-sm text-foreground transition-colors outline-none focus:border-foreground"
                />
                <span className="font-mono text-xs text-muted-foreground">
                  min — auto-calculated from word count
                </span>
              </div>
              {errors.readingTime && (
                <p className="font-mono text-xs text-destructive">
                  {errors.readingTime.message}
                </p>
              )}
            </div>
            {/* BlogCard Clone to preview */}
            <article className="flex gap-6 border-b border-border py-8 transition-colors first:border-t first:pt-8">
              {/* Content */}
              <div className="flex flex-1 flex-col gap-3">
                <h2 className="font-serif text-2xl leading-snug tracking-tight text-foreground italic transition-colors group-hover:text-muted-foreground sm:text-3xl">
                  {titleValue || "Your post title"}
                </h2>

                <p className="line-clamp-1 text-sm leading-relaxed text-muted-foreground">
                  {excerptValue}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span>{data?.user.name ?? "U"}</span>
                  <span>·</span>
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{readingTimeValue} min</span>
                  <span>·</span>
                  <span>{category.name}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
