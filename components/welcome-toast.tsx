"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("❄️ Willkommen bei Frostbreeze!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Frische Sommer-Essentials gegen die Hitze.{" "}
            <a
              href="/search"
              className="font-semibold text-coral hover:underline"
            >
              Jetzt entdecken
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
