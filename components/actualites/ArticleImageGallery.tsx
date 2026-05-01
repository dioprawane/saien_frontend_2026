"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ArticleImage } from "@/lib/articles-data";

interface ArticleImageGalleryProps {
  images: ArticleImage[];
  galleryId: string;
}

export default function ArticleImageGallery({
  images,
  galleryId,
}: ArticleImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const hasMultiple = images.length > 1;
  const activeImage = useMemo(() => images[activeIndex], [images, activeIndex]);

  const openAt = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" && hasMultiple) goPrev();
      if (event.key === "ArrowRight" && hasMultiple) goNext();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, hasMultiple]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <figure key={`${galleryId}-${image.src}-${image.alt}`}>
            <button
              type="button"
              onClick={() => openAt(index)}
              className="group relative h-52 w-full overflow-hidden rounded-xl border border-slate-200 bg-brand-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label={`Ouvrir l'image ${index + 1} dans la galerie`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain object-center p-1"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </button>
            {image.caption && (
              <figcaption className="mt-2 text-xs text-slate-500 leading-relaxed">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {isOpen && activeImage && (
        <div
          className="fixed inset-0 z-[80] bg-slate-950/85 backdrop-blur-sm p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de galerie"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="fixed right-4 top-4 z-[90] inline-flex items-center gap-1.5 rounded-lg border border-white/35 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            aria-label="Fermer la visionneuse"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Fermer
          </button>

          <div
            className="mx-auto flex h-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full">
              <div className="relative h-[62vh] sm:h-[72vh] overflow-hidden rounded-2xl border border-white/20 bg-slate-900/80">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-contain object-center p-2"
                  sizes="100vw"
                />
              </div>

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-slate-900/40 text-white transition-colors hover:bg-slate-900/70"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-slate-900/40 text-white transition-colors hover:bg-slate-900/70"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}

              <div className="mt-4 flex flex-col gap-2 text-white">
                <p className="text-sm font-semibold">
                  {activeIndex + 1} / {images.length} · {activeImage.alt}
                </p>
                {activeImage.caption && (
                  <p className="text-xs text-slate-200 leading-relaxed">{activeImage.caption}</p>
                )}
              </div>

              {hasMultiple && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {images.map((image, index) => (
                    <button
                      key={`${galleryId}-thumb-${image.src}-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-colors ${
                        activeIndex === index
                          ? "border-brand-green-soft-strong"
                          : "border-white/25 hover:border-white/45"
                      }`}
                      aria-label={`Afficher l'image ${index + 1}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain object-center p-0.5"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


