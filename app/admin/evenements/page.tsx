"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Ban,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CircleDashed,
  Globe,
  MapPin,
  Minus,
  MoreHorizontal,
  Plus,
  Search,
  UserRound,
  Video,
} from "lucide-react";
import {
  type AdminEvent,
  type EventFormat,
  type EventStatus,
  useAdminContext,
} from "@/components/admin/AdminContext";

const formatLabel: Record<EventFormat, string> = {
  onsite: "Presentiel",
  online: "En ligne",
  hybrid: "Hybride",
};

const statusLabel: Record<EventStatus, string> = {
  draft: "Brouillon",
  published: "Publie",
  completed: "Termine",
  cancelled: "Annule",
};

const statusBadgeClass: Record<EventStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  published: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));

const DEFAULT_ITEMS_PER_PAGE = 6;
const PAGE_SIZE_OPTIONS = [6, 10, 14] as const;

export default function EvenementsAdminPage() {
  const { events, createEvent, updateEventStatus, updateEventRegistrations } = useAdminContext();

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EventStatus>("all");
  const [formatFilter, setFormatFilter] = useState<"all" | EventFormat>("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    location: "",
    format: "online" as EventFormat,
    capacity: 100,
    owner: "Jean Dupont",
  });

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return [...events]
      .filter((eventItem) => {
        if (statusFilter !== "all" && eventItem.status !== statusFilter) return false;
        if (formatFilter !== "all" && eventItem.format !== formatFilter) return false;

        if (!normalizedSearch) return true;

        return (
          eventItem.title.toLowerCase().includes(normalizedSearch) ||
          eventItem.location.toLowerCase().includes(normalizedSearch) ||
          eventItem.owner.toLowerCase().includes(normalizedSearch)
        );
      })
      .sort(
        (left, right) => new Date(left.startDate).getTime() - new Date(right.startDate).getTime(),
      );
  }, [events, formatFilter, searchValue, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / itemsPerPage));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * itemsPerPage;
  const pageRows = filteredEvents.slice(firstIndex, firstIndex + itemsPerPage);

  const stats = {
    total: events.length,
    published: events.filter((eventItem) => eventItem.status === "published").length,
    draft: events.filter((eventItem) => eventItem.status === "draft").length,
    occupancy:
      events.length === 0
        ? 0
        : Math.round(
            (events.reduce((sum, eventItem) => sum + eventItem.registrations, 0) /
              events.reduce((sum, eventItem) => sum + Math.max(eventItem.capacity, 1), 0)) *
              100,
          ),
  };

  const createNewEvent = () => {
    if (!newEvent.title.trim() || !newEvent.location.trim() || !newEvent.startDate) return;

    createEvent({
      title: newEvent.title,
      format: newEvent.format,
      startDate: new Date(newEvent.startDate).toISOString(),
      location: newEvent.location,
      capacity: Math.max(10, newEvent.capacity),
      owner: newEvent.owner,
    });

    setNewEvent({
      title: "",
      startDate: "",
      location: "",
      format: "online",
      capacity: 100,
      owner: "Jean Dupont",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Evenements</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
        </article>
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Publies</p>
          <p className="mt-1 text-3xl font-bold text-green-700">{stats.published}</p>
        </article>
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Brouillons</p>
          <p className="mt-1 text-3xl font-bold text-slate-700">{stats.draft}</p>
        </article>
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Remplissage moyen</p>
          <p className="mt-1 text-3xl font-bold text-[#0A2540]">{stats.occupancy}%</p>
        </article>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#0A2540] inline-flex items-center gap-2">
          <Plus size={18} className="text-[#16A34A]" />
          Creer un evenement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
          <input
            type="text"
            value={newEvent.title}
            onChange={(event) => setNewEvent((previous) => ({ ...previous, title: event.target.value }))}
            placeholder="Titre"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm xl:col-span-2"
          />
          <input
            type="datetime-local"
            value={newEvent.startDate}
            onChange={(event) => setNewEvent((previous) => ({ ...previous, startDate: event.target.value }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          />
          <input
            type="text"
            value={newEvent.location}
            onChange={(event) => setNewEvent((previous) => ({ ...previous, location: event.target.value }))}
            placeholder="Lieu"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          />
          <select
            value={newEvent.format}
            onChange={(event) =>
              setNewEvent((previous) => ({ ...previous, format: event.target.value as EventFormat }))
            }
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          >
            <option value="onsite">Presentiel</option>
            <option value="online">En ligne</option>
            <option value="hybrid">Hybride</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={10}
              value={newEvent.capacity}
              onChange={(event) =>
                setNewEvent((previous) => ({
                  ...previous,
                  capacity: Number(event.target.value) || 10,
                }))
              }
              className="h-10 w-24 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <button
              type="button"
              onClick={createNewEvent}
              className="h-10 inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-4 text-sm font-semibold text-white hover:bg-[#12385a]"
            >
              <Plus size={14} />
              Creer
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setPage(1);
              }}
              placeholder="Rechercher evenement"
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as "all" | EventStatus);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          >
            <option value="all">Tous statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publie</option>
            <option value="completed">Termine</option>
            <option value="cancelled">Annule</option>
          </select>

          <select
            value={formatFilter}
            onChange={(event) => {
              setFormatFilter(event.target.value as "all" | EventFormat);
              setPage(1);
            }}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          >
            <option value="all">Tous formats</option>
            <option value="onsite">Presentiel</option>
            <option value="online">En ligne</option>
            <option value="hybrid">Hybride</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100">
          {pageRows.map((eventItem) => (
            <EventCard
              key={eventItem.id}
              eventItem={eventItem}
              onStatusChange={(status) => updateEventStatus(eventItem.id, status)}
              onIncrementRegistrations={() =>
                updateEventRegistrations(eventItem.id, eventItem.registrations + 1)
              }
              onDecrementRegistrations={() =>
                updateEventRegistrations(eventItem.id, eventItem.registrations - 1)
              }
            />
          ))}

          {pageRows.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-gray-500">
              Aucun evenement ne correspond aux filtres.
            </p>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <p>
              Affichage {filteredEvents.length === 0 ? 0 : firstIndex + 1} a{" "}
              {Math.min(firstIndex + itemsPerPage, filteredEvents.length)} sur {filteredEvents.length}
            </p>
            <div className="inline-flex items-center gap-2">
              <label htmlFor="events-page-size" className="text-xs text-gray-500">
                Cartes
              </label>
              <select
                id="events-page-size"
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setPage(1);
                }}
                className="h-8 rounded-md border border-gray-200 px-2 text-xs text-gray-700"
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-semibold text-gray-700">
              Page {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function EventCard({
  eventItem,
  onStatusChange,
  onIncrementRegistrations,
  onDecrementRegistrations,
}: {
  eventItem: AdminEvent;
  onStatusChange: (status: EventStatus) => void;
  onIncrementRegistrations: () => void;
  onDecrementRegistrations: () => void;
}) {
  const occupancy = Math.min(100, Math.round((eventItem.registrations / Math.max(eventItem.capacity, 1)) * 100));

  const closeMenu = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return;
    target.closest("details")?.removeAttribute("open");
  };

  return (
    <article className="p-5 grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass[eventItem.status]}`}>
            {statusLabel[eventItem.status]}
          </span>
          <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
            {formatLabel[eventItem.format]}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#0A2540]">{eventItem.title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
          <p className="inline-flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            {formatDate(eventItem.startDate)}
          </p>
          <p className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            {eventItem.location}
          </p>
          <p className="inline-flex items-center gap-2">
            <UserRound size={14} className="text-gray-400" />
            {eventItem.owner}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Inscriptions: {eventItem.registrations}/{eventItem.capacity}</span>
            <span>{occupancy}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full bg-[#16A34A]" style={{ width: `${occupancy}%` }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 xl:items-end xl:text-right">
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={onDecrementRegistrations}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100"
            aria-label="Retirer une inscription"
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            onClick={onIncrementRegistrations}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100"
            aria-label="Ajouter une inscription"
          >
            <Plus size={14} />
          </button>

          <details className="relative inline-block text-left">
            <summary className="list-none inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
              <MoreHorizontal size={16} />
            </summary>

            <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={(event) => {
                  onStatusChange("published");
                  closeMenu(event.currentTarget);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-green-700 hover:bg-green-50"
              >
                <CheckCircle2 size={13} />
                Publier
              </button>
              <button
                type="button"
                onClick={(event) => {
                  onStatusChange("draft");
                  closeMenu(event.currentTarget);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                <CircleDashed size={13} />
                Brouillon
              </button>
              <button
                type="button"
                onClick={(event) => {
                  onStatusChange("completed");
                  closeMenu(event.currentTarget);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
              >
                <Video size={13} />
                Terminer
              </button>
              <button
                type="button"
                onClick={(event) => {
                  onStatusChange("cancelled");
                  closeMenu(event.currentTarget);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                <Ban size={13} />
                Annuler
              </button>
            </div>
          </details>
        </div>

        <p className="text-[11px] text-gray-400 inline-flex items-center gap-1 justify-end">
          <Globe size={12} />
          ID: {eventItem.id}
        </p>
      </div>
    </article>
  );
}
