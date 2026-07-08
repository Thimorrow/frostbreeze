import Grid from "components/grid";

export default function Loading() {
  return (
    <>
      <div className="mb-5 h-8 w-40 animate-pulse rounded-full bg-surface-2" />
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return (
              <Grid.Item
                key={index}
                className="animate-pulse rounded-2xl border border-line bg-surface-2"
              />
            );
          })}
      </Grid>
    </>
  );
}
