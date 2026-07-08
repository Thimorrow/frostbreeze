import Link from "next/link";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className="h-10 w-10 text-coral"
      aria-hidden
    >
      <circle cx="24" cy="24" r="9" />
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4M11.3 11.3l2.8 2.8M33.9 33.9l2.8 2.8M36.7 11.3l-2.8 2.8M14.1 33.9l-2.8 2.8" />
    </svg>
  );
}

export default function EmptyState({
  title,
  text,
  ctaHref = "/search",
  ctaLabel = "Alle Produkte ansehen",
}: {
  title: string;
  text: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-surface px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
        <SunIcon />
      </span>
      <h2 className="font-display text-xl font-extrabold tracking-tight text-balance text-foreground">
        {title}
      </h2>
      <p className="max-w-sm text-sm text-pretty text-muted">{text}</p>
      <Link
        href={ctaHref}
        prefetch={true}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-[background-color,box-shadow,scale] duration-200 hover:bg-coral-deep active:scale-[0.96]"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
