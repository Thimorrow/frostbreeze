# Fix: alles zeigte "Ausverkauft"

Gefunden und gefixt 07/2026.

## Root Cause

Der gesamte Bestand lag nur am Standort **dsers-fulfillment-service** (`gid://shopify/Location/118344712566`), der `shipsInventory=false` hat. Bestand an einem Fulfillment-Service-Standort mit `shipsInventory=false` zaehlt fuer den Onlineshop NICHT als lieferbar. Deshalb war `variant.available=false` im Storefront, obwohl der Admin `inventoryQuantity` und sogar Policy CONTINUE meldete. CONTINUE und "untracked" haben es NICHT gefixt (Fulfillment-Service-Override).

## Diagnose-Lektion

Nie nur auf der Admin-Datenebene pruefen. `availableForSale=true` im Admin ist irrefuehrend. Wahrheit ist die Storefront-Sicht:

```
curl -s https://4mm0ka-ff.myshopify.com/products/<handle>.js
```

-> `variants[].available`. Die HTML-Produktseite ist per Cloudflare-Edge stark gecached (etag `page_cache:...`) und flackert beim Umschlagen zwischen Nodes, daher mehrfach pruefen und `.js` bzw. Admin als Quelle nehmen.

## Fix, der wirkt

Bestand am normalen Online-Standort **Shop-Standort** (`gid://shopify/Location/118340747638`, `shipsInventory=true`, `fulfillsOnlineOrders=true`) geben:

1. Varianten `tracked=true` setzen (`productVariantsBulkUpdate` mit `inventoryItem.tracked`).
2. Pro InventoryItem `inventoryActivate(inventoryItemId, locationId: ShopStandort, available: 500)`, als aliaste Mehrfach-Mutation in einem Call.
3. `inventoryPolicy` bleibt CONTINUE als Sicherheitsnetz.

Danach `sellableOnlineQuantity` ~500+, `.js available=true`, HTML-Button "In den Warenkorb legen". Die HTML-Seite ggf. per `productUpdate` (Tag-Aenderung) einen Cache-Bust anstossen.

## Risiko

DSers kann bei der naechsten Auto-Bestandssynchronisierung diesen Fix zuruecksetzen. Deshalb in DSers die automatische Inventar-Aktualisierung abschalten (siehe `dsers.md`), sonst kommt "Ausverkauft" wieder. Bestellungen wickelt DSers weiterhin ab (Order-Sync, nicht ueber den Shopify-Standort).
