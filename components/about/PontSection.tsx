import { MapPin } from "lucide-react";

const HUBS = [
  {
    city: "Paris, France",
    role: "Hub d'expertise et de coordination européenne",
  },
  {
    city: "Dakar, Sénégal",
    role: "Centre d'innovation et de déploiement local",
  },
];

export default function PontSection() {
  return (
    <section
      className="bg-slate-50 py-20 lg:py-28"
      aria-labelledby="pont-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texte */}
          <div>
            <h2
              id="pont-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5"
            >
              Un Pont Technologique
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
              SAIEN opère principalement entre la France et le Sénégal, créant
              un corridor d&apos;innovation fluide pour le transfert de
              compétences et le développement de projets conjoints.
            </p>
            <div className="flex flex-col gap-4">
              {HUBS.map(({ city, role }) => (
                <div
                  key={city}
                  className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 px-5 py-4"
                >
                  <MapPin
                    className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {city}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Réseau SVG décoratif */}
          <div className="relative flex items-center justify-center h-64 lg:h-80">
            <svg
              viewBox="0 0 300 280"
              className="w-full h-full max-w-xs"
              aria-hidden="true"
            >
              <line x1="150" y1="60" x2="80" y2="140" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="150" y1="60" x2="220" y2="130" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="80" y1="140" x2="150" y2="220" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="220" y1="130" x2="150" y2="220" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />
              <line x1="150" y1="60" x2="150" y2="220" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="80" y1="140" x2="220" y2="130" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="40" y1="80" x2="80" y2="140" stroke="#10b981" strokeWidth="1" strokeOpacity="0.15" />
              <line x1="260" y1="170" x2="220" y2="130" stroke="#10b981" strokeWidth="1" strokeOpacity="0.15" />
              <circle cx="40" cy="80" r="4" fill="#10b981" fillOpacity="0.3" />
              <circle cx="260" cy="170" r="4" fill="#10b981" fillOpacity="0.3" />
              <circle cx="100" cy="200" r="5" fill="#10b981" fillOpacity="0.4" />
              <circle cx="200" cy="60" r="5" fill="#10b981" fillOpacity="0.4" />
              <circle cx="150" cy="60" r="12" fill="#10b981" fillOpacity="0.15" />
              <circle cx="150" cy="60" r="7" fill="#10b981" />
              <circle cx="80" cy="140" r="12" fill="#10b981" fillOpacity="0.15" />
              <circle cx="80" cy="140" r="7" fill="#10b981" />
              <circle cx="220" cy="130" r="12" fill="#10b981" fillOpacity="0.15" />
              <circle cx="220" cy="130" r="7" fill="#10b981" />
              <circle cx="150" cy="220" r="12" fill="#10b981" fillOpacity="0.15" />
              <circle cx="150" cy="220" r="7" fill="#10b981" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
