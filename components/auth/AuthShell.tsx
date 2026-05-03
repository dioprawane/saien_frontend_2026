import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuthShellProps {
  title: string;
  description: string;
  panelLabel: string;
  panelTitle: string;
  panelDescription: string;
  panelPoints: string[];
  children: ReactNode;
}

export default function AuthShell({
  title,
  description,
  panelLabel,
  panelTitle,
  panelDescription,
  panelPoints,
  children,
}: AuthShellProps) {
  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
            <section className="rounded-3xl bg-gradient-to-br from-[#0a2c47] via-[#113e63] to-[#0c4f7d] text-white p-7 sm:p-9 shadow-[0_30px_60px_-35px_rgba(10,37,64,0.9)]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200 mb-3">
                {panelLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                {panelTitle}
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-cyan-50/90 max-w-xl">
                {panelDescription}
              </p>

              <ul className="mt-8 space-y-3">
                {panelPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-cyan-100/95">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 rounded-full bg-brand-green-soft-strong shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-9 shadow-[0_24px_54px_-36px_rgba(15,23,42,0.75)]">
              <h2 className="text-2xl sm:text-[1.85rem] font-extrabold text-[#0A2540] leading-tight">
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>

              <div className="mt-7">{children}</div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


