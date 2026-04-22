import { Cloud } from "lucide-react";

const PARTNERS = [
  { name: "TechCorp", icon: null },
  { name: "CloudSys", icon: "cloud" as const },
  { name: "InnovateAI", icon: null },
  { name: "DataGlobal", icon: null },
  { name: "FutureLabs", icon: null },
];

export default function PartnersSection() {
  return (
    <section
      className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100"
      aria-label="Nos partenaires"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-8">
          Ils soutiennent notre mission
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {PARTNERS.map(({ name, icon }) => (
            <li key={name}>
              <span className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors text-base sm:text-lg font-bold cursor-default">
                {icon === "cloud" && (
                  <Cloud className="w-4 h-4" aria-hidden="true" />
                )}
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
