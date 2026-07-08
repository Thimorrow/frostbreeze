import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import { Hero } from "components/hero";
import Footer from "components/layout/footer";
import type { Metadata } from "next";

export const experimental_ppr = true;

export const metadata: Metadata = {
  description:
    "Frostbreeze: Ventilator, Kühl-Handtuch und Haustier-Kühlmatte. Frische Sommer-Essentials, direkt geliefert.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
