import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 px-6 py-14 sm:px-12 sm:py-20">
        {/* frosty accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white uppercase backdrop-blur-sm ring-1 ring-white/25">
            Sommer 2026
          </span>
          <h1 className="mt-5 text-4xl leading-tight font-semibold text-balance text-white sm:text-5xl md:text-6xl">
            Bleib cool, wenn es heiß wird.
          </h1>
          <p className="mt-4 max-w-xl text-base text-pretty text-cyan-50/90 sm:text-lg">
            Ventilator, Kühl-Handtuch und Haustier-Kühlmatte. Deine frischen
            Sommer-Essentials, direkt geliefert.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/search"
              prefetch={true}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-cyan-700 shadow-sm transition-colors hover:bg-cyan-50"
            >
              Jetzt shoppen
            </Link>
            <Link
              href="/product/turbobreeze-2-in-1-turbo-handventilator-mit-powerbank"
              prefetch={true}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/60 transition-colors hover:bg-white/10"
            >
              Bestseller ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
