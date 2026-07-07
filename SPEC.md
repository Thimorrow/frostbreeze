# SPEC — Next.js Headless-Storefront fuer Shop 4mm0ka-ff

Stand: 07.07.2026. Diese Spec ist ausfuehrungsfertig: ein Implementierer soll ohne Rueckfrage loslegen koennen.

## Ziel (ein Satz)

Ein neues, frisch designtes Storefront in Next.js, das die Produkte des bestehenden Shopify-Shops `4mm0ka-ff.myshopify.com` headless anzeigt und den Kauf ueber Shopifys gehosteten Checkout abwickelt, sodass DSers unveraendert weiterlaeuft.

## Architektur

- Frontend: Next.js (App Router, TypeScript, Tailwind), Basis = Vercel Commerce Starter (`github.com/vercel/commerce`).
- Backend: Shopify bleibt Commerce-Backend. Katalog, Warenkorb, Checkout, Bezahlung, Bestellungen laufen ueber Shopify.
- Datenanbindung: Shopify **Storefront API** (unauthenticated). Next liest Produkte/Collections, erstellt Carts, und leitet zum Checkout via `cart.checkoutUrl`.
- Dropshipping: unveraendert. Bestellungen landen in Shopify, DSers wickelt sie ab wie bisher. Kein Eingriff in DSers noetig.
- Host: Vercel, Account **Thimorrow**.

## Scope

- Startseite mit Hero + den 3 Produkten (Grid/Carousel).
- Produktliste / Suche.
- Produktdetailseite mit Variantenauswahl, Preis (EUR), Bildern aus Shopify-CDN, "In den Warenkorb".
- Warenkorb (Drawer) mit Menge aendern und Zwischensumme.
- Checkout: Weiterleitung auf Shopifys gehostete Checkout-Seite.
- Frisches, kuehles Sommer-Design (die Produkte sind Ventilator, Kuehl-Handtuch, Haustier-Kuehlmatte), responsive, Light/Dark.
- Deploy auf Vercel mit erreichbarer Live-URL.

## Nicht-Scope

- Kein eigener Checkout / kein Payment im Next (bleibt komplett Shopify).
- Keine Migration weg von Shopify oder DSers.
- Keine Kundenkonten / Login (erstmal).
- Kein Blog / CMS (erstmal).
- Keine Mehrsprachigkeit (nur Deutsch, Markt DE, EUR).

## Verhalten inkl. Edge Cases

- Produkt ohne Bild: Platzhalter statt Broken Image.
- Ausverkaufte Variante: Button deaktiviert mit Hinweis, kein Warenkorb-Add moeglich.
- Leerer Warenkorb: Drawer zeigt "leer"-Zustand, kein Checkout-Button aktiv.
- Preis/Bestand im Shopify-Admin geaendert: erscheint auf der Next-Seite nach Revalidierung (Webhook oder Zeit-Revalidate), nicht hartkodiert.
- Mobil: Navigation, Grid und Warenkorb funktionieren auf Smartphone-Breite.
- Unbekannte URL: saubere 404-Seite.

## Voraussetzungen: manuelle Schritte (Mensch, vor/waehrend Umsetzung)

1. **Storefront API Token erstellen** in Shopify Admin: Einstellungen -> Apps und Vertriebskanaele -> Apps entwickeln -> App erstellen -> Storefront-API-Scopes aktivieren (`unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_read_checkouts`, `unauthenticated_write_checkouts`, `unauthenticated_read_product_tags`) -> installieren -> **Storefront-API-Zugriffstoken** kopieren.
2. **Vercel-Login** unter Account Thimorrow (fuer Deploy). Ggf. `! vercel login` in der Session.
3. Custom Domain: spaeter, erstmal Vercel-URL.

## Shopify-Konfiguration, die die Umsetzung anlegt (per MCP/Admin)

- Collections mit exakten Handles anlegen und die 3 Produkte einsortieren (Vercel Commerce liest die fuer die Startseite):
  - `hidden-homepage-featured-items` (die 3 Produkte)
  - `hidden-homepage-carousel` (die 3 Produkte)
- Navigations-Menues anlegen (Handles exakt):
  - `next-js-frontend-header-menu`
  - `next-js-frontend-footer-menu`
- Die 3 Produkte im Headless/Storefront-Vertriebskanal veroeffentlichen.

## Env-Variablen (Next / Vercel)

```
SHOPIFY_STORE_DOMAIN=4mm0ka-ff.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<aus manuellem Schritt 1>
SHOPIFY_REVALIDATION_SECRET=<selbst generiert>
SITE_NAME=<Shop-Name>
COMPANY_NAME=<Shop-Name>
```

