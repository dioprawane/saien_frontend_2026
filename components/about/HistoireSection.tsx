const TIMELINE = [
  {
    year: "2021",
    title: "La Genèse",
    description:
      "Création de SAIEN avec la vision de réunir les talents technologiques de la diaspora pour structurer une réponse africaine aux défis de l'IA.",
    side: "left",
  },
  {
    year: "2022",
    title: "Premier Hub",
    description:
      "Lancement du premier programme de mentorat croisé entre Paris et Dakar, impliquant plus de 50 experts en Machine Learning.",
    side: "right",
  },
  {
    year: "2024",
    title: "Réseau Global",
    description:
      "Extension des initiatives avec des partenariats institutionnels et naissance de nouveaux nœuds de recherche collaboratifs.",
    side: "left",
  },
];

export default function HistoireSection() {
  return (
    <section
      className="bg-slate-50 py-20 lg:py-28"
      aria-labelledby="histoire-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="histoire-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Notre Histoire
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            L&apos;évolution d&apos;un réseau dédié à l&apos;impact
            technologique.
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="relative max-w-3xl mx-auto hidden sm:block">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-200 -translate-x-1/2"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-14">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className={`relative flex items-start ${
                  item.side === "right" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-5/12 ${
                    item.side === "right" ? "pl-10" : "pr-10"
                  }`}
                >
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-emerald-500 mb-2 block">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white z-10"
                  aria-hidden="true"
                />
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline mobile (stack) */}
        <div className="sm:hidden flex flex-col gap-6">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <span className="text-xs font-bold text-emerald-500 mb-1 block">
                {item.year}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
