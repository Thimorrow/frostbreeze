import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";

/**
 * Mobile Kauf-Leiste: fixiert am unteren Rand, nur < sm sichtbar.
 * Die Seite braucht unten Platz (pb), damit nichts verdeckt wird.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-30 border-t border-line px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:hidden">
      <div className="flex items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-muted">
            {product.title}
          </p>
          <Price
            className="text-base font-extrabold text-coral tabular-nums"
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            currencyCodeClassName="hidden"
          />
        </div>
        <div className="min-w-0 flex-1">
          <AddToCart product={product} compact />
        </div>
      </div>
    </div>
  );
}
