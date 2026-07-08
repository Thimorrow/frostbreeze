import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-coral">
      <ShoppingCartIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />

      {quantity ? (
        <div className="absolute top-0 right-0 -mt-1.5 -mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