## Repo-Layout

- Die Next.js-App lebt im **Root des bestehenden Repos** `~/Desktop/dropship`.
- Die Doku bleibt unter `docs/` und `STATE.md` erhalten (nicht ueberschreiben). README ggf. um App-Start ergaenzen.
- Paketmanager: pnpm (Vercel-Commerce-Default).

## Akzeptanzkriterien (abhakbar, jedes pruefbar)

- [ ] `pnpm build` laeuft lokal fehlerfrei durch.
- [ ] Startseite (lokal `localhost:3000`) liefert 200 und zeigt die 3 Produkte (PocketBreeze, ChillTowel, CoolPaws) mit Bild, Titel und Preis in EUR. Beweis: `curl -s localhost:3000 | grep -iE "pocketbreeze|chilltowel|coolpaws"`.
- [ ] Produktdetailseite `/product/<handle>` zeigt Variantenauswahl, EUR-Preis, Shopify-CDN-Bilder und einen aktiven "In den Warenkorb"-Button.
- [ ] "In den Warenkorb" fuegt eine Variante hinzu, der Warenkorb-Drawer zeigt Item, Menge und korrekte Zwischensumme.
- [ ] "Zur Kasse" leitet auf eine Shopify-Checkout-URL (Domain enthaelt `4mm0ka-ff.myshopify.com` bzw. Shopify-Checkout-Host) mit uebernommenem Warenkorb.
- [ ] Produktdaten kommen live aus der Storefront API: eine Preisaenderung im Shopify-Admin erscheint nach Revalidierung auf der Next-Seite (nicht hartkodiert).
- [ ] Design ist frisch und kuehl (nicht der "Acme Store"-Default): eigener SITE_NAME/Branding, klarer Hero mit CTA, kuehle Primaerfarbe, responsive auf Mobil und Desktop, Light/Dark ok.
- [ ] Ausverkaufte Variante: Button deaktiviert, kein Add moeglich.
- [ ] Deploy auf Vercel unter Account Thimorrow: Build-Status gruen (nicht BLOCKED/ERROR), Live-URL liefert HTTP 200.
- [ ] Alle Commits haben Identitaet Thimorrow (`292338461+Thimorrow@users.noreply.github.com`).
- [ ] DSers unversehrt: eine Testbestellung ueber den Checkout erscheint als Shopify-Order (ohne echte Zahlung nur bis zur Checkout-Seite pruefen, sonst mit Test-Order).

## Verifikationsplan (konkrete Befehle/Flows)

1. Lokal: `pnpm install && pnpm build && pnpm dev`, dann Startseite und `grep` auf die 3 Produktnamen.
2. Klick-Flow lokal: Produkt oeffnen -> Variante waehlen -> in den Warenkorb -> Drawer pruefen -> "Zur Kasse" -> Ziel-URL-Domain pruefen (muss Shopify-Checkout sein).
3. "Live aus Shopify"-Beweis: Preis eines Produkts im Admin minimal aendern, revalidieren, auf der Next-Seite gegenpruefen, danach zuruecksetzen.
4. Nach Deploy: `curl -sI https://<vercel-url>` -> `HTTP/2 200`. Dann den `live-verifier`-Agent als unabhaengigen Gatekeeper laufen lassen (PASS/FAIL mit Evidenz).
5. Git-Identitaet: `git log -1 --format='%an <%ae>'` == Thimorrow.

## Getroffene Annahmen (explizit markiert)

- ANNAHME: Headless mit Shopify-Checkout gewuenscht (DSers bleibt unveraendert). Bestaetigt durch die Architektur-Entscheidung.
- ANNAHME: Basic-Plan reicht (Storefront API ist auf allen Plaenen verfuegbar).
- ANNAHME: Host = Vercel, Account Thimorrow.
- ANNAHME: Paketmanager pnpm, Stack Next.js App Router + TypeScript + Tailwind (Starter-Default).
- ANNAHME: Sprache Deutsch, Markt Deutschland, Waehrung EUR.
- ANNAHME: Umsetzung standardmaessig ueber glm-worker, Opus reviewt per git diff. Eskalation nur bei zweimaligem Scheitern oder heikler Architektur.

## Uebergabe (Ausfuehrung in frischer Session)

1. `/clear`
2. Neue Session im Projektordner: `cd ~/Desktop/dropship && claude`
3. Startprompt: `Setze SPEC.md um. Hake am Ende jedes Akzeptanzkriterium mit Beweis ab.`
