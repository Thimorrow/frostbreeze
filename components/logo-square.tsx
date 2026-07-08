import clsx from "clsx";
import LogoIcon from "./icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center bg-gradient-to-br from-amber via-coral to-coral-deep text-white shadow-[0_6px_16px_-6px_var(--color-coral)]",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        },
      )}
    >
      <LogoIcon
        className={clsx({
          "h-[18px] w-[18px]": !size,
          "h-[12px] w-[12px]": size === "sm",
        })}
      />
    </div>
  );
}
