# SPEC — Frostbreeze auf Premium-DTC-Niveau + Live-Deploy

Stand: 08.07.2026. Diese Spec ist ausfuehrungsfertig: ein Implementierer soll ohne Rueckfrage loslegen koennen. Die Vorgaenger-Spec (Storefront-Grundaufbau, abgeschlossen) liegt in der Git-History (Commit 98b6a9c).

## Ziel (ein Satz)

Der Frostbreeze-Storefront wird auf Premium-DTC-Niveau fertig designt (alle Seiten im Sun&Ice-System, echtes SVG-Logo, Conversion-/Trust-Elemente), die Produktdaten in Shopify werden aufgeraeumt, und der Shop geht live auf Vercel (Account Thimorrow).

## Ausgangslage

- Redesign-Durchgang 1 (Sun&Ice: Homepage, Navbar, Footer, Design-System in `app/globals.css`) ist fertig, aber **uncommittet** (17 Dateien). Details in STATE.md.
- Noch im alten Vercel-Commerce-Look: Produktdetailseite, Suche/Listing, Cart-Drawer, 404/Error/Loading.
- Logo ist eine generische Schneeflocke (`components/icons/logo.tsx`).
- 3 Produkte in Shopify mit echten Bildern, aber teils haesslichen Variantennamen und krummen Platzhalter-Preisen (15,14 EUR, 18,09 EUR).
- Deploy auf Vercel steht aus.
- **Wichtig fuer lokale Builds:** `NODE_USE_ENV_PROXY=1` setzen, sonst ECONNREFUSED zu Shopify aus dem Node-Prozess (curl geht, Node nicht). Der in STATE.md dokumentierte Prerender-Abbruch ist damit behoben.

## Scope

1. **Baseline sichern:** aktuellen Redesign-Stand committen (vorher `git config user.email` == Thimorrow pruefen), damit Durchgang 2 diffbar ist.
2. **SVG-Logo:** eigene Wortmarke "Frostbreeze" + Icon im Sun&Ice-Stil, als React-SVG in `components/icons/logo.tsx` / `logo-square.tsx`, plus Favicon (`app/icon.svg` o.ae.) und OG-Image-Anpassung. 2-3 Varianten mit dem `showcase`-Skill zur Auswahl vorlegen, Sid waehlt.
3. **Design-Durchgang 2 (Premium-DTC)** im bestehenden Sun&Ice-System (Tokens aus `app/globals.css`, Fonts Unbounded + Hanken Grotesk):
   - Produktdetailseite: `app/product/[handle]/page.tsx`, `components/product/*` (Galerie, Variant-Selector, Description).
   - Suche/Listing: `app/search/*`, `components/layout/search/*`, `product-grid-items.tsx`.
   - Cart-Drawer: `components/cart/modal.tsx` + Buttons.
   - Nebenschauplaetze: 404, error, loading-Zustaende.
   - Motion/Micro-Interactions mit Bedacht (Skills `make-interfaces-feel-better` / `emil-design-eng` nutzen), `prefers-reduced-motion` respektieren (Hook dafuer existiert schon in globals.css).
4. **Conversion & Trust:**
   - Echte Produktfotos (Shopify-CDN, `cdn.shopify.com` ist in next.config.ts freigegeben) in Hero- und Feature-Sektionen der Homepage statt Illustration/Platzhalter.
   - PDP: USP-Bullets, Versand-/Rueckgabe-Hinweis, Zahlungsarten-Icons, mobil Sticky-Add-to-Cart.
   - Zahlungsarten-Icons NUR fuer tatsaechlich aktive Zahlarten des Shopify-Checkouts (vorab pruefen, z.B. Storefront-API `shop.paymentSettings.acceptedCardBrands` + Checkout-Seite ansehen). Keine erfundenen Badges.
   - Bessere Produkttexte: Beschreibungen (`descriptionHtml`) per Shopify MCP verbessern (Nutzen, Material, Groessen, Lieferumfang). Kein Keyword-Spam.
   - **Keine Fake-Reviews** (UWG-Risiko in DE). Reviews erst, wenn echte existieren.
5. **Produktdaten aufraeumen (per Shopify MCP):**
   - Variantennamen normalisieren (kein "Ships From"-Muell, saubere deutsche Options-Namen wie "Farbe: Eisblau", "Groesse: M").
   - Preise: Vorschlag psychologischer Preise auf heutigem Niveau erarbeiten (z.B. 15,14 -> 14,99; 18,09-49,59 -> 17,99-49,99), Sid per AskUserQuestion zur Freigabe vorlegen, **erst nach Go setzen**. Ohne Go: nur Namen fixen, Preisvorschlag in STATE.md dokumentieren.
