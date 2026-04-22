import { GraduationCap, Network, Handshake, ShieldCheck } from "lucide-react";
import MissionCard from "@/components/MissionCard";

const MISSIONS = [
  {
    icon: GraduationCap,
    title: "Formation",
    description:
      "Développer les compétences locales à travers des programmes d'excellence en data science, machine learning et ingénierie IA.",
    href: "#",
  },
  {
    icon: Network,
    title: "Réseau Diaspora",
    description:
      "Connecter les talents africains de la diaspora mondiale pour faciliter le transfert de connaissances et le mentorat.",
    href: "#",
  },
  {
    icon: Handshake,
    title: "Partenariats",
    description:
      "Créer des synergies entre universités, entreprises tech et institutions publiques pour financer et soutenir l'innovation.",
    href: "#",
  },
  {
    icon: ShieldCheck,
    title: "IA Responsable",
    description:
      "Promouvoir une intelligence artificielle éthique, non biaisée et adaptée aux contextes culturels et économiques locaux.",
    href: "#",
  },
];

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
          {MISSIONS.map((mission) => (
            <MissionCard key={mission.title} {...mission} />
          ))}
        </div>
      </div>
    </section>
  );
}
