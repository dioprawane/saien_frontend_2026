import { Star, Users, Globe, Heart } from "lucide-react";

const FONDATIONS = [
  {
    icon: Star,
    title: "Excellence",
    description:
      "Promouvoir une expertise sénégalaise rigoureuse, reconnue à l'international en IA, Data et Cybersécurité.",
  },
  {
    icon: Users,
    title: "Inclusion",
    description:
      "Vulgariser l'IA et la rendre accessible à tous : étudiants, jeunes, professionnels en reconversion.",
  },
  {
    icon: Globe,
    title: "Impact",
    description:
      "Accompagner des projets concrets qui répondent aux défis du Sénégal, de l'Afrique et du monde.",
  },
  {
    icon: Heart,
    title: "Solidarité",
    description:
      "Faire de l'entraide, du mentorat et du transfert de compétences le ciment de notre communauté.",
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
              className="bg-brand-surface rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green-soft flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-green" aria-hidden="true" />
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
