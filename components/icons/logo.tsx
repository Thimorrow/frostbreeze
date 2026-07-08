import clsx from "clsx";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={clsx("h-4 w-4 text-current", props.className)}
    >
      {/* Frostbreeze snowflake */}
      <path d="M16 3v26" />
      <path d="M4.74 9.5 27.26 22.5" />
      <path d="M27.26 9.5 4.74 22.5" />
      <path d="M16 3l-3 3M16 3l3 3M16 29l-3-3M16 29l3-3" />
      <path d="M4.74 9.5l.1 4.2M4.74 9.5l4.1-1M27.26 22.5l-.1-4.2M27.26 22.5l-4.1 1" />
      <path d="M27.26 9.5l-4.1 1M27.26 9.5l-.1 4.2M4.74 22.5l4.1-1M4.74 22.5l.1-4.2" />
    </svg>
  );
}
