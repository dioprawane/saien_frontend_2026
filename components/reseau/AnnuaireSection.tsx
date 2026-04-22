"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Linkedin } from "lucide-react";

interface Member {
  name: string;
  role: string;
  location: string;
  initials: string;
  featured?: boolean;
}

const MEMBERS: Member[] = [
  { name: "Amélie Dubois", role: "Lead Data Scientist", location: "Paris, France", initials: "AD" },
  { name: "Thomas Laurent", role: "AI Researcher", location: "Montréal, Canada", initials: "TL" },
  { name: "Sarah Benali", role: "Directrice Innovation", location: "Genève, Suisse", initials: "SB", featured: true },
  { name: "Marc Ndiaye", role: "Architecte Cloud IA", location: "Dakar, Sénégal", initials: "MN" },
  { name: "Oumar Ba", role: "ML Engineer", location: "London, UK", initials: "OB" },
  { name: "Aïcha Traoré", role: "NLP Researcher", location: "Paris, France", initials: "AT" },
  { name: "Kofi Mensah", role: "Data Engineer", location: "Accra, Ghana", initials: "KM" },
  { name: "Nadia Essomba", role: "Product IA", location: "Lyon, France", initials: "NE" },
];

export default function AnnuaireSection() {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(4);

  const filtered = MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase()) ||
      m.location.toLowerCase().includes(query.toLowerCase())
  );
  const displayed = filtered.slice(0, visible);

  return (
    <section
      id="annuaire"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="annuaire-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2
              id="annuaire-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1"
            >
              Annuaire des Membres
            </h2>
            <p className="text-slate-500 text-sm">
              Explorez notre communauté d&apos;experts, de chercheurs et
              d&apos;innovateurs.
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(4);
                }}
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 w-44"
                aria-label="Rechercher un membre"
              />
            </div>
            <button className="flex items-center gap-1.5 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              Filtres
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayed.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-base">
                {member.initials}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                <p
                  className={`text-xs font-medium mt-0.5 ${
                    member.featured ? "text-emerald-500" : "text-slate-500"
                  }`}
                >
                  {member.role}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                {member.location}
              </div>
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

        {visible < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => v + 4)}
              className="inline-flex items-center gap-2 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors text-slate-700 font-semibold text-sm px-8 py-3 rounded-full"
            >
              Charger plus de membres
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-12">
            Aucun membre trouvé.
          </p>
        )}
      </div>
    </section>
  );
}
