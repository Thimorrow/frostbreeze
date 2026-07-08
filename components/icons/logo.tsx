import clsx from "clsx";

/**
 * Frostbreeze "Solstice"-Mark: links Sonnenstrahlen (warm),
 * rechts Schneeflocken-Arme (eisblau) — Sun & Ice in einem Zeichen.
 *
 * `mono`: einfarbig über currentColor (für OG-Image/Satori, das
 * SVG-Gradienten mit url()-Referenzen nicht zuverlässig rendert).
 */
export default function LogoIcon({
  mono = false,
  ...props
}: { mono?: boolean } & React.ComponentProps<"svg">) {
  const warm = mono ? "currentColor" : "url(#fb-warm)";
  const ice = mono ? "currentColor" : "url(#fb-ice)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME || "Frostbreeze"} Logo`}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
      className={clsx("h-4 w-4", props.className)}
    >
      {!mono ? (
        <defs>
          <linearGradient
            id="fb-warm"
            x1="4"
            y1="4"
            x2="40"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffd23f" />
            <stop offset="0.55" stopColor="#ff9f1c" />
            <stop offset="1" stopColor="#ff5a36" />
          </linearGradient>
          <linearGradient
            id="fb-ice"
            x1="24"
            y1="12"
            x2="42"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#6fc7ff" />
            <stop offset="1" stopColor="#1e6fa8" />
          </linearGradient>
        </defs>
      ) : null}

      {/* Kern: links warm, rechts eisig */}
      <path d="M24 13a11 11 0 0 0 0 22Z" fill={warm} />
      <path d="M24 13a11 11 0 0 1 0 22Z" fill={ice} />

      {/* Sonnenstrahlen (links) */}
      <g stroke={warm} strokeWidth={3.6} strokeLinecap="round">
        <path d="M24 8V3" />
        <path d="M12.7 12.7 9.2 9.2" />
        <path d="M8 24H3" />
        <path d="M12.7 35.3 9.2 38.8" />
      </g>

      {/* Schneeflocken-Arme (rechts) */}
      <g stroke={ice} strokeWidth={3} strokeLinecap="round">
        <path d="M24 40v5.5" />
        <path d="M24 42.6l-2.7 2.1" />
        <path d="M24 42.6l2.7 2.1" />
        <path d="M40 24h5.5" />
        <path d="M42.6 24l2.1-2.7" />
        <path d="M42.6 24l2.1 2.7" />
        <path d="M35.3 35.3l3.9 3.9" />
        <path d="M37.7 37.7l-.3 3" />
        <path d="M37.7 37.7l3-.3" />
        <path d="M35.3 12.7l3.9-3.9" />
        <path d="M37.7 10.3l-.3-3" />
        <path d="M37.7 10.3l3 .3" />
      </g>
    </svg>
  );
}
