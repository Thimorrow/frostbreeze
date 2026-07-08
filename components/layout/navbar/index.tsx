import { UserIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME, SHOPIFY_STORE_DOMAIN } = process.env;

// Login läuft komplett über Shopifys gehostete Kundenkonten —
// kein eigener Auth-Code im Storefront.
const accountUrl = `https://${SHOPIFY_STORE_DOMAIN}/account`;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-background/75 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-(--breakpoint-2xl) items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} accountUrl={accountUrl} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center gap-2.5 md:w-auto lg:mr-8"
            >
              <LogoSquare />
              <span className="font-display flex-none text-lg font-medium tracking-tight text-foreground lowercase md:hidden lg:block">
                {SITE_NAME}
              </span>
            </Link>
            {menu.length ? (
              <ul className="hidden gap-7 text-sm font-semibold md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="text-muted underline-offset-4 transition-colors hover:text-coral"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex items-center justify-end gap-2 md:w-1/3">
            <a
              href={accountUrl}
              aria-label="Konto"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-coral hover:text-coral md:flex"
            >
              <UserIcon className="h-5" />
            </a>
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
