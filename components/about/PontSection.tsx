"use client";

import dynamic from "next/dynamic";
import { Globe2, MapPin, Users } from "lucide-react";
import type { MemberLocation } from "./MembersWorldMap";

const MembersWorldMap = dynamic(() => import("./MembersWorldMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl bg-brand-green-soft/70 animate-pulse" />
  ),
});

const MEMBER_LOCATIONS: MemberLocation[] = [
  { country: "France", city: "Paris", members: 42, lat: 48.8566, lon: 2.3522, featured: true },
  { country: "Sénégal", city: "Dakar", members: 31, lat: 14.7167, lon: -17.4677, featured: true },
  { country: "Canada", city: "Montréal", members: 16, lat: 45.5017, lon: -73.5673 },
  { country: "États-Unis", city: "New York", members: 14, lat: 40.7128, lon: -74.006 },
  { country: "Royaume-Uni", city: "Londres", members: 11, lat: 51.5074, lon: -0.1278 },
  { country: "Maroc", city: "Casablanca", members: 9, lat: 33.5731, lon: -7.5898 },
  { country: "Côte d'Ivoire", city: "Abidjan", members: 8, lat: 5.35995, lon: -4.0083 },
  { country: "Émirats arabes unis", city: "Dubaï", members: 7, lat: 25.2048, lon: 55.2708 },
  { country: "Afrique du Sud", city: "Johannesburg", members: 6, lat: -26.2041, lon: 28.0473 },
];

const TOTAL_MEMBERS = MEMBER_LOCATIONS.reduce((sum, location) => sum + location.members, 0);

export default function PontSection() {
  return (
    <section
      className="bg-brand-surface py-20 lg:py-28"
      aria-labelledby="pont-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2
              id="pont-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5"
            >
              Un Réseau Mondial
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
              SAIEN relie des talents sur plusieurs continents pour accélérer
              le partage de compétences, les projets collaboratifs et
              l&apos;innovation en intelligence artificielle.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-soft px-4 py-2 text-sm font-semibold text-brand-green-hover">
                <Globe2 className="w-4 h-4" aria-hidden="true" />
                {MEMBER_LOCATIONS.length} pays actifs
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-surface px-4 py-2 text-sm font-semibold text-slate-700">
                <Users className="w-4 h-4" aria-hidden="true" />
                {TOTAL_MEMBERS}+ membres représentés
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MEMBER_LOCATIONS.map(({ country, city, members }) => (
                <div
                  key={country}
                  className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 px-5 py-4"
                >
                  <MapPin
                    className="w-4 h-4 text-brand-green mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {country}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {city} · {members} membres
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-brand-green-soft-strong bg-white p-4 shadow-sm">
              <div className="h-[320px] sm:h-[360px] lg:h-[420px]">
                <div className="h-full w-full overflow-hidden rounded-2xl border border-brand-green-soft-strong">
                  <MembersWorldMap locations={MEMBER_LOCATIONS} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Carte mondiale interactive: cliquez sur un point pour afficher
                le détail, zoomez et déplacez-vous librement.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {MEMBER_LOCATIONS.map((location) => (
                <span
                  key={`chip-${location.country}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {location.country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
