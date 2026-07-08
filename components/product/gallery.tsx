"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const arrowClassName =
    "glass flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground shadow-sm transition-[opacity,scale] duration-200 hover:text-coral active:scale-[0.96] md:opacity-0 md:group-hover/gallery:opacity-100";

  return (
    <div>
      {/* Mobil: wischbare Scroll-Snap-Galerie */}
      <div
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
        aria-label="Produktbilder"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className={
              images.length > 1
                ? "relative aspect-square w-[86%] flex-none snap-center overflow-hidden rounded-2xl border border-line bg-surface"
                : "relative aspect-square w-full flex-none overflow-hidden rounded-2xl border border-line bg-surface"
            }
          >
            <Image
              className="h-full w-full object-contain p-4"
              fill
              sizes="86vw"
              alt={image.altText || "Produktbild"}
              src={image.src}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Hauptbild + Thumbnails */}
      <form className="group/gallery hidden md:block">
        <div className="relative aspect-square max-h-[560px] w-full overflow-hidden rounded-3xl border border-line bg-surface">
          {images[imageIndex] && (
            <Image
              className="h-full w-full object-contain p-8"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />
          )}

          {images.length > 1 ? (
            <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
              <button
                formAction={() => updateImage(previousImageIndex.toString())}
                aria-label="Vorheriges Produktbild"
                className={arrowClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <button
                formAction={() => updateImage(nextImageIndex.toString())}
                aria-label="Nächstes Produktbild"
                className={arrowClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          ) : null}
        </div>

        {images.length > 1 ? (
          <ul className="mt-4 flex items-center gap-2.5">
            {images.map((image, index) => {
              const isActive = index === imageIndex;

              return (
                <li key={image.src} className="h-20 w-20">
                  <button
                    formAction={() => updateImage(index.toString())}
                    aria-label={`Produktbild ${index + 1} anzeigen`}
                    className="h-full w-full"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </form>
    </div>
  );
}
