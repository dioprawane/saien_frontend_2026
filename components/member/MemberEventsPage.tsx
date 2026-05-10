"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Loader2,
  MapPin,
} from "lucide-react";
import { getMemberEvents, type MemberEventResponse } from "@/lib/api/member";
import { useUserSession } from "@/components/auth/UserSessionContext";

type MemberEventStatus = "REGISTERED" | "INVITED" | "PAST";

const PAGE_SIZE_OPTIONS = [4, 8, 12] as const;

const statusClasses: Record<MemberEventStatus, string> = {
  REGISTERED: "bg-emerald-100 text-emerald-700",
  INVITED: "bg-amber-100 text-amber-700",
  PAST: "bg-slate-100 text-slate-600",
};

const statusLabels: Record<MemberEventStatus, string> = {
  REGISTERED: "Inscrit",
  INVITED: "Invitation",
  PAST: "Passé",
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
  const { session } = useUserSession();
  const [events, setEvents] = useState<MemberEventResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    if (!session?.email) return;

    setIsLoading(true);
    setError(null);

    getMemberEvents(session.email)
      .then((data) => {
        const sorted = [...data].sort(
          (left, right) => new Date(right.startsAt).getTime() - new Date(left.startsAt).getTime(),
        );
        setEvents(sorted);
      })
      .catch(() => {
        setError("Impossible de charger vos événements.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [session?.email]);

  const totalPages = Math.max(1, Math.ceil(events.length / itemsPerPage));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * itemsPerPage;
  const pageRows = events.slice(firstIndex, firstIndex + itemsPerPage);

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

        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 flex items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Chargement de vos événements...</span>
          </div>
        )}

        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <div className="space-y-3">
            {pageRows.map((eventItem) => (
              <article key={eventItem.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
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
                    {eventItem.joinLink && eventItem.status !== "PAST" && (
                      <a
                        href={eventItem.joinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Rejoindre le lien de connexion
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[eventItem.status as MemberEventStatus] ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {statusLabels[eventItem.status as MemberEventStatus] ?? eventItem.status}
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
        )}

        {!isLoading && events.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-500">
                Affichage {events.length === 0 ? 0 : firstIndex + 1} à{" "}
                {Math.min(firstIndex + itemsPerPage, events.length)} sur {events.length}
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
        )}
      </div>
    </section>
  );
}
