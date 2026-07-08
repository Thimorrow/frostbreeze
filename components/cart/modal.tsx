"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

const FREE_SHIPPING_THRESHOLD = 30;

function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      {remaining > 0 ? (
        <p className="text-sm font-semibold text-foreground">
          Noch{" "}
          <span className="font-extrabold text-coral tabular-nums">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(remaining)}
          </span>{" "}
          bis zum Gratis-Versand
        </p>
      ) : (
        <p className="flex items-center gap-2 text-sm font-bold text-ice-deep">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M4 10.5l4 4 8-9" />
          </svg>
          Gratis-Versand freigeschaltet
        </p>
      )}
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber to-coral transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Warenkorb öffnen" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              className="fixed inset-0 bg-foreground/30"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col border-l border-line bg-background/90 p-6 backdrop-blur-xl md:w-[420px]">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-extrabold tracking-tight text-foreground">
                  Dein Warenkorb
                  {cart && cart.totalQuantity > 0 ? (
                    <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-coral px-1.5 align-middle text-xs font-bold text-white tabular-nums">
                      {cart.totalQuantity}
                    </span>
                  ) : null}
                </p>
                <button aria-label="Warenkorb schließen" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-24 flex w-full flex-col items-center justify-center gap-4 overflow-hidden px-4 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2">
                    <ShoppingBagIcon className="h-8 text-coral" />
                  </span>
                  <p className="font-display text-xl font-extrabold tracking-tight text-foreground">
                    Dein Warenkorb ist leer.
                  </p>
                  <p className="max-w-xs text-sm text-pretty text-muted">
                    Zeit für Abkühlung: Ventilator, Kühl-Handtuch und mehr
                    warten im Shop.
                  </p>
                  <Link
                    href="/search"
                    onClick={closeCart}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-[background-color,box-shadow,scale] duration-200 hover:bg-coral-deep active:scale-[0.96]"
                  >
                    Jetzt shoppen
                  </Link>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          },
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-line"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -mt-2 -ml-1">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-line bg-surface">
                                  <Image
                                    className="h-full w-full object-contain p-1"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="z-30 ml-3 flex flex-row space-x-4"
                                >
                                  <div className="flex flex-1 flex-col text-base">
                                    <span className="leading-tight font-semibold text-foreground">
                                      {item.merchandise.product.title}
                                    </span>
                                    {item.merchandise.title !==
                                    DEFAULT_OPTION ? (
                                      <p className="mt-0.5 text-sm text-muted">
                                        {item.merchandise.title}
                                      </p>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm font-bold text-foreground tabular-nums"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                  currencyCodeClassName="hidden"
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-line bg-surface">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm font-semibold tabular-nums">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>

                  <div className="space-y-4">
                    <FreeShippingProgress
                      subtotal={parseFloat(cart.cost.subtotalAmount.amount)}
                    />

                    <div className="text-sm text-muted">
                      <div className="mb-3 flex items-center justify-between border-b border-line pb-1">
                        <p>Steuern</p>
                        <Price
                          className="text-right text-base text-foreground tabular-nums"
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                          currencyCodeClassName="hidden"
                        />
                      </div>
                      <div className="mb-3 flex items-center justify-between border-b border-line pt-1 pb-1">
                        <p>Versand</p>
                        <p className="text-right">
                          Wird an der Kasse berechnet
                        </p>
                      </div>
                      <div className="mb-3 flex items-center justify-between pt-1 pb-1">
                        <p className="font-semibold text-foreground">Gesamt</p>
                        <Price
                          className="text-right text-lg font-extrabold text-foreground tabular-nums"
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                          currencyCodeClassName="hidden"
                        />
                      </div>
                    </div>
                    <form action={redirectToCheckout}>
                      <CheckoutButton />
                    </form>
                    <button
                      onClick={closeCart}
                      className="w-full text-center text-xs font-semibold text-muted transition-colors hover:text-coral"
                    >
                      Weiter einkaufen
                    </button>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-coral hover:text-coral">
      <XMarkIcon className={className ? className : "h-5"} />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 text-sm font-bold tracking-wide text-white shadow-[0_10px_30px_-8px_var(--color-coral)] transition-[background-color,box-shadow,scale] duration-200 hover:bg-coral-deep hover:shadow-[0_16px_40px_-8px_var(--color-coral)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <>
          Zur Kasse
          <span aria-hidden>→</span>
        </>
      )}
    </button>
  );
}
