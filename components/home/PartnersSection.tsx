"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const PARTNERS = Array.from({ length: 7 }, (_, index) => ({
  id: `saien-logo-${index + 1}`,
}));

const LOOPED_PARTNERS = [...PARTNERS, ...PARTNERS];

interface PointerState {
  isDown: boolean;
  startX: number;
  startScrollLeft: number;
}

export default function PartnersSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const pointerStateRef = useRef<PointerState>({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let rafId = 0;
    const speed = 0.45;

    const tick = () => {
      if (!isPaused && !pointerStateRef.current.isDown) {
        rail.scrollLeft += speed;
        if (rail.scrollLeft >= rail.scrollWidth / 2) {
          rail.scrollLeft = 0;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isPaused]);

  const stopDragging = (pointerId?: number) => {
    const rail = railRef.current;
    if (!rail) return;

    if (pointerId !== undefined && rail.hasPointerCapture(pointerId)) {
      rail.releasePointerCapture(pointerId);
    }

    pointerStateRef.current.isDown = false;
    setIsPaused(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    pointerStateRef.current = {
      isDown: true,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
    };

    setIsPaused(true);
    rail.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !pointerStateRef.current.isDown) return;

    const delta = event.clientX - pointerStateRef.current.startX;
    rail.scrollLeft = pointerStateRef.current.startScrollLeft - delta;
  };

  return (
    <section
      className="py-12 lg:py-16 bg-brand-surface border-y border-slate-100"
      aria-label="Nos partenaires"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-8">
          Ils soutiennent notre mission
        </p>

        <div
          ref={railRef}
          className="overflow-x-auto cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => stopDragging(event.pointerId)}
          onPointerCancel={(event) => stopDragging(event.pointerId)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!pointerStateRef.current.isDown) {
              setIsPaused(false);
            }
          }}
        >
          <ul className="flex w-max items-center gap-4 pr-4 sm:gap-5 lg:gap-6 lg:pr-6">
            {LOOPED_PARTNERS.map((partner, index) => (
              <li key={`${partner.id}-${index}`} className="shrink-0">
                <span className="flex h-16 w-[192px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 shadow-sm">
                  <span className="relative h-10 w-[126px]">
                    <Image
                      src="/logos/New_logo_saien.svg"
                      alt="Logo SAIEN"
                      fill
                      sizes="126px"
                      className="object-contain"
                    />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
