"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import Search, { SearchSkeleton } from "./search";

export default function MobileMenu({
  menu,
  accountUrl,
}: {
  menu: Menu[];
  accountUrl: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  // Wenn das Menü über die Lupe geöffnet wird, bekommt das Suchfeld den Fokus.
  const [focusSearch, setFocusSearch] = useState(false);
  const openMobileMenu = () => {
    setFocusSearch(false);
    setIsOpen(true);
  };
  const openSearchMobile = () => {
    setFocusSearch(true);
    setIsOpen(true);
  };
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={openMobileMenu}
          aria-label="Menü öffnen"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-coral"
        >
          <Bars3Icon className="h-4" />
        </button>
        <button
          onClick={openSearchMobile}
          aria-label="Suche öffnen"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-coral"
        >
          <MagnifyingGlassIcon className="h-5" />
        </button>
      </div>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed top-0 right-0 bottom-0 left-0 flex h-dvh w-full flex-col bg-background pb-[max(env(safe-area-inset-bottom),1.5rem)]">
              <div className="flex-1 overflow-y-auto overscroll-contain p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-coral"
                  onClick={closeMobileMenu}
                  aria-label="Menü schließen"
                >
                  <XMarkIcon className="h-6" />
                </button>

                <div className="mb-4 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search shouldFocus={focusSearch} />
                  </Suspense>
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="font-display py-2 text-xl font-bold text-foreground transition-colors hover:text-coral"
                        key={item.title}
                      >
                        <Link
                          href={item.path}
                          prefetch={true}
                          onClick={closeMobileMenu}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <a
                  href={accountUrl}
                  className="mt-4 flex items-center gap-2.5 border-t border-line pt-5 text-base font-semibold text-muted transition-colors hover:text-coral"
                >
                  <UserIcon className="h-5" />
                  Mein Konto
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
