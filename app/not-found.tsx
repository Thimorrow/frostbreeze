import Link from "next/link";

export const metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-wide text-cyan-600 uppercase dark:text-cyan-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
        Diese Seite gibt es nicht.
      </h1>
      <p className="mt-3 text-neutral-500 dark:text-neutral-400">
        Vielleicht abgekühlt und verschwunden. Zurück zum Shop und stöber durch
        unsere Sommer-Essentials.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
