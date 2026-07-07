# dropship

Dropshipping-Shop auf Shopify mit eigenem **Next.js Headless-Storefront** (Frostbreeze) im Repo-Root. Das Storefront zeigt die Shopify-Produkte ueber die Storefront API an, der Checkout laeuft weiter ueber Shopify, DSers bleibt unveraendert. Dieses Repo enthaelt sowohl den Storefront-Code als auch die Wissensbasis zum Shop (`docs/`, `STATE.md`).

## Schnellfakten

- Shop: `4mm0ka-ff.myshopify.com` ("Mein Shop")
- Plan: Basic, Waehrung EUR, Markt Deutschland
- Theme: Horizon
- Dropshipping-Tool: **DSers** (AliExpress-Link-Import, gratis)
- Aufbau: Headless-Storefront (Next.js App Router, Vercel Commerce) + Shopify als Backend via Storefront API

## Struktur

- `STATE.md` — aktueller Stand, offene Punkte, Verifikations-Befehle. Immer zuerst lesen.
- `docs/shop.md` — Shop-Entities: Produkte, Varianten, Preise, Standorte, alle IDs.
- `docs/dsers.md` — wie DSers arbeitet und die eine wichtige Einstellung.
- `docs/ausverkauft-fix.md` — warum alles "Ausverkauft" zeigte und der Fix.
- `docs/images.md` — wie echte AliExpress-Bilder in den Shop kommen.

## So arbeitest du hier weiter

```
cd ~/Desktop/dropship
claude
```

Shopify-Aenderungen laufen ueber den Shopify-MCP-Connector in der Claude-Hauptsession (der kann live am Shop schreiben). Dieses Repo haelt den Stand fest, damit nichts zwischen Sessions verloren geht.

## Storefront (Next.js) starten

```
pnpm install
pnpm dev      # Dev-Server (http://localhost:3000)
pnpm build    # Produktions-Build
pnpm start    # Produktions-Server
```

Env-Variablen liegen in `.env.local` (nicht committet, siehe `.env.example`):

- `SHOPIFY_STORE_DOMAIN` = `frostbreeze-store.myshopify.com` (Primaerdomain des Shops, `4mm0ka-ff.myshopify.com` funktioniert fuer die API ebenfalls)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` = oeffentlicher Storefront-API-Token (aus dem Headless-Kanal)
- `SHOPIFY_REVALIDATION_SECRET` = Secret fuer den `/api/revalidate`-Webhook
- `SITE_NAME` / `COMPANY_NAME` = `Frostbreeze`

Stack: Next.js App Router + TypeScript + Tailwind v4, pnpm. Katalog/Cart/Checkout laufen ueber die Shopify Storefront API, Deploy auf Vercel (Account Thimorrow).
