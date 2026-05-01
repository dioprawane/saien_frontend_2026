import { Users2, Globe, Layers } from "lucide-react";

const BENEFITS = [
  {
    icon: Users2,
    title: "Réseau d'Experts",
    description:
      "Accès exclusif à l'annuaire des membres et aux groupes de travail spécialisés en IA.",
  },
  {
    icon: Globe,
    title: "Ressources IA",
    description:
      "Webinaires mensuels, publications techniques et veille technologique internationale.",
  },
  {
    icon: Layers,
    title: "Impact Global",
    description:
      "Participez à des projets structurants et contribuez au développement technologique.",
  },
];

export default function AdhesionHero() {
  return (
    <section className="bg-white pt-16 pb-20" aria-labelledby="adhesion-hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1
            id="adhesion-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
          >
            Rejoignez le réseau{" "}
            <span className="text-brand-green">SAIEN</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Connectez-vous à la diaspora de l&apos;intelligence artificielle.
            Accélérez vos projets, partagez vos connaissances et participez à
            l&apos;innovation technologique internationale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-brand-surface rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-green-soft flex items-center justify-center">
                <Icon className="w-6 h-6 text-brand-green" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-slate-900 text-sm">{title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


