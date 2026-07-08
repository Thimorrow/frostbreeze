import Link from "next/link";

function Snowflake({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 3v26" />
      <path d="M4.74 9.5 27.26 22.5" />
      <path d="M27.26 9.5 4.74 22.5" />
      <path d="M16 3l-3 3M16 3l3 3M16 29l-3-3M16 29l3-3" />
      <path d="M4.74 9.5l.1 4.2M4.74 9.5l4.1-1M27.26 22.5l-.1-4.2M27.26 22.5l-4.1 1" />
      <path d="M27.26 9.5l-4.1 1M27.26 9.5l-.1 4.2M4.74 22.5l4.1-1M4.74 22.5l.1-4.2" />
    </svg>
  );
}

const ticker = [
  "Gratis Versand ab 30 €",
  "30 Tage Rückgabe",
  "Versand aus Deutschland",
  "Sicher bezahlen",
  "Frische Sommer-Essentials",
];

// Four copies (two matching halves) so `animate-marquee` (0 → -50%) loops
// seamlessly and stays wider than the viewport on large screens.
const tickerLoop = [...ticker, ...ticker, ...ticker, ...ticker];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Atmosphere: sun glow + ice glow + drifting marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-40 -right-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-sun),var(--color-coral)_42%,transparent_70%)] opacity-60 blur-2xl" />
        <div className="animate-float-slow absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-ice),transparent_68%)] opacity-55 blur-2xl" />
        <Snowflake className="animate-spin-slow absolute top-24 left-[12%] hidden h-10 w-10 text-ice-deep/40 sm:block" />
        <Snowflake className="animate-float absolute right-[14%] bottom-28 hidden h-14 w-14 text-coral/30 lg:block" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
        <span
          className="animate-rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted uppercase backdrop-blur-sm"
          style={{ animationDelay: "60ms" }}
        >
          <Snowflake className="h-3.5 w-3.5 text-ice-deep" />
          Sommer 2026 · Frische Essentials
        </span>

        <h1
          className="animate-rise font-display mt-6 text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-extrabold tracking-tight text-balance text-foreground"
          style={{ animationDelay: "140ms" }}
        >
          Bleib <span className="text-gradient-sun">cool</span>,
          <br className="hidden sm:block" /> wenn&rsquo;s heiß wird.
        </h1>

        <p
          className="animate-rise mx-auto mt-6 max-w-xl text-base text-pretty text-muted sm:text-lg"
          style={{ animationDelay: "220ms" }}
        >
          Ventilator, Kühl-Handtuch und Haustier-Kühlmatte. Deine frischen
          Sommer-Essentials, direkt geliefert.
        </p>

        <div
          className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "300ms" }}
        >
          <Link
            href="/search"
            prefetch={true}
            className="group inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:shadow-[0_16px_40px_-8px_var(--color-coral)]"
          >
            Jetzt shoppen
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/search"
            prefetch={true}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-3.5 text-sm font-bold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-ice-deep hover:text-ice-deep"
          >
            Bestseller ansehen
          </Link>
        </div>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-muted"
          style={{ animationDelay: "380ms" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" /> 3 Bestseller
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" /> Made for
            Summer
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ice" /> Sicher &amp;
            versichert
          </span>
        </div>
      </div>

      {/* Trust ticker — warm coral band, endless marquee */}
      <div className="relative flex overflow-hidden border-y border-coral-deep/40 bg-coral py-3 text-white select-none">
        <div
          aria-hidden
          className="animate-marquee flex w-max shrink-0 items-center gap-8 pr-8 text-sm font-bold whitespace-nowrap"
        >
          {tickerLoop.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              <Snowflake className="h-4 w-4 text-sun" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
