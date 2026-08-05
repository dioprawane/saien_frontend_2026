import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Membre Actif",
    subtitle: "Pour les professionnels et chercheurs.",
    price: "10",
    features: [
      "Accès complet à l'annuaire",
      "Participation aux groupes de travail",
      "Droit de vote aux AG",
      "Accès aux webinaires exclusifs",
    ],
    cta: "Sélectionner Actif",
    featured: false,
  },
  {
    name: "Membre Bienfaiteur",
    subtitle: "Pour soutenir activement l'ONG.",
    price: "Libre",
    features: [
      "Tous les avantages Actif",
      "Mention sur la page des partenaires",
      "Invitations VIP aux événements",
      "Rapport d'impact annuel détaillé",
    ],
    cta: "Devenir Bienfaiteur",
    featured: true,
  },
];

export default function TarifsSection() {
  return (
    <section className="bg-brand-surface py-20 lg:py-28" aria-labelledby="tarifs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            id="tarifs-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Choisissez votre statut
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Des formules adaptées à votre niveau d&apos;engagement dans le
            réseau.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 ${
                plan.featured
                  ? "bg-[#0b1825] text-white shadow-2xl"
                  : "bg-white border border-slate-100 text-slate-900"
              }`}
            >
              {plan.featured && (
                <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green text-white">
                  RECOMMANDÉ
                </span>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={`font-extrabold text-lg ${
                      plan.featured ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.name}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      plan.featured ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-1">
                <span
                  className={`text-4xl font-extrabold ${
                    plan.featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.price}€
                </span>
                <span
                  className={`text-sm mb-1 ${
                    plan.featured ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  / an
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="w-4 h-4 text-brand-green shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span
                      className={plan.featured ? "text-slate-200" : "text-slate-600"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto w-full py-3 rounded-full font-semibold text-sm transition-all ${
                  plan.featured
                    ? "bg-brand-green hover:bg-brand-green-hover text-white"
                    : "border border-slate-300 hover:border-brand-green hover:text-brand-green-hover text-slate-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


