import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="bg-white pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-hover font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Notre Vision
          </Link>
        </nav>

        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            <span className="text-[#0e3a2f]">Connecter l&apos;intelligence</span>
            <br />
            <span className="text-brand-green">sans frontières.</span>
          </h1>
          <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
            SAIEN est le pont technologique entre la diaspora africaine et
            l&apos;écosystème de l&apos;intelligence artificielle mondial,
            favorisant l&apos;innovation et l&apos;excellence par la
            collaboration.
          </p>
        </div>
      </div>
    </section>
  );
}
