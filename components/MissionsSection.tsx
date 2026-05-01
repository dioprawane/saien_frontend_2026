import { GraduationCap, Network, Handshake, ShieldCheck } from "lucide-react";
import MissionCard from "@/components/MissionCard";
import { MISSIONS } from "@/lib/missions-data";

const ICON_MAP = {
  GraduationCap,
  Network,
  Handshake,
  ShieldCheck,
};

export default function MissionsSection() {
  return (
    <section
      id="missions"
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="missions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <h2
            id="missions-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Nos Missions Fondamentales
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Quatre piliers stratégiques pour structurer et accélérer le
            développement de l&apos;intelligence artificielle en Afrique.
          </p>
        </div>

        {/* Grille */}
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
  );
}

