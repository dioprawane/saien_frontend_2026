"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import {
  type ShowcaseEventRegistrant,
  getAdminShowcaseEventRegistrants,
  getShowcaseEventById,
} from "@/lib/api/showcase";
import { getApiErrorMessage } from "@/lib/api/errors";
import type { AgendaEvent } from "@/lib/events-data";

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));

const VISIBILITY_LABELS: Record<string, string> = {
  open: "Ouvert",
  public: "Public",
  members: "Membres",
  prive: "Privé",
};

const VISIBILITY_COLORS: Record<string, string> = {
  open: "bg-green-100 text-green-700",
  public: "bg-blue-100 text-blue-700",
  members: "bg-purple-100 text-purple-700",
  prive: "bg-slate-100 text-slate-700",
};

export default function AdminEventDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id ?? "0", 10);

  const [event, setEvent] = useState<AgendaEvent | null>(null);
  const [registrants, setRegistrants] = useState<ShowcaseEventRegistrant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!Number.isFinite(eventId) || eventId <= 0) {
      setError("Identifiant d'événement invalide.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const [ev, regs] = await Promise.all([
        getShowcaseEventById(eventId),
        getAdminShowcaseEventRegistrants(eventId),
      ]);
      setEvent(ev);
      setRegistrants(regs);
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible de charger les données."));
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <button
        onClick={() => router.push("/admin/evenements")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0A2540] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux événements
      </button>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
          Chargement...
        </div>
      ) : event ? (
        <>
          {/* Event header */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-black text-[#0A2540]">{event.title}</h1>
                <p className="mt-1 text-sm text-slate-500">{event.description}</p>
              </div>
              {event.eventVisibility && (
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    VISIBILITY_COLORS[event.eventVisibility] ?? "bg-slate-100 text-slate-700"
                  }`}
                >
                  {VISIBILITY_LABELS[event.eventVisibility] ?? event.eventVisibility}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-green" />
                {event.day} {event.month} {event.year} — {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-green" />
                {event.location}
              </span>
            </div>
          </div>

          {/* Registrants table */}
          <div className="mb-3 flex items-center gap-3">
            <Users className="h-5 w-5 text-brand-green-hover" />
            <h2 className="text-lg font-bold text-[#0A2540]">
              Inscrits
              <span className="ml-2 text-base font-normal text-slate-500">
                ({registrants.length})
              </span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {registrants.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <Users className="h-8 w-8 text-slate-300" />
                <p className="text-sm text-slate-500">Aucun inscrit pour cet événement.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="hidden px-4 py-3 text-left sm:table-cell">Nom</th>
                    <th className="hidden px-4 py-3 text-left md:table-cell">Compte membre</th>
                    <th className="hidden px-4 py-3 text-left lg:table-cell">Date d&apos;inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {registrants.map((r) => (
                    <tr key={r.id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-[#0A2540]">{r.email}</td>
                      <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                        {r.fullName ?? "—"}
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        {r.hasMemberAccount ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                            Oui
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                            Non
                          </span>
                        )}
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                        {formatDate(r.registeredAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
