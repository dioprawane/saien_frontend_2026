"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

type MemberEventStatus = "Inscrit" | "Invitation" | "Passé";

type MemberEvent = {
  id: string;
  title: string;
  startsAt: string;
  location: string;
  status: MemberEventStatus;
};

const MEMBER_EVENTS: MemberEvent[] = [
  {
    id: "EV-M-101",
    title: "Conférence IA Responsable 2026",
    startsAt: "2026-06-18T18:30:00.000Z",
    location: "Paris, France",
    status: "Inscrit",
  },
  {
    id: "EV-M-102",
    title: "Atelier MLOps pour scale-up",
    startsAt: "2026-07-03T19:00:00.000Z",
    location: "En ligne",
    status: "Invitation",
  },
  {
    id: "EV-M-103",
    title: "Meetup Diaspora Data Science",
    startsAt: "2026-07-24T18:00:00.000Z",
    location: "Montreal, Canada",
    status: "Inscrit",
  },
  {
    id: "EV-M-104",
    title: "Summit AI for Public Good",
    startsAt: "2026-08-12T16:30:00.000Z",
    location: "Dakar, Senegal",
    status: "Inscrit",
  },
  {
    id: "EV-M-105",
    title: "Webinaire Gouvernance Data",
    startsAt: "2026-09-04T17:00:00.000Z",
    location: "En ligne",
    status: "Invitation",
  },
  {
    id: "EV-M-106",
    title: "Forum IA et Sante",
    startsAt: "2026-10-09T09:30:00.000Z",
    location: "Abidjan, Cote d'Ivoire",
    status: "Inscrit",
  },
  {
    id: "EV-M-107",
    title: "Session Mentorat Senior",
    startsAt: "2026-11-21T14:30:00.000Z",
    location: "En ligne",
    status: "Inscrit",
  },
  {
    id: "EV-M-108",
    title: "Colloque Ethique Algorithmique",
    startsAt: "2026-04-08T08:30:00.000Z",
    location: "Lyon, France",
    status: "Passé",
  },
];

const PAGE_SIZE_OPTIONS = [4, 8, 12] as const;

const statusClasses: Record<MemberEventStatus, string> = {
  Inscrit: "bg-emerald-100 text-emerald-700",
  Invitation: "bg-amber-100 text-amber-700",
  "Passé": "bg-slate-100 text-slate-600",
};

const DISPLAY_TIME_ZONE = "Europe/Paris";

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: DISPLAY_TIME_ZONE,
});

const TIME_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: DISPLAY_TIME_ZONE,
});

const formatDate = (isoDate: string) => DATE_FORMATTER.format(new Date(isoDate));

const formatTime = (isoDate: string) => TIME_FORMATTER.format(new Date(isoDate));

export default function MemberEventsPage() {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(PAGE_SIZE_OPTIONS[0]);

  const sortedEvents = useMemo(
    () =>
      [...MEMBER_EVENTS].sort(
        (left, right) => new Date(right.startsAt).getTime() - new Date(left.startsAt).getTime(),
      ),
    [],
  );

  const totalPages = Math.max(1, Math.ceil(sortedEvents.length / itemsPerPage));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * itemsPerPage;
  const pageRows = sortedEvents.slice(firstIndex, firstIndex + itemsPerPage);

  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">Mes événements</h1>
          <p className="mt-2 text-slate-500">
            Suivez vos inscriptions et confirmez vos participations aux prochains rendez-vous.
          </p>
          <p className="mt-2 text-xs font-medium text-slate-400">
            Tri applique: plus recents en premier.
          </p>
        </div>

        <div className="space-y-3">
          {pageRows.map((eventItem) => (
            <article key={eventItem.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0A3458]">{eventItem.title}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {formatDate(eventItem.startsAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" aria-hidden="true" />
                      {formatTime(eventItem.startsAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {eventItem.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[eventItem.status]}`}
                  >
                    {eventItem.status}
                  </span>
                  <Link
                    href="/evenements"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {pageRows.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
              Aucun evenement a afficher.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-500">
              Affichage {sortedEvents.length === 0 ? 0 : firstIndex + 1} a{" "}
              {Math.min(firstIndex + itemsPerPage, sortedEvents.length)} sur {sortedEvents.length}
            </p>
            <div className="inline-flex items-center gap-2">
              <label htmlFor="member-events-page-size" className="text-xs text-slate-500">
                Lignes
              </label>
              <select
                id="member-events-page-size"
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setPage(1);
                }}
                className="h-8 rounded-md border border-slate-200 px-2 text-xs text-slate-700"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              disabled={safePage <= 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="text-xs font-semibold text-slate-700">
              Page {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
