# DSers — Dropshipping-Workflow

DSers ist das verbundene Dropshipping-Tool. Entscheidung: dabei bleiben (keine Alternative-App), weil es schon eingerichtet ist, den AliExpress-Link-Import macht und gratis ist.

## Was DSers macht

- AliExpress-Produkte per Link importieren.
- Den echten Lieferantenbestand in den Shopify-Standort "dsers-fulfillment-service" synchronisieren.
- Bestellungen abwickeln: Kunde kauft im Shop -> DSers synchronisiert die Bestellung -> Bestellung wird beim AliExpress-Lieferanten ausgeloest. Das laeuft ueber Order-Sync, unabhaengig vom Shopify-Bestandsstandort.

## Die eine wichtige Einstellung: Auto-Bestandssync abschalten

Damit DSers den Verfuegbarkeits-Fix (500 am Shop-Standort) nicht bei der naechsten Synchronisierung ueberschreibt und "Ausverkauft" nicht zurueckkommt:

1. In DSers oben rechts auf **Setting** (Einstellungen).
2. Reiter **Inventory** (Bestand).
3. Bei "wenn sich der AliExpress-Bestand aendert" auf **"Do nothing"** (Nichts tun) statt "automatisch aktualisieren".
4. Speichern.

Die genauen Menue-Namen koennen bei DSers leicht abweichen. Bei Unsicherheit Screenshot der DSers-Einstellungen machen und in der Claude-Session zeigen lassen.

Bestellungen werden dadurch NICHT beeintraechtigt, die laufen weiter ueber Order-Sync.
