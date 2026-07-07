# dropship

Dropshipping-Shop auf Shopify. Dieses Repo ist die Wissensbasis zum Shop: wie er aufgebaut ist, wie er funktioniert und was der aktuelle Stand ist. Kein Code-Deploy, reine Steuerungs- und Doku-Ebene (der Shop selbst liegt bei Shopify, die Produktbeschaffung bei DSers).

## Schnellfakten

- Shop: `4mm0ka-ff.myshopify.com` ("Mein Shop")
- Plan: Basic, Waehrung EUR, Markt Deutschland
- Theme: Horizon
- Dropshipping-Tool: **DSers** (AliExpress-Link-Import, gratis)
- Aufbau: Only-Shopify, kein Headless

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
