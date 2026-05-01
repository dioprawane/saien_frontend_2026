import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MISSIONS } from "@/lib/missions-data";
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Network,
  ShieldCheck,
} from "lucide-react";

const ICON_MAP = {
  GraduationCap,
  Network,
  Handshake,
  ShieldCheck,
};

export async function generateStaticParams() {
  return MISSIONS.map((mission) => ({ slug: mission.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mission = MISSIONS.find((item) => item.slug === slug);

  if (!mission) {
    return { title: "Mission introuvable — SAIEN" };
  }

  return {
    title: `${mission.title} — Mission SAIEN`,
    description: mission.shortDescription,
  };
}

export default async function MissionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = MISSIONS.find((item) => item.slug === slug);

  if (!mission) notFound();

  const Icon = ICON_MAP[mission.iconName];

  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">
        <section className="bg-gradient-to-br from-[#0A2540] via-[#103a60] to-[#0A2540] py-14 lg:py-18 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 text-white/85 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Retour à Vision & Missions
            </Link>

            <div className="mt-8 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-green-soft-strong font-semibold">
                  Mission SAIEN
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
                  {mission.title}
                </h1>
                <p className="mt-4 max-w-3xl text-white/85 leading-relaxed text-base sm:text-lg">
                  {mission.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10">
              <div className="space-y-8">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0A2540] mb-3">
                    Vision de la mission
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{mission.intro}</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0A2540] mb-4">
                    Axes stratégiques
                  </h2>
                  <ul className="space-y-3">
                    {mission.strategicAxes.map((axis) => (
                      <li key={axis} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{axis}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0A2540] mb-4">
                    Programmes phares
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mission.flagshipPrograms.map((program) => (
                      <div
                        key={program}
                        className="rounded-xl border border-slate-100 bg-brand-surface p-4 text-sm text-slate-700"
                      >
                        {program}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-24 h-max">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-3">
                    Impacts attendus
                  </h3>
                  <ul className="space-y-3">
                    {mission.impactTargets.map((impact) => (
                      <li key={impact} className="text-sm text-slate-600 leading-relaxed">
                        • {impact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0A2540] rounded-2xl p-6 text-white">
                  <p className="text-sm text-white/80 mb-4">
                    Vous souhaitez contribuer à cette mission ?
                  </p>
                  <Link
                    href="/rejoindre"
                    className="inline-flex items-center justify-center w-full rounded-xl bg-brand-green hover:bg-brand-green-hover transition-colors font-semibold py-3"
                  >
                    Rejoindre la mission
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

