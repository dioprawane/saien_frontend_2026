"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Globe2, MapPin, Users } from "lucide-react";
import {
  getShowcaseNetworkOverview,
  type ShowcaseNetworkOverview,
} from "@/lib/api/showcase";
import type { MemberLocation } from "./MembersWorldMap";

const MembersWorldMap = dynamic(() => import("./MembersWorldMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl bg-brand-green-soft/70 animate-pulse" />
  ),
});

const MAX_LOCATION_CARDS = 8;
const MAX_COUNTRY_CHIPS = 12;

const EMPTY_NETWORK_OVERVIEW: ShowcaseNetworkOverview = {
  representedMembers: 0,
  activeCountries: 0,
  locations: [],
};

export default function PontSection() {
  const [overview, setOverview] = useState<ShowcaseNetworkOverview>(EMPTY_NETWORK_OVERVIEW);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getShowcaseNetworkOverview()
      .then((data) => {
        if (!active) return;
        setOverview(data);
      })
      .catch(() => {
        // Keep safe empty state when API is temporarily unavailable.
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const locationCards = useMemo(
    () => overview.locations.slice(0, MAX_LOCATION_CARDS),
    [overview.locations],
  );

  const mapLocations = useMemo<MemberLocation[]>(
    () =>
      overview.locations
        .filter(
          (location) =>
            typeof location.lat === "number" && typeof location.lon === "number",
        )
        .map((location, index) => ({
          country: location.country,
          city: location.city,
          members: location.members,
          lat: location.lat as number,
          lon: location.lon as number,
          featured: index === 0,
        })),
    [overview.locations],
  );

  const countryChips = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(
        overview.locations
          .map((location) => location.country)
          .filter((country) => Boolean(country?.trim())),
      ),
    );

    return uniqueCountries.slice(0, MAX_COUNTRY_CHIPS);
  }, [overview.locations]);

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
              Un Réseau International
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
              La diaspora sénégalaise compte des talents technologiques
              sur tous les continents. SAIEN les fédère autour d'une mission
              commune : faire rayonner l&apos;IA sénégalaise dans le monde.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-soft px-4 py-2 text-sm font-semibold text-brand-green-hover">
                <Globe2 className="w-4 h-4" aria-hidden="true" />
                {overview.activeCountries} pays actifs
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-surface px-4 py-2 text-sm font-semibold text-slate-700">
                <Users className="w-4 h-4" aria-hidden="true" />
                {overview.representedMembers}+ membres représentés
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {locationCards.length > 0 ? (
                locationCards.map(({ country, city, members }) => (
                  <div
                    key={`${country}-${city}`}
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
                ))
              ) : (
                <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500">
                  {isLoading
                    ? "Chargement des localisations membres..."
                    : "Aucune localisation membre disponible pour le moment."}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-brand-green-soft-strong bg-white p-4 shadow-sm">
              <div className="h-[320px] sm:h-[360px] lg:h-[420px]">
                <div className="h-full w-full overflow-hidden rounded-2xl border border-brand-green-soft-strong">
                  {mapLocations.length > 0 ? (
                    <MembersWorldMap locations={mapLocations} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-brand-green-soft/40 px-4 text-center text-sm text-slate-600">
                      {isLoading
                        ? "Chargement de la carte des membres..."
                        : "La carte sera affichée dès que des localisations membres seront disponibles."}
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Carte mondiale interactive: cliquez sur un point pour afficher
                le détail, zoomez et déplacez-vous librement.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {countryChips.map((country) => (
                <span
                  key={`chip-${country}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
