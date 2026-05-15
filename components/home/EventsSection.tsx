"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Monitor, MapPin, GraduationCap } from "lucide-react";
import EventCard from "./EventCard";
import { listShowcaseEvents } from "@/lib/api/showcase";
import { compareEventsByChronology, getEventChronology } from "@/lib/event-display";
import { EVENTS as FALLBACK_EVENTS, type AgendaEvent } from "@/lib/events-data";

const toHomeEventCard = (event: AgendaEvent) => {
  const chronology = getEventChronology(event);

  const hasOnlineHint =
    event.format.toLowerCase().includes("ligne") ||
    event.location.toLowerCase().includes("ligne") ||
    event.tags.some((tag) => tag.iconName === "MonitorPlay" || tag.iconName === "Video");

  const hasLocationHint =
    event.format.toLowerCase().includes("presentiel") ||
    event.location.toLowerCase().includes("paris") ||
    event.location.toLowerCase().includes("dakar");

  const CategoryIcon = hasOnlineHint
    ? Monitor
    : hasLocationHint
      ? MapPin
      : GraduationCap;

  // Le "type" est le premier tag distinct du format (ex: Webinaire, Conference),
  // sinon on retombe sur la thematique pour eviter une zone vide.
  const formatLower = event.format.trim().toLowerCase();
  const typeLabel =
    event.tags.find((tag) => tag.label.trim().toLowerCase() !== formatLower)?.label
      ?? (event.thematique && event.thematique.trim().toLowerCase() !== formatLower
        ? event.thematique
        : undefined);

  return {
    id: event.id,
    dateBadge: `${event.day} ${event.month}`,
    imageUrl: event.imageUrl || "/event-1.png",
    format: event.format,
    type: typeLabel,
    CategoryIcon,
    chronologyLabel: chronology.label,
    chronologyClassName: chronology.className,
    title: event.title,
    description: event.description,
    time: event.time,
    location: event.location,
    speakers: (event.intervenants ?? []).slice(0, 3).map((s) => ({
      name: s.name,
      initials: s.initials || s.name.slice(0, 2).toUpperCase(),
    })),
  };
};

export default function EventsSection() {
  const [events, setEvents] = useState<AgendaEvent[]>(FALLBACK_EVENTS);

  useEffect(() => {
    let isCancelled = false;

    async function loadEvents() {
      try {
        const remoteEvents = await listShowcaseEvents();
        const visibleEvents = remoteEvents.filter((event) => event.status !== "draft");
        if (!isCancelled && visibleEvents.length > 0) {
          setEvents(visibleEvents);
        }
      } catch {
        if (!isCancelled) {
          setEvents(FALLBACK_EVENTS);
        }
      }
    }

    void loadEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  const displayedEvents = useMemo(() => {
    return [...events].sort(compareEventsByChronology).slice(0, 3).map(toHomeEventCard);
  }, [events]);

  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 lg:mb-12">
          <div>
            <h2
              id="events-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1"
            >
              Événements
            </h2>
            <p className="text-slate-500 text-sm">
              Participez à nos prochaines rencontres et webinaires.
            </p>
          </div>
          <Link
            href="/evenements"
            className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 text-brand-green hover:text-brand-green-hover transition-colors text-sm font-medium"
          >
            Voir tout l&apos;agenda
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((event) => (
            <Link
              key={event.id}
              href={`/evenements/${event.id}`}
              className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