6. **Kundenkonto-Link (kein eigener Login-Code):** Navbar bekommt ein Konto-Icon, das auf Shopifys gehostete Kundenkonto-Seite verlinkt (`https://frostbreeze-store.myshopify.com/account`, folgt dem Redirect auf die neuen Customer Accounts). Vorab verifizieren, dass dort eine Login-Seite erscheint.
7. **Deploy auf Vercel (Account Thimorrow):**
   - Manueller Schritt Sid: `! vercel login` als Thimorrow, falls nicht eingeloggt.
   - Projekt anlegen/verbinden, Env-Vars aus `.env.local` setzen (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_REVALIDATION_SECRET`, `SITE_NAME`, `COMPANY_NAME`).
   - Deploy, Status darf nicht BLOCKED/ERROR sein, Live-URL = Standard-vercel.app (eigene Domain ist Nicht-Scope).

## Nicht-Scope

- Kein eigener Checkout / Payment im Next (bleibt Shopify), DSers unveraendert.
- Kein eigener Login-/Account-Code (nur Link auf Shopifys gehostete Kundenkonten).
- Kein Blog/CMS, keine Mehrsprachigkeit (nur DE/EUR).
- Keine Fake-Reviews, kein Review-System.
- Rechtstexte fuellen, JSON-LD/SEO-Ausbau, Analytics: bewusst NICHT in dieser Spec (bleiben offene TODOs in STATE.md; Rechtstexte sind Pflicht vor scharfem Verkauf).
- Keine eigene Domain (vercel.app reicht erstmal).

## Verhalten inkl. Edge Cases

- Ausverkaufte Variante: Button deaktiviert mit Hinweis, kein Add moeglich.
- Leerer Warenkorb: gestalteter Leer-Zustand im Drawer, Checkout-Button inaktiv.
- Produkt ohne Bild: Platzhalter, kein Broken Image.
- Sticky-Add-to-Cart nur mobil (<= 640px), verdeckt keinen Content am Seitenende.
- Galerie: mobil wischbar/scrollbar, Desktop mit Thumbnails; Bilder ueber `next/image`.
- `prefers-reduced-motion`: alle neuen Animationen aus bzw. reduziert.
- Suche ohne Treffer: gestalteter Leer-Zustand mit Link zurueck zu allen Produkten.
- Preisaenderung in Shopify erscheint nach Revalidierung im Storefront (nichts hartkodieren).

## Akzeptanzkriterien (abhakbar, jedes pruefbar)

- [x] Baseline-Commit des Redesign-Stands existiert vor Beginn von Durchgang 2; alle Commits mit Identitaet Thimorrow. **Beweis:** Commit `0fe8622`; `git log --format='%ae' | sort -u` -> nur `292338461+Thimorrow@users.noreply.github.com`.
- [x] Neues SVG-Logo in `components/icons/logo.tsx` + `logo-square.tsx` (Solstice-Mark statt Stock-Schneeflocke), Favicon aktualisiert (`app/icon.svg` + neu generiertes `favicon.ico`). **Abweichung:** Sid hat die Auswahl an Claude delegiert ("mach das svg fertig") statt per showcase zu klicken. **Beweis:** Commit `e24f664`, Screenshots `navbar-logo.png`/`footer-logo.png`, favicon.ico liefert 200/1380 Bytes.
- [x] PDP im Sun&Ice-Look: Galerie (mobil Scroll-Snap, Desktop Thumbnails), Variantenwahl, USP-Bullets, Versand-/Rueckgabe-Hinweis, Zahlungsarten-Icons. **Beweis:** Screenshots `pdp-desktop.png` + `pdp-mobile.png` (Playwright, Prod-Build).
- [x] Mobil (390px) zeigt die PDP einen Sticky-Add-to-Cart; Klick fuegt Variante hinzu und oeffnet den Drawer. **Beweis:** Playwright "MOBILE Sticky-Buy-Bar sichtbar: true", "MOBILE Drawer nach Sticky-ATC: true".
- [x] `/search` und Leer-Zustand im neuen Look, Filter/Sortierung funktionieren. **Beweis:** Playwright "SEARCH zeigt Produkte: true", "SEARCH-Leerzustand: true", Screenshots `search-desktop.png`/`search-empty.png`.
- [x] Cart-Drawer im neuen Look inkl. Gratisversand-Fortschritt; "Zur Kasse" fuehrt auf Shopify-Checkout-URL. **Beweis:** Playwright "CART-Drawer offen: true", "CART zeigt Gesamt: true", CHECKOUT-URL `https://frostbreeze-store.myshopify.com/checkouts/cn/...`.
- [x] Homepage-Hero zeigt echte Produktbilder von `cdn.shopify.com` (schwebende Karten + Produkt-Chips). **Beweis:** Playwright "HOME hat cdn.shopify.com Bilder: true", Screenshot `home-desktop-fonts.png`.
- [x] Zahlungsarten-Icons == aktive Zahlarten. **Beweis:** Storefront API `paymentSettings`: VISA, MASTERCARD, AMERICAN_EXPRESS + SHOPIFY_PAY, APPLE_PAY, GOOGLE_PAY — exakt diese 6 Chips in `components/payment-icons.tsx` (PDP + Footer, Screenshot `footer-logo.png`).
- [x] Navbar-Konto-Link fuehrt auf erreichbare Shopify-Login-Seite. **Beweis:** Playwright (echter Chrome): finale URL `shopify.com/authentication/100414456182/login...`, "E-Mail-Feld sichtbar: true", Screenshot `account-login.png` (curl bekommt 406-Bot-Schutz, daher Browser-Beweis).
- [x] Variantennamen sauber + Beschreibungen verbessert (Ships-From geloescht, deutsche Namen, echte Groessen, 30 Tage Rueckgabe einheitlich). **Beweis:** `curl -sL https://4mm0ka-ff.myshopify.com/products/<handle>.js` -> "Weiss", "Gruen / 80 x 30 cm", "Hellgrau / S (50 x 40 cm)"; SKUs unveraendert (DSers-Mapping intakt).
- [x] Preise: Vorschlag per AskUserQuestion vorgelegt, Sid-Go erhalten, gesetzt. **Beweis:** gleicher curl -> 14.99 / 17.99-49.99 / 19.99, alle `available: true`.
- [x] `NODE_USE_ENV_PROXY=1 pnpm build` komplett gruen inkl. Prerender. **Beweis:** exit 0, "Generating static pages (12/12)", kein ECONNREFUSED.
- [ ] Live auf Vercel: Deploy-Status gruen, Live-URL HTTP 200, Klick-Flow live verifiziert. **Stand:** Account laut Sid `zapkothimofej-2616` (nicht Thimorrow); Build "Ready" in 39s, aber Public-URL liefert **451 DEPLOYMENT_DISABLED** — Repo wurde dafuer public gemacht (github.com/Thimorrow/frostbreeze), `vercel git connect` blockiert bis Sid im Dashboard die GitHub-Login-Connection anlegt.
- [ ] `live-verifier`-Agent liefert PASS auf der Live-URL. **Stand:** wartet auf funktionierenden Deploy.
- [x] STATE.md aktualisiert. **Beweis:** Abschnitt "In Arbeit: SPEC.md-Umsetzung" mit erledigt/offen-Liste.

## Verifikationsplan (konkrete Befehle/Flows)

1. `git config user.email` pruefen, Baseline committen, `git log -1 --format='%an <%ae>'`.
2. Lokal: `NODE_USE_ENV_PROXY=1 pnpm dev`, Klick-Flow: Home -> PDP -> Variante -> Add-to-Cart -> Drawer -> "Zur Kasse" -> Ziel-URL muss Shopify-Checkout-Host sein.
3. Mobil-Check: Viewport 390px (Browser-Devtools oder Playwright), Sticky-ATC + Galerie-Swipe pruefen.
4. Produktdaten: `curl -s https://4mm0ka-ff.myshopify.com/products/<handle>.js | python3 -c "import sys,json; d=json.load(sys.stdin); print([(v['title'], v['price']) for v in d['variants']])"` vor/nach.
5. Build: `NODE_USE_ENV_PROXY=1 pnpm build` -> muss inkl. Prerender gruen sein.
6. Deploy: `vercel whoami` == Thimorrow, deploy, `curl -sI https://<url>` -> 200, dann `live-verifier`-Agent (PASS/FAIL mit HTTP-Codes).
7. Konto-Link: `curl -sIL https://frostbreeze-store.myshopify.com/account | tail -5` -> finale 200-Antwort, im Browser Login-Formular sichtbar.

## Getroffene Annahmen (explizit markiert)

- ANNAHME: Design-Richtung Sun&Ice bleibt gesetzt (aus STATE.md, Durchgang 1 von Sid nicht beanstandet).
- ANNAHME: Login via Shopifys gehostete Kundenkonten reicht (Sids Bedingung "wenn Login ueber Shopify geht, bleibt Nicht-Scope" -> geht, also nur Link, kein eigener Code).
- ANNAHME: Keine Fake-Reviews wegen UWG-Risiko; echte Reviews spaeter als eigenes Feature.
- ANNAHME: Rechtstexte/SEO/Analytics bewusst ausserhalb dieser Spec (Launch-Readiness wurde im Interview nicht gewaehlt); Rechtstexte bleiben als Pflicht-TODO vor scharfem Verkauf in STATE.md.
- ANNAHME: Produkttexte werden in Shopify (descriptionHtml) verbessert, nicht im Frontend hartkodiert, damit Admin die Quelle der Wahrheit bleibt.
- ANNAHME: Umsetzung standardmaessig ueber glm-worker (Opus plant/reviewt per git diff); Design-Feinschliff mit hoher Geschmacks-Komponente darf die Hauptsession selbst machen, Logo-Auswahl via showcase.
- ANNAHME: Reihenfolge: Baseline-Commit -> Logo -> Design-Durchgang 2 -> Conversion/Trust -> Produktdaten -> Build -> Deploy -> Live-Verifikation.

## Uebergabe (Ausfuehrung in frischer Session)

1. `/clear`
2. Neue Session im Projektordner: `cd ~/Desktop/dropship && claude`
3. Startprompt: `Setze SPEC.md um. Hake am Ende jedes Akzeptanzkriterium mit Beweis ab.`
4. Optional: `/goal alle Akzeptanzkriterien aus SPEC.md erfuellt und belegt`
