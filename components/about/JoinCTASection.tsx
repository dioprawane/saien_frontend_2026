import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JoinCTASection() {
  return (
    <section
      className="relative overflow-hidden bg-[#0b1825] py-20 lg:py-28"
      aria-labelledby="join-cta-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-teal-900/20 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="join-cta-heading"
          className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
        >
          Rejoignez le Nœud
        </h2>
        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Plus qu&apos;une organisation, SAIEN est une communauté vivante de
          chercheurs, développeurs et innovateurs déterminés à façonner
          l&apos;avenir.
        </p>
        <Link
          href="/reseau"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold text-sm px-8 py-3.5 rounded-full"
        >
          Devenir Membre
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
