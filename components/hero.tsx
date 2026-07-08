import Price from "components/price";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
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

function FloatingProductCard({
  product,
  className,
  imgClassName,
  animation,
}: {
  product?: Product;
  className: string;
  imgClassName: string;
  animation: string;
}) {
  if (!product?.featuredImage?.url) return null;

  return (
    <Link
      href={`/product/${product.handle}`}
      prefetch={true}
      aria-label={product.title}
      className={`absolute hidden lg:block ${animation} ${className}`}
    >
      <span className="block overflow-hidden rounded-3xl border border-line bg-surface/90 shadow-[0_24px_60px_-24px_rgba(25,20,16,0.4)] backdrop-blur-sm transition-transform duration-300 hover:scale-[1.04]">
        <span className={`relative block ${imgClassName}`}>
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            fill
            sizes="220px"
            className="object-contain p-4"
          />
        </span>
        <Price
          className="absolute right-3 bottom-3 rounded-full bg-coral px-2.5 py-1 text-xs font-bold text-white tabular-nums"
          amount={product.priceRange.minVariantPrice.amount}
          currencyCode={product.priceRange.minVariantPrice.currencyCode}
          currencyCodeClassName="hidden"
        />
      </span>
    </Link>
  );
}

export async function Hero() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  return (
    <section className="relative overflow-hidden">
      {/* Atmosphere: sun glow + ice glow + drifting marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -top-40 -right-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-sun),var(--color-coral)_42%,transparent_70%)] opacity-60 blur-2xl" />
        <div className="animate-float-slow absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-ice),transparent_68%)] opacity-55 blur-2xl" />
        <Snowflake className="animate-spin-slow absolute top-24 left-[12%] hidden h-10 w-10 text-ice-deep/40 sm:block" />
      </div>

      {/* Echte Produktfotos als schwebende Karten (Desktop) */}
      <FloatingProductCard
        product={products[0]}
        className="top-24 left-[4%] w-44 -rotate-6 xl:left-[7%]"
        imgClassName="aspect-square"
        animation="animate-float"
      />
      <FloatingProductCard
        product={products[1]}
        className="top-40 right-[4%] w-52 rotate-[5deg] xl:right-[7%]"
        imgClassName="aspect-square"
        animation="animate-float-slow"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
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
            className="group inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:shadow-[0_16px_40px_-8px_var(--color-coral)] active:scale-[0.98]"
          >
            Jetzt shoppen
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/search"
            prefetch={true}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-3.5 text-sm font-bold text-foreground backdrop-blur-sm transition-[color,transform] duration-200 hover:border-ice-deep hover:text-ice-deep active:scale-[0.98]"
          >
            Bestseller ansehen
          </Link>
        </div>

        {/* Echte Produkte als Quick-Links */}
        {products.length ? (
          <div
            className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-2.5"
            style={{ animationDelay: "380ms" }}
          >
            {products.slice(0, 3).map((product) =>
              product.featuredImage?.url ? (
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  prefetch={true}
                  className="group flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pr-4 pl-1.5 backdrop-blur-sm transition-[border-color,scale] duration-200 hover:border-coral active:scale-[0.96]"
                >
                  <span className="relative h-9 w-9 overflow-hidden rounded-full border border-line bg-surface">
                    <Image
                      src={product.featuredImage.url}
                      alt={product.title}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-xs font-bold text-foreground transition-colors group-hover:text-coral">
                    {product.title}
                  </span>
                  <Price
                    className="text-xs font-semibold text-muted tabular-nums"
                    amount={product.priceRange.minVariantPrice.amount}
                    currencyCode={
                      product.priceRange.minVariantPrice.currencyCode
                    }
                    currencyCodeClassName="hidden"
                  />
                </Link>
              ) : null,
            )}
          </div>
        ) : null}

        <div
          className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-muted"
          style={{ animationDelay: "440ms" }}
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
