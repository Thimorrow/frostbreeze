"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-12 flex max-w-xl flex-col items-center rounded-3xl border border-line bg-surface p-8 text-center md:p-12">
      <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground">
        Ups, da ist was schiefgelaufen.
      </h2>
      <p className="my-3 max-w-md text-sm text-pretty text-muted">
        Es gab ein Problem beim Laden des Shops. Das ist meist nur ein kurzer
        Schluckauf — bitte versuch es einfach noch einmal.
      </p>
      <button
        className="mt-4 flex w-full max-w-xs items-center justify-center rounded-full bg-coral px-6 py-4 text-sm font-bold tracking-wide text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-[background-color,box-shadow,scale] duration-200 hover:bg-coral-deep active:scale-[0.96]"
        onClick={() => reset()}
      >
        Nochmal versuchen
      </button>
    </div>
  );
}
