"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🛍️ Willkommen bei Next.js Commerce!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Das ist eine performante, SSR-basierte Storefront, angetrieben von
            Shopify, Next.js und Vercel.{" "}
            <a
              href="https://vercel.com/templates/next.js/nextjs-commerce"
              className="text-cyan-600 hover:underline"
              target="_blank"
            >
              Erstelle deine eigene
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
