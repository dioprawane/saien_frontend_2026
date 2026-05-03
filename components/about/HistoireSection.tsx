const TIMELINE = [
  {
    year: "Novembre 2025",
    title: "La Fondation",
    description:
      "Constitution officielle de SAIEN à Nice (France) le 30 novembre 2025, sous le régime de la loi 1901, par un collectif de Sénégalais passionnés d'IA, de Data et de Cybersécurité.",
    side: "left",
  },
  {
    year: "2026",
    title: "Le Lancement",
    description:
      "Elargissement du bureau, lancement du site web, premières adhésions et structuration des axes d'action : wébinaires, formation, mentorat, vulgarisation et représentation institutionnelle.",
    side: "right",
  },
  {
    year: "Demain",
    title: "Notre Ambition",
    description:
      "Faire de SAIEN la référence de l'expertise sénégalaise en IA, en construisant des ponts durables entre le Sénégal et la diaspora mondiale.",
    side: "left",
  },
];

export default function HistoireSection() {
  return (
    <section
      className="bg-brand-surface py-20 lg:py-28"
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
            className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-green-soft-strong -translate-x-1/2"
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
                    <span className="text-xs font-bold text-brand-green mb-2 block">
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
                  className="absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-brand-green ring-4 ring-white z-10"
                  aria-hidden="true"
                />
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline mobile */}
        <div className="sm:hidden relative">
          <div
            className="absolute left-4 top-1 bottom-1 w-px bg-brand-green-soft-strong"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative pl-9">
                <div
                  className="absolute left-[11px] top-6 h-3 w-3 rounded-full bg-brand-green ring-4 ring-brand-surface"
                  aria-hidden="true"
                />

                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <span className="text-xs font-bold text-brand-green mb-1 block">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
