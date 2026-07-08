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

- [ ] Baseline-Commit des Redesign-Stands existiert vor Beginn von Durchgang 2; alle Commits mit Identitaet Thimorrow (`git log --format='%ae'` enthaelt nur `292338461+Thimorrow@users.noreply.github.com`).
- [ ] Neues SVG-Logo in `components/icons/logo.tsx` + `logo-square.tsx` (keine generische Schneeflocke), Favicon aktualisiert; von Sid per showcase-Auswahl bestaetigt. Beweis: Screenshot Navbar + Browser-Tab.
- [ ] PDP `/product/pocketbreeze` (und die 2 anderen Handles) im Sun&Ice-Look: Galerie, Variantenwahl, USP-Bullets, Versand-/Rueckgabe-Hinweis, Zahlungsarten-Icons. Beweis: Screenshot Desktop + Mobil.
- [ ] Mobil (<= 640px) zeigt die PDP einen Sticky-Add-to-Cart; Klick fuegt Variante hinzu und oeffnet den Drawer.
- [ ] `/search` und `/search/<collection>` im neuen Look; Filter/Sortierung funktionieren; Leer-Zustand gestaltet.
- [ ] Cart-Drawer im neuen Look: Menge aendern, Item loeschen, Zwischensumme korrekt, "Zur Kasse" fuehrt auf Shopify-Checkout-URL.
- [ ] Homepage-Hero/Features zeigen echte Produktbilder von `cdn.shopify.com`. Beweis: `curl -s localhost:3000 | grep -o 'cdn.shopify.com[^"]*' | head`.
- [ ] Gezeigte Zahlungsarten-Icons stimmen mit den im Shopify-Checkout aktiven Zahlarten ueberein (Nachweis: Liste der aktiven Zahlarten + Screenshot Footer/PDP).
- [ ] Navbar-Konto-Link fuehrt auf eine erreichbare Shopify-Login-Seite (finaler Response 200 mit Login-Formular).
- [ ] Variantennamen in Shopify sind sauber (Stichprobe alle 3 Produkte via `curl -s https://4mm0ka-ff.myshopify.com/products/<handle>.js`), Produktbeschreibungen verbessert.
- [ ] Preise: Vorschlag wurde Sid vorgelegt; nach Go sind sie gesetzt und im Storefront sichtbar (gleicher curl-Beweis). Ohne Go: Vorschlag in STATE.md dokumentiert.
- [ ] `NODE_USE_ENV_PROXY=1 pnpm build` laeuft lokal komplett gruen durch (inkl. Prerender, kein ECONNREFUSED-Abbruch).
- [ ] Live auf Vercel (Account Thimorrow): Deploy-Status gruen (nicht BLOCKED/ERROR), `curl -sI https://<projekt>.vercel.app` -> HTTP 200; Klick-Flow live (Home -> PDP -> Add-to-Cart -> Drawer -> Checkout-Weiterleitung) verifiziert.
- [ ] `live-verifier`-Agent liefert PASS mit Evidenz auf der Live-URL (unabhaengiger Gatekeeper).
- [ ] STATE.md aktualisiert (erledigte Punkte abgehakt, verbleibende TODOs wie Rechtstexte/DSers-Sync dokumentiert).

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
