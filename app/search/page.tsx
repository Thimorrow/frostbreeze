import EmptyState from "components/empty-state";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Alle Frostbreeze Sommer-Essentials im Überblick.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length === 1 ? "Ergebnis" : "Ergebnisse";

  return (
    <>
      {searchValue ? (
        <p className="mb-5 text-sm text-muted">
          {products.length === 0
            ? "Keine Produkte gefunden für "
            : `${products.length} ${resultsText} für `}
          <span className="font-bold text-foreground">
            &quot;{searchValue}&quot;
          </span>
        </p>
      ) : (
        <h1 className="font-display mb-5 text-2xl font-extrabold tracking-tight text-foreground">
          Alle Produkte
        </h1>
      )}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <EmptyState
          title={searchValue ? "Nichts gefunden" : "Hier ist es noch leer"}
          text={
            searchValue
              ? "Für deine Suche gibt es gerade kein Ergebnis. Probier einen anderen Begriff oder stöbere durch alle Produkte."
              : "Schau gleich nochmal vorbei — die Sommer-Essentials sind unterwegs."
          }
        />
      )}
    </>
  );
}
