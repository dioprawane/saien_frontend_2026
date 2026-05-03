import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MISSIONS } from "../../../lib/missions-data";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Construction,
  Globe2,
  GraduationCap,
  Handshake,
  Network,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const ICON_MAP = {
  BookOpen,
  Globe2,
  GraduationCap,
  Network,
  Handshake,
  Rocket,
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
                    Programmes & Initiatives
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
                      <li
                        key={impact}
                        className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-brand-green mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-3">
                    Comment contribuer
                  </h3>
                  <ul className="space-y-3">
                    {mission.contributeActions.map((action) => (
                      <li
                        key={action}
                        className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                      >
                        <ArrowRight
                          className="w-4 h-4 text-brand-green mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-[#1c1e22] px-6 py-7 sm:px-8 sm:py-9 text-slate-100 shadow-lg">
              <div className="relative space-y-5">
                <p className="inline-flex items-center gap-2.5 text-xl sm:text-2xl font-semibold tracking-tight">
                  <Construction
                    className="w-5 h-5 text-brand-green-soft-strong shrink-0"
                    aria-hidden="true"
                  />
                  <span>Cette mission est en construction.</span>
                </p>

                <p className="max-w-4xl text-sm sm:text-base leading-relaxed text-slate-300">
                  SAIEN est une jeune association fondée fin 2025. Nos
                  programmes et initiatives prennent forme grâce à
                  l&apos;engagement de chacun.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-lg sm:text-xl font-semibold">
                    Vous voulez contribuer à cette mission ?
                  </p>
                  <Link
                    href="/rejoindre"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Nous rejoindre
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

