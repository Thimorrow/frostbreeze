import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-sm font-extrabold tracking-widest text-coral uppercase">
        404
      </p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl">
        Diese Seite gibt es nicht.
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted">
        Vielleicht abgekühlt und verschwunden. Zurück zum Shop und stöber durch
        unsere Sommer-Essentials.
      </p>
      <Link
        href="/"
        prefetch={true}
        className="mt-8 rounded-full bg-coral px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-[background-color,box-shadow,scale] duration-200 hover:bg-coral-deep active:scale-[0.96]"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
