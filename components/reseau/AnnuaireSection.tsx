"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Linkedin } from "lucide-react";
import type { ShowcaseNetworkMember } from "@/lib/api/showcase";

type AnnuaireSectionProps = {
  members: ShowcaseNetworkMember[];
};

const DEFAULT_AVATAR_URL = "/members/avatar-1.png";

function memberLocation(member: ShowcaseNetworkMember) {
  const city = member.city?.trim();
  const country = member.country?.trim();
  if (city && country) {
    return `${city}, ${country}`;
  }
  if (country) {
    return country;
  }
  if (city) {
    return city;
  }
  return "Localisation non renseignée";
}

export default function AnnuaireSection({ members }: AnnuaireSectionProps) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const filtered = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(query.toLowerCase()) ||
      m.role.toLowerCase().includes(query.toLowerCase()) ||
      memberLocation(m).toLowerCase().includes(query.toLowerCase())
  );
  const displayed = filtered.slice(0, visible);

  return (
    <section
      id="annuaire"
      className="bg-brand-surface py-20 lg:py-24"
      aria-labelledby="annuaire-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green mb-3">
              Communauté
            </p>
            <h2
              id="annuaire-heading"
              className="text-3xl sm:text-4xl font-extrabold text-[#123a5f] mb-1"
            >
              Annuaire des Membres
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Bientôt, retrouvez ici la cartographie des talents sénégalais en
              IA, Data et Cybersécurité, partout dans le monde.
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
                  setVisible(6);
                }}
                className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-green w-48"
                aria-label="Rechercher un membre"
              />
            </div>
            <button className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm text-slate-600 hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors">
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              Filtres
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((member) => (
            <div
              key={member.id}
              className="relative rounded-[28px] border border-slate-200 bg-brand-surface px-6 py-6 flex flex-col items-center text-center gap-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {member.featured && (
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-green-soft text-brand-green-hover border border-brand-green-soft-strong">
                  Mise en avant
                </span>
              )}

              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_20px_-12px_rgba(15,23,42,0.8)]">
                <Image
                  src={member.avatarUrl || DEFAULT_AVATAR_URL}
                  alt={member.fullName}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div>
                <p className="font-extrabold text-[#123a5f] text-2xl leading-tight">
                  {member.fullName}
                </p>
                <p
                  className={`text-base font-semibold mt-1 ${
                    member.featured ? "text-brand-green-hover" : "text-slate-500"
                  }`}
                >
                  {member.role}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                {memberLocation(member)}
              </div>

              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${member.fullName}`}
                  className="mt-1 w-7 h-7 rounded-lg bg-brand-surface hover:bg-brand-green-soft hover:text-brand-green-hover transition-colors flex items-center justify-center text-slate-500"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => v + 3)}
              className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors text-slate-700 font-semibold text-sm px-8 py-3 rounded-xl"
            >
              Charger plus de membres
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-12">
            {members.length === 0
              ? "Aucun membre disponible pour le moment."
              : "Aucun membre trouvé."}
          </p>
        )}
      </div>
    </section>
  );
}


