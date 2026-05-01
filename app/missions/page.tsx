import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MissionCard from "@/components/MissionCard";
import { MISSIONS } from "@/lib/missions-data";
import { GraduationCap, Handshake, Network, ShieldCheck } from "lucide-react";

const ICON_MAP = {
  GraduationCap,
  Network,
  Handshake,
  ShieldCheck,
};

export const metadata: Metadata = {
  title: "Nos Missions — SAIEN",
  description:
    "Explorez en détail les missions fondamentales de SAIEN pour accélérer l'innovation IA en Afrique.",
};

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">
        <section className="py-14 lg:py-20" aria-labelledby="missions-page-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 lg:mb-12">
              <h1
                id="missions-page-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] leading-tight"
              >
                Nos Missions Fondamentales
              </h1>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Quatre axes stratégiques guident notre action pour bâtir un
                écosystème IA utile, inclusif et durable en Afrique.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MISSIONS.map((mission) => {
                const Icon = ICON_MAP[mission.iconName];
                return (
                  <MissionCard
                    key={mission.slug}
                    icon={Icon}
                    title={mission.title}
                    description={mission.shortDescription}
                    href={`/missions/${mission.slug}`}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


