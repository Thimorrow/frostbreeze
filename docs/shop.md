# Shop-Entities

Alle IDs und Fakten zum Shop `4mm0ka-ff.myshopify.com`. Diese IDs sind stabil und die Grundlage fuer jede API-/MCP-Aenderung.

## Shop

- Domain: `4mm0ka-ff.myshopify.com`
- Plan: Basic
- Waehrung: EUR
- Markt: Deutschland
- Theme: Horizon

## Produkte

### PocketBreeze (Mini-Ventilator)
- Product-ID: `gid://shopify/Product/15799805215094`
- 4 Varianten: White / Black / Blue / Pink
- Preis: 19,99 EUR

### ChillTowel (Kuehl-Handtuch)
- Product-ID: `gid://shopify/Product/15799847977334`
- 7 Varianten: Silikonfarben, 30x80 cm
- Preis: 15,14 EUR

### CoolPaws (Kuehlmatte fuer Haustiere)
- Product-ID: `gid://shopify/Product/15799848534390`
- 24 Varianten: Farben x Groessen
- Preis: 18,09 - 49,59 EUR

## Standorte (Locations) — wichtig fuer Verfuegbarkeit

### Shop-Standort
- Location-ID: `gid://shopify/Location/118340747638`
- `isActive`, `shipsInventory=true`, `fulfillsOnlineOrders=true`
- **Das ist der Standort, der fuer den Onlineshop als lieferbar zaehlt.** Hier liegt der (synthetische) Verfuegbarkeitsbestand (500 pro Variante), der die Produkte kaufbar macht.

### dsers-fulfillment-service
- Location-ID: `gid://shopify/Location/118344712566`
- `isActive`, `shipsInventory=false`, `fulfillsOnlineOrders=true`
- Hier haelt DSers den echten AliExpress-Lieferantenbestand. Bestand hier zaehlt fuer den Storefront NICHT als lieferbar (deshalb das alte "Ausverkauft", siehe ausverkauft-fix.md).

## Bestands-Modell (Dropshipping)

Der Shop besitzt keinen eigenen Lagerbestand. Die 500 pro Variante am Shop-Standort sind ein reiner Verfuegbarkeits-Puffer, damit die Produkte kaufbar sind. Der echte Lieferantenbestand liegt bei DSers am dsers-fulfillment-service-Standort. Bestellungen werden von DSers ueber die Bestell-Synchronisierung abgewickelt, nicht ueber den Shopify-Standort.
