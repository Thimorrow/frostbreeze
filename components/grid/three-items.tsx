import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-12 pb-4 sm:pt-16">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-coral uppercase">
            <span className="h-px w-6 bg-coral" /> Die Kollektion
          </span>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl">
            Drei Essentials gegen die Hitze
          </h2>
        </div>
        <Link
          href="/search"
          prefetch={true}
          className="inline-flex items-center gap-1.5 self-start py-2 text-sm font-bold text-foreground underline-offset-4 transition-colors hover:text-coral sm:self-auto"
        >
          Alle ansehen <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-160px)]">
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </div>
    </section>
  );
}
