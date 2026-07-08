const chip =
  "h-[26px] w-auto rounded-[5px] shadow-[0_0_0_1px_rgba(25,20,16,0.1)]";

/**
 * Nur Zahlarten, die im Shopify-Checkout wirklich aktiv sind
 * (Storefront API `shop.paymentSettings`, Stand 08.07.2026):
 * VISA, MASTERCARD, AMERICAN_EXPRESS + SHOPIFY_PAY, APPLE_PAY, GOOGLE_PAY.
 */
export default function PaymentIcons({ className }: { className?: string }) {
  return (
    <ul className={className} aria-label="Akzeptierte Zahlungsarten">
      <li>
        <svg className={chip} viewBox="0 0 40 26" aria-label="Visa" role="img">
          <rect width="40" height="26" rx="5" fill="#fff" />
          <text
            x="20"
            y="17.5"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="10.5"
            fontWeight="800"
            fontStyle="italic"
            fill="#1a1f71"
            letterSpacing="0.5"
          >
            VISA
          </text>
        </svg>
      </li>
      <li>
        <svg
          className={chip}
          viewBox="0 0 40 26"
          aria-label="Mastercard"
          role="img"
        >
          <rect width="40" height="26" rx="5" fill="#fff" />
          <circle cx="16.5" cy="13" r="7" fill="#eb001b" />
          <circle cx="23.5" cy="13" r="7" fill="#f79e1b" />
          <path d="M20 7.3a7 7 0 0 1 0 11.4 7 7 0 0 1 0-11.4Z" fill="#ff5f00" />
        </svg>
      </li>
      <li>
        <svg
          className={chip}
          viewBox="0 0 40 26"
          aria-label="American Express"
          role="img"
        >
          <rect width="40" height="26" rx="5" fill="#006fcf" />
          <text
            x="20"
            y="17"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="9"
            fontWeight="800"
            fill="#fff"
            letterSpacing="0.4"
          >
            AMEX
          </text>
        </svg>
      </li>
      <li>
        <svg
          className={chip}
          viewBox="0 0 46 26"
          aria-label="Shop Pay"
          role="img"
        >
          <rect width="46" height="26" rx="5" fill="#5a31f4" />
          <text
            x="23"
            y="17"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="9"
            fontWeight="800"
            fill="#fff"
          >
            shop
          </text>
        </svg>
      </li>
      <li>
        <svg
          className={chip}
          viewBox="0 0 52 26"
          aria-label="Apple Pay"
          role="img"
        >
          <rect width="52" height="26" rx="5" fill="#191410" />
          <text
            x="26"
            y="16.5"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="8.5"
            fontWeight="700"
            fill="#fff"
          >
            Apple Pay
          </text>
        </svg>
      </li>
      <li>
        <svg
          className={chip}
          viewBox="0 0 46 26"
          aria-label="Google Pay"
          role="img"
        >
          <rect width="46" height="26" rx="5" fill="#fff" />
          <text
            x="23"
            y="17"
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="10"
            fontWeight="700"
            fill="#3c4043"
          >
            G Pay
          </text>
        </svg>
      </li>
    </ul>
  );
}
