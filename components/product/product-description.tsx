import { AddToCart } from "components/cart/add-to-cart";
import PaymentIcons from "components/payment-icons";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-none text-coral"
      aria-hidden
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

const usps = [
  "Gratis Versand ab 30 €",
  "30 Tage Rückgaberecht",
  "Sicherer Checkout über Shopify",
];

export function ProductDescription({ product }: { product: Product }) {
  const hasPriceRange =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-line pb-6">
        {!product.availableForSale ? (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-muted uppercase">
            Ausverkauft
          </span>
        ) : null}
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-balance break-words text-foreground sm:text-4xl">
          {product.title}
        </h1>
        <div className="mt-4 flex items-baseline gap-2">
          {hasPriceRange ? (
            <span className="text-sm font-semibold text-muted">ab</span>
          ) : null}
          <Price
            className="text-2xl font-extrabold text-coral tabular-nums"
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            currencyCodeClassName="hidden"
          />
          <span className="text-xs text-muted">inkl. MwSt.</span>
        </div>
      </div>

      <div className="mt-7">
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </div>

      <AddToCart product={product} />

      <ul className="mt-6 space-y-2.5 rounded-2xl border border-line bg-surface p-4">
        {usps.map((usp) => (
          <li
            key={usp}
            className="flex items-center gap-2.5 text-sm font-semibold text-foreground"
          >
            <CheckIcon />
            {usp}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold text-muted">
          Sicher bezahlen mit
        </p>
        <PaymentIcons className="flex flex-wrap items-center gap-1.5" />
      </div>

      {product.descriptionHtml ? (
        <Prose
          className="mt-8 border-t border-line pt-6 text-sm"
          html={product.descriptionHtml}
        />
      ) : null}
    </div>
  );
}
