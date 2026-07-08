"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      const setSeenCookie = () => {
        document.cookie = "welcome-toast=2; max-age=31536000; path=/";
      };
      // Endlicher Timer statt Infinity: der Toast lag sonst dauerhaft
      // über dem "Zur Kasse"-Button im Cart-Drawer und blockierte Klicks.
      toast("❄️ Willkommen bei Frostbreeze!", {
        id: "welcome-toast",
        duration: 8000,
        onDismiss: setSeenCookie,
        onAutoClose: setSeenCookie,
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
