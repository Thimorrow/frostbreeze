"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  compact,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  compact?: boolean;
}) {
  const buttonClasses = clsx(
    "flex w-full items-center justify-center gap-2 rounded-full bg-coral text-sm font-bold tracking-wide text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-[background-color,box-shadow,scale] duration-200",
    compact ? "px-5 py-3" : "px-6 py-4",
  );
  const disabledClasses =
    "cursor-not-allowed bg-surface-2 text-muted shadow-none";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Ausverkauft
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Bitte eine Variante wählen"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <PlusIcon className="h-5" />
        In den Warenkorb
      </button>
    );
  }

  return (
    <button
      aria-label="In den Warenkorb"
      className={clsx(
        buttonClasses,
        "hover:bg-coral-deep hover:shadow-[0_16px_40px_-8px_var(--color-coral)] active:scale-[0.98]",
      )}
    >
      <PlusIcon className="h-5" />
      In den Warenkorb
    </button>
  );
}

export function AddToCart({
  product,
  compact,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        compact={compact}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
