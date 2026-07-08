import Link from "next/link";

import FooterMenu from "components/layout/footer-menu";
import LogoSquare from "components/logo-square";
import PaymentIcons from "components/payment-icons";
import { getMenu } from "lib/shopify";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME, SHOPIFY_STORE_DOMAIN } = process.env;

const trust = [
  { label: "Versand aus Deutschland", color: "bg-coral" },
  { label: "30 Tage Rückgabe", color: "bg-amber" },
  { label: "Sichere Bezahlung", color: "bg-ice" },
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2026 + (currentYear > 2026 ? `-${currentYear}` : "");
  const skeleton = "w-32 h-4 animate-pulse rounded-sm bg-white/10";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="mt-20 bg-[#141019] text-neutral-400">
      <div className="mx-auto max-w-(--breakpoint-2xl) px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <LogoSquare />
              <span className="font-display text-xl font-medium tracking-tight lowercase">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Frische Sommer-Essentials gegen die Hitze — Ventilator,
              Kühl-Handtuch und Haustier-Kühlmatte. Direkt zu dir geliefert.
            </p>
            <Link
              href="/search"
              prefetch={true}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-coral-deep"
            >
              Jetzt shoppen <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Shop menu */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-neutral-500 uppercase">
              Shop
            </h3>
            <Suspense
              fallback={
                <div className="flex flex-col gap-3 pt-1">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>

          {/* Trust */}
          <div>
            <h3 className="mb-3 text-xs font-bold tracking-widest text-neutral-500 uppercase">
              Warum Frostbreeze
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${t.color}`} />
                  {t.label}
                </li>
              ))}
              <li>
                <a
                  href={`https://${SHOPIFY_STORE_DOMAIN}/account`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-frost" />
                  Mein Konto
                </a>
              </li>
            </ul>
            <h3 className="mt-8 mb-3 text-xs font-bold tracking-widest text-neutral-500 uppercase">
              Sicher bezahlen
            </h3>
            <PaymentIcons className="flex flex-wrap items-center gap-1.5" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col items-center gap-1 px-6 py-6 text-xs text-neutral-500 md:flex-row lg:px-8">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            Alle Rechte vorbehalten.
          </p>
          <p className="md:ml-auto">Powered by Shopify</p>
        </div>
      </div>
    </footer>
  );
}
