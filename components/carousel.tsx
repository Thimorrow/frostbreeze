import clsx from "clsx";
import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  // Tripled so the `animate-carousel` marquee (0 → -33.33%) loops seamlessly.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto mb-6 flex max-w-(--breakpoint-2xl) items-end justify-between px-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-ice-deep uppercase">
            <span className="h-px w-6 bg-ice-deep" /> Gerade beliebt
          </span>
          <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Frisch für heiße Tage
          </h2>
        </div>
      </div>

      <div className="group relative w-full overflow-x-auto snap-x snap-mandatory scrollbar-none md:overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <ul className="animate-carousel flex w-max gap-4 px-4 group-hover:[animation-play-state:paused] max-md:[animation:none]">
          {carouselProducts.map((product, i) => (
            <li
              key={`${product.handle}${i}`}
              className={clsx(
                "relative aspect-square h-[34vh] max-h-[300px] w-2/3 max-w-[420px] flex-none snap-start sm:w-1/3",
                i >= products.length && "max-md:hidden",
              )}
            >
              <Link
                href={`/product/${product.handle}`}
                prefetch={true}
                className="relative block h-full w-full"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode:
                      product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
