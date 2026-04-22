import { Linkedin } from "lucide-react";

interface BureauMember {
  name: string;
  role: string;
  badge?: "Fondateur" | "Nouveau";
  bio: string;
  initials: string;
}

const BUREAU: BureauMember[] = [
  {
    name: "Amadou Diallo",
    role: "Président",
    badge: "Fondateur",
    bio: "Expert en Machine Learning avec plus de 15 ans d'expérience dans l'écosystème tech franco-africain.",
    initials: "AD",
  },
  {
    name: "Fatou Sow",
    role: "Vice-Présidente",
    badge: "Fondateur",
    bio: "Directrice de la stratégie Data et IA, spécialiste de l'Afrique dans les politiques numériques internationales.",
    initials: "FS",
  },
  {
    name: "Jean-Marc Kone",
    role: "Secrétaire Général",
    bio: "Architecte Cloud et spécialiste en infrastructure de données pour les systèmes distribués à grande échelle.",
    initials: "JK",
  },
  {
    name: "Awa Ndiaye",
    role: "Trésorière",
    badge: "Nouveau",
    bio: "Analyste financière et experte en levée de fonds pour les startups deep tech en Afrique subsaharienne.",
    initials: "AN",
  },
];

export default function BureauSection() {
  return (
    <section
      className="bg-slate-50 py-20 lg:py-28"
      aria-labelledby="bureau-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">
            Gouvernance
          </p>
          <h2
            id="bureau-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4"
          >
            Le Bureau SAIEN
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Découvrez l&apos;équipe dirigeante qui façonne l&apos;avenir de
            notre réseau. Des experts passionnés par l&apos;intelligence
            artificielle, dédiés à l&apos;innovation et au rayonnement de la
            diaspora.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUREAU.map((member) => (
            <div
              key={member.name}
              className="relative bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {member.badge && (
                <span
                  className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.badge === "Fondateur"
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}
                >
                  {member.badge}
                </span>
              )}

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                {member.initials}
              </div>

              <div>
                <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                <p className="text-emerald-500 text-xs font-medium mt-0.5">
                  {member.role}
                </p>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                {member.bio}
              </p>

              <a
                href="#"
                aria-label={`LinkedIn de ${member.name}`}
                className="mt-auto w-7 h-7 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center justify-center text-slate-500"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
