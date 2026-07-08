"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-7">
        <dt className="mb-3 text-xs font-bold tracking-wider text-muted uppercase">
          {option.name}
          {searchParams.get(option.name.toLowerCase()) ? (
            <span className="ml-2 font-semibold normal-case tracking-normal text-foreground">
              {searchParams.get(option.name.toLowerCase())}
            </span>
          ) : null}
        </dt>
        <dd className="flex flex-wrap gap-2.5">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current searchParams so we can preserve any other param state.
            const optionParams: Record<string, string> = {};
            searchParams.forEach((v, k) => (optionParams[k] = v));
            optionParams[optionNameLowerCase] = value;

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale,
              ),
            );

            // The option is active if it's in the selected options.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                formAction={() => updateOption(optionNameLowerCase, value)}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? " (Ausverkauft)" : ""}`}
                className={clsx(
                  "flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-[border-color,background-color,color,scale] duration-150",
                  {
                    "cursor-default border-coral bg-coral text-white shadow-[0_6px_16px_-6px_var(--color-coral)]":
                      isActive,
                    "border-line bg-surface text-foreground hover:border-coral hover:text-coral active:scale-[0.96]":
                      !isActive && isAvailableForSale,
                    "relative z-10 cursor-not-allowed overflow-hidden border-line/60 bg-surface-2 text-muted/60 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-muted/40":
                      !isAvailableForSale,
                  },
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
