import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="glass flex items-center rounded-full border border-line p-1 text-xs font-semibold text-foreground shadow-sm">
        <h3 className="mr-4 line-clamp-2 grow pl-3 leading-tight tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-coral px-3 py-2 font-bold text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
