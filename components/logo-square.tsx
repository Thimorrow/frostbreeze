import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center rounded-xl border border-line bg-surface shadow-sm",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        },
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[26px] w-[26px]": !size,
          "h-[18px] w-[18px]": size === "sm",
        })}
      />
    </div>
  );
}
