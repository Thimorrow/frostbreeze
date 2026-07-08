import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import EmptyState from "components/empty-state";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} Produkte`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const [collection, products] = await Promise.all([
    getCollection(params.collection),
    getCollectionProducts({
      collection: params.collection,
      sortKey,
      reverse,
    }),
  ]);

  return (
    <section>
      {collection?.title ? (
        <div className="mb-5">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            {collection.title}
          </h1>
          {collection.description ? (
            <p className="mt-1 max-w-xl text-sm text-pretty text-muted">
              {collection.description}
            </p>
          ) : null}
        </div>
      ) : null}
      {products.length === 0 ? (
        <EmptyState
          title="Diese Kollektion ist noch leer"
          text="Hier gibt es gerade nichts zu sehen — alle Produkte findest du weiterhin im Shop."
        />
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
