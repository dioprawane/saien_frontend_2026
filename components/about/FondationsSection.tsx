import { Star, Users, Globe, Heart } from "lucide-react";

const FONDATIONS = [
  {
    icon: Star,
    title: "Excellence",
    description:
      "Poursuivre rigoureusement la qualité technique et scientifique dans chaque projet d'IA que nous accompagnons.",
  },
  {
    icon: Users,
    title: "Inclusion",
    description:
      "Démocratisation de l'accès aux technologies de pointe et valorisation de la diversité des talents.",
  },
  {
    icon: Globe,
    title: "Impact",
    description:
      "Développement de solutions tangibles répondant aux enjeux socio-économiques spécifiques au continent.",
  },
  {
    icon: Heart,
    title: "Solidarité",
    description:
      "Création d'un écosystème d'entraide où le transfert de compétences prime sur la compétition.",
  },
];

export default function FondationsSection() {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-labelledby="fondations-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="fondations-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Nos Fondations
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Les principes qui guident chaque nœud de notre réseau.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FONDATIONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
