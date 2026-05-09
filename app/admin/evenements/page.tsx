"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  Ban,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Edit3,
  ImageIcon,
  Loader2,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import {
  deleteShowcaseEvent,
  listShowcaseEvents,
  uploadShowcaseEventImage,
  upsertShowcaseEvent,
  type UpsertShowcaseEventInput,
} from "@/lib/api/showcase";
import type { AgendaEvent, EventTag, Intervenant } from "@/lib/events-data";

type ShowcaseStatus = "draft" | "published" | "completed" | "cancelled";

type EventFormState = {
  id: string;
  date: string;
  startTimeGmt: string;
  endTimeGmt: string;
  thematique: string;
  format: string;
  type: string;
  title: string;
  description: string;
  fullDescription: string;
  locationPreset: string; // valeur du select (preset OU MANUAL_OPTION)
  location: string; // valeur effective envoyee au backend
  seats: string;
  imageUrl: string;
  objectifsText: string;
};

const ITEMS_PER_PAGE = 8;
const FORMAT_OPTIONS = ["En ligne", "Presentiel", "Hybride"] as const;
const TYPE_OPTIONS = ["Webinaire", "Conference", "Meetup", "Atelier"] as const;
const LOCATION_PRESETS = ["Meet", "Zoom", "Teams"] as const;
const MANUAL_OPTION = "__manual__";

const MONTH_LABELS = ["JAN", "FEV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOU", "SEP", "OCT", "NOV", "DEC"] as const;

const MONTH_INDEX_BY_KEY: Record<string, number> = {
  JAN: 0,
  FEV: 1,
  FEB: 1,
  MAR: 2,
  AVR: 3,
  MAI: 4,
  JUN: 5,
  JUI: 6,
  JUL: 6,
  AOU: 7,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

const statusLabel: Record<ShowcaseStatus, string> = {
  draft: "Brouillon",
  published: "Publie",
  completed: "Termine",
  cancelled: "Annule",
};

const statusBadgeClass: Record<ShowcaseStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  published: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const splitLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const normalizeMonthKey = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

const normalizeTimeValue = (value: string) => {
  const [hoursRaw = "0", minutesRaw = "0"] = value.split(":");
  const hours = Math.max(0, Math.min(23, Number(hoursRaw) || 0));
  const minutes = Math.max(0, Math.min(59, Number(minutesRaw) || 0));
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const extractTimeRange = (value: string) => {
  const matches = value.match(/\b\d{1,2}:\d{2}\b/g) ?? [];
  return {
    startTimeGmt: normalizeTimeValue(matches[0] ?? "10:00"),
    endTimeGmt: normalizeTimeValue(matches[1] ?? "12:00"),
  };
};

const buildDatePartsFromInput = (dateValue: string) => {
  const [year = String(new Date().getFullYear()), monthRaw = "01", day = "01"] = dateValue.split("-");
  const monthIndex = Math.max(0, Math.min(11, Number(monthRaw) - 1));

  return {
    year,
    month: MONTH_LABELS[monthIndex],
    day,
  };
};

const buildGmtTimeLabel = (startTimeGmt: string, endTimeGmt: string) => {
  const start = normalizeTimeValue(startTimeGmt);
  const end = normalizeTimeValue(endTimeGmt);
  return `${start} - ${end} (GMT)`;
};

const toDateInputValue = (eventItem: AgendaEvent) => {
  const normalizedMonth = normalizeMonthKey(eventItem.month);
  const monthIndex = MONTH_INDEX_BY_KEY[normalizedMonth] ?? 0;
  const month = String(monthIndex + 1).padStart(2, "0");
  const day = String(Math.max(1, Number(eventItem.day) || 1)).padStart(2, "0");
  const year = /^\d{4}$/.test(eventItem.year) ? eventItem.year : String(new Date().getFullYear());
  return `${year}-${month}-${day}`;
};

const getNextLegacyId = (events: AgendaEvent[]) => {
  const maxId = events.reduce((max, eventItem) => Math.max(max, eventItem.id), 0);
  return maxId + 1;
};

const createEmptyForm = (nextId: number): EventFormState => ({
  id: String(nextId),
  date: new Date().toISOString().slice(0, 10),
  startTimeGmt: "10:00",
  endTimeGmt: "12:00",
  thematique: "Intelligence Artificielle",
  format: "En ligne",
  type: "Webinaire",
  title: "",
  description: "",
  fullDescription: "",
  locationPreset: "Meet",
  location: "Meet",
  seats: "",
  imageUrl: "",
  objectifsText: "",
});

const findExistingType = (eventItem: AgendaEvent): string => {
  const formatLower = eventItem.format.trim().toLowerCase();
  const fromTags = eventItem.tags.find(
    (tag) => tag.label.trim().toLowerCase() !== formatLower,
  )?.label;
  if (fromTags) return fromTags;
  if (eventItem.thematique && eventItem.thematique.trim().toLowerCase() !== formatLower) {
    return eventItem.thematique;
  }
  return TYPE_OPTIONS[0];
};

const resolveLocationPreset = (location: string): string => {
  const trimmed = (location ?? "").trim();
  const matched = LOCATION_PRESETS.find(
    (preset) => preset.toLowerCase() === trimmed.toLowerCase(),
  );
  return matched ?? MANUAL_OPTION;
};

const eventToForm = (eventItem: AgendaEvent): EventFormState => {
  const timeRange = extractTimeRange(eventItem.time);
  const locationPreset = resolveLocationPreset(eventItem.location);

  return {
    id: String(eventItem.id),
    date: toDateInputValue(eventItem),
    startTimeGmt: timeRange.startTimeGmt,
    endTimeGmt: timeRange.endTimeGmt,
    thematique: eventItem.thematique,
    format: eventItem.format,
    type: findExistingType(eventItem),
    title: eventItem.title,
    description: eventItem.description,
    fullDescription: eventItem.fullDescription ?? "",
    locationPreset,
    location: eventItem.location,
    seats: eventItem.seats ?? "",
    imageUrl: eventItem.imageUrl ?? "",
    objectifsText: (eventItem.objectifs ?? []).join("\n"),
  };
};

const eventDateLabel = (eventItem: AgendaEvent) =>
  `${eventItem.day} ${eventItem.month} ${eventItem.year}`;

const getEventStatus = (eventItem: AgendaEvent): ShowcaseStatus => {
  return eventItem.status ?? "draft";
};

const normalizeErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const defaultTagFromFormat = (format: string): EventTag => {
  const normalized = format.toLowerCase();
  let iconName: EventTag["iconName"];

  if (normalized.includes("ligne")) {
    iconName = "Video";
  } else if (normalized.includes("hybrid")) {
    iconName = "MonitorPlay";
  }

  return {
    label: format,
    iconName,
    color: "text-slate-600",
    bgColor: "bg-brand-surface",
  };
};

const closeActionMenu = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return;
  target.closest("details")?.removeAttribute("open");
};

export default function EvenementsAdminPage() {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState<EventFormState>(() => createEmptyForm(1));

  useEffect(() => {
    let isCancelled = false;

    async function loadEvents() {
      try {
        const remoteEvents = await listShowcaseEvents();
        if (isCancelled) return;

        setEvents(remoteEvents);
        setFormState(createEmptyForm(getNextLegacyId(remoteEvents)));
      } catch (error) {
        if (isCancelled) return;
        setErrorMessage(
          normalizeErrorMessage(error, "Impossible de charger les evenements depuis la base."),
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();

    return [...events]
      .filter((eventItem) => {
        if (!normalized) return true;

        return (
          eventItem.title.toLowerCase().includes(normalized) ||
          eventItem.thematique.toLowerCase().includes(normalized) ||
          eventItem.location.toLowerCase().includes(normalized)
        );
      })
      .sort((left, right) => right.id - left.id);
  }, [events, searchValue]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pagedEvents = filteredEvents.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);

  const stats = {
    total: events.length,
    withImage: events.filter((eventItem) => Boolean(eventItem.imageUrl)).length,
    online: events.filter((eventItem) => eventItem.format.toLowerCase().includes("ligne")).length,
    published: events.filter((eventItem) => getEventStatus(eventItem) === "published").length,
  };

  const resetToCreateMode = (sourceEvents: AgendaEvent[]) => {
    setEditingId(null);
    setSelectedImageFile(null);
    setFormState(createEmptyForm(getNextLegacyId(sourceEvents)));
  };

  const refreshEvents = async () => {
    const remoteEvents = await listShowcaseEvents();
    setEvents(remoteEvents);
    return remoteEvents;
  };

  const onImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImageFile(file);
  };

  const uploadSelectedImage = async () => {
    if (!selectedImageFile) return;

    setIsUploadingImage(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const uploaded = await uploadShowcaseEventImage(selectedImageFile);
      setFormState((previous) => ({ ...previous, imageUrl: uploaded.url }));
      setSelectedImageFile(null);
      setSuccessMessage("Image televersee avec succes.");
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de televerser l'image."));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    const id = editingId ?? Number(formState.id);
    if (!Number.isInteger(id) || id <= 0) {
      setErrorMessage("ID invalide. Utilise un nombre entier positif.");
      return;
    }

    if (
      !formState.title.trim() ||
      !formState.thematique.trim() ||
      !formState.format.trim() ||
      !formState.type.trim() ||
      !formState.date ||
      !formState.startTimeGmt ||
      !formState.endTimeGmt ||
      !formState.description.trim() ||
      !formState.location.trim()
    ) {
      setErrorMessage("Merci de renseigner tous les champs obligatoires.");
      return;
    }

    let nextImageUrl = formState.imageUrl.trim();

    // If a file is selected, upload it automatically before saving the event.
    if (selectedImageFile) {
      setIsUploadingImage(true);
      try {
        const uploaded = await uploadShowcaseEventImage(selectedImageFile);
        nextImageUrl = uploaded.url;
        setFormState((previous) => ({ ...previous, imageUrl: uploaded.url }));
        setSelectedImageFile(null);
      } catch (error) {
        setErrorMessage(normalizeErrorMessage(error, "Impossible de televerser l'image."));
        return;
      } finally {
        setIsUploadingImage(false);
      }
    }

    const { day, month, year } = buildDatePartsFromInput(formState.date);
    const existingEvent = events.find((eventItem) => eventItem.id === id);
    const formatTrimmed = formState.format.trim();
    const typeTrimmed = formState.type.trim();

    // Tags reconstruits a partir du type (premier) puis du format (second)
    // afin que la vitrine puisse afficher les deux infos.
    const computedTags: EventTag[] = [
      {
        label: typeTrimmed,
        iconName: "Video",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      defaultTagFromFormat(formatTrimmed),
    ];

    const payload: UpsertShowcaseEventInput = {
      id,
      day,
      month,
      year,
      thematique: formState.thematique.trim(),
      format: formatTrimmed,
      title: formState.title.trim(),
      description: formState.description.trim(),
      fullDescription: formState.fullDescription.trim() || undefined,
      time: buildGmtTimeLabel(formState.startTimeGmt, formState.endTimeGmt),
      location: formState.location.trim(),
      seats: formState.seats.trim() || undefined,
      status: existingEvent?.status ?? "draft",
      imageUrl: nextImageUrl || undefined,
      objectifs: splitLines(formState.objectifsText),
      tags: computedTags,
      intervenants: (existingEvent?.intervenants ?? []) as Intervenant[],
      programme: existingEvent?.programme ?? [],
    };

    setIsSaving(true);

    try {
      await upsertShowcaseEvent(payload);
      const remoteEvents = await refreshEvents();
      resetToCreateMode(remoteEvents);

      setSuccessMessage(
        editingId === null
          ? "Evenement cree et enregistre en base."
          : "Evenement modifie et enregistre en base.",
      );
    } catch (error) {
      setErrorMessage(
        normalizeErrorMessage(error, "Impossible d'enregistrer l'evenement en base."),
      );
    } finally {
      setIsSaving(false);
    }
  };

  const onEdit = (eventItem: AgendaEvent) => {
    setEditingId(eventItem.id);
    setSelectedImageFile(null);
    setFormState(eventToForm(eventItem));
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onDelete = async (eventId: number) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(
        `Supprimer l'evenement #${eventId} ? Cette action est irreversible.`,
      );
      if (!confirmed) return;
    }

    setDeletingId(eventId);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteShowcaseEvent(eventId);
      const remoteEvents = await refreshEvents();

      if (editingId === eventId || editingId === null) {
        resetToCreateMode(remoteEvents);
      }

      setSuccessMessage("Evenement supprime de la base.");
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de supprimer cet evenement."));
    } finally {
      setDeletingId(null);
    }
  };

  const onStatusChange = async (
    eventItem: AgendaEvent,
    status: ShowcaseStatus,
    closeTarget?: EventTarget | null,
  ) => {
    setStatusUpdatingId(eventItem.id);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await upsertShowcaseEvent({
        id: eventItem.id,
        day: eventItem.day,
        month: eventItem.month,
        year: eventItem.year,
        thematique: eventItem.thematique,
        format: eventItem.format,
        title: eventItem.title,
        description: eventItem.description,
        fullDescription: eventItem.fullDescription,
        time: eventItem.time,
        location: eventItem.location,
        seats: eventItem.seats,
        status,
        imageUrl: eventItem.imageUrl,
        objectifs: eventItem.objectifs,
        tags: eventItem.tags,
        intervenants: eventItem.intervenants,
        programme: eventItem.programme,
      });

      const remoteEvents = await refreshEvents();

      if (editingId === eventItem.id) {
        const fresh = remoteEvents.find((item) => item.id === eventItem.id);
        if (fresh) {
          setFormState(eventToForm(fresh));
        }
      }

      setSuccessMessage(`Statut mis a jour: ${statusLabel[status]}.`);
      closeActionMenu(closeTarget ?? null);
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de changer le statut."));
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const onCancelEdit = () => {
    resetToCreateMode(events);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onRefresh = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const remoteEvents = await refreshEvents();
      if (editingId === null) {
        setFormState((previous) => ({ ...previous, id: String(getNextLegacyId(remoteEvents)) }));
      }
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de rafraichir la liste."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Evenements total</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Avec image</p>
          <p className="mt-1 text-3xl font-bold text-[#0A2540]">{stats.withImage}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Formats en ligne</p>
          <p className="mt-1 text-3xl font-bold text-[#16A34A]">{stats.online}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Publies</p>
          <p className="mt-1 text-3xl font-bold text-green-700">{stats.published}</p>
        </article>
      </div>

      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-[#0A2540]">
          {editingId === null ? <Plus size={18} /> : <Edit3 size={18} />}
          {editingId === null ? "Ajouter un evenement" : `Modifier l'evenement #${editingId}`}
        </h2>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {editingId === null && (
              <input
                type="number"
                min={1}
                value={formState.id}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, id: event.target.value }))
                }
                placeholder="ID"
                className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
              />
            )}
            <input
              type="text"
              value={formState.title}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, title: event.target.value }))
              }
              placeholder="Titre"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <input
              type="text"
              value={formState.thematique}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, thematique: event.target.value }))
              }
              placeholder="Thematique"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <select
              value={formState.format}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, format: event.target.value }))
              }
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              {FORMAT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={
                TYPE_OPTIONS.includes(formState.type as (typeof TYPE_OPTIONS)[number])
                  ? formState.type
                  : MANUAL_OPTION
              }
              onChange={(event) => {
                const value = event.target.value;
                if (value === MANUAL_OPTION) {
                  setFormState((previous) => ({ ...previous, type: "" }));
                } else {
                  setFormState((previous) => ({ ...previous, type: value }));
                }
              }}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  Type : {option}
                </option>
              ))}
              <option value={MANUAL_OPTION}>Type : entree manuelle</option>
            </select>
            {!TYPE_OPTIONS.includes(formState.type as (typeof TYPE_OPTIONS)[number]) && (
              <input
                type="text"
                value={formState.type}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, type: event.target.value }))
                }
                placeholder="Type personnalise (ex: Hackathon)"
                className="h-10 rounded-lg border border-gray-200 px-3 text-sm md:col-span-2"
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              type="date"
              value={formState.date}
              onChange={(event) => setFormState((previous) => ({ ...previous, date: event.target.value }))}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <input
              type="time"
              value={formState.startTimeGmt}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, startTimeGmt: event.target.value }))
              }
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <input
              type="time"
              value={formState.endTimeGmt}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, endTimeGmt: event.target.value }))
              }
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
          </div>

          <p className="text-xs text-gray-500">Les heures sont en GMT.</p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <select
                value={formState.locationPreset}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value === MANUAL_OPTION) {
                    setFormState((previous) => ({
                      ...previous,
                      locationPreset: MANUAL_OPTION,
                      // Conserve la saisie precedente si elle n'etait pas un preset
                      location: LOCATION_PRESETS.includes(
                        previous.location as (typeof LOCATION_PRESETS)[number],
                      )
                        ? ""
                        : previous.location,
                    }));
                  } else {
                    setFormState((previous) => ({
                      ...previous,
                      locationPreset: value,
                      location: value,
                    }));
                  }
                }}
                className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
              >
                {LOCATION_PRESETS.map((option) => (
                  <option key={option} value={option}>
                    Lieu : {option}
                  </option>
                ))}
                <option value={MANUAL_OPTION}>Lieu : entree manuelle</option>
              </select>
              {formState.locationPreset === MANUAL_OPTION && (
                <input
                  type="text"
                  value={formState.location}
                  onChange={(event) =>
                    setFormState((previous) => ({
                      ...previous,
                      location: event.target.value,
                    }))
                  }
                  placeholder="Lieu (ex: Dakar, Senegal ou URL)"
                  className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
                />
              )}
            </div>
            <input
              type="text"
              value={formState.seats}
              onChange={(event) => setFormState((previous) => ({ ...previous, seats: event.target.value }))}
              placeholder="Places (optionnel)"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="url"
              value={formState.imageUrl}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, imageUrl: event.target.value }))
              }
              placeholder="URL image (optionnel)"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <div className="flex items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                <Upload size={14} />
                Choisir image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={onImageFileChange}
                />
              </label>
              <button
                type="button"
                onClick={uploadSelectedImage}
                disabled={!selectedImageFile || isUploadingImage}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0A2540] px-3 text-sm font-semibold text-white hover:bg-[#12385a] disabled:opacity-60"
              >
                {isUploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                Upload
              </button>
            </div>
          </div>

          {selectedImageFile && (
            <p className="text-xs text-gray-500">Fichier selectionne: {selectedImageFile.name}</p>
          )}

          {selectedImageFile && (
            <p className="text-xs text-gray-500">
              Le fichier sera automatiquement televerse lors de l'enregistrement.
            </p>
          )}

          {formState.imageUrl && (
            <div className="max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <img src={formState.imageUrl} alt="Apercu image evenement" className="h-44 w-full object-cover" />
            </div>
          )}

          <textarea
            value={formState.description}
            onChange={(event) =>
              setFormState((previous) => ({ ...previous, description: event.target.value }))
            }
            placeholder="Description courte"
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
          />

          <textarea
            value={formState.fullDescription}
            onChange={(event) =>
              setFormState((previous) => ({ ...previous, fullDescription: event.target.value }))
            }
            placeholder="Description detaillee (optionnel)"
            rows={4}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
          />

          <textarea
            value={formState.objectifsText}
            onChange={(event) =>
              setFormState((previous) => ({ ...previous, objectifsText: event.target.value }))
            }
            placeholder="Objectifs (une ligne = un objectif)"
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSaving || isUploadingImage}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0A2540] px-4 text-sm font-semibold text-white hover:bg-[#12385a] disabled:opacity-60"
            >
              {isSaving || isUploadingImage ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              {editingId === null ? "Enregistrer" : "Mettre a jour"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="inline-flex h-10 items-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Annuler edition
              </button>
            )}
          </div>
        </form>

        {errorMessage && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {successMessage}
          </p>
        )}
      </section>

      <section className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setPage(1);
              }}
              placeholder="Rechercher par titre, thematique ou lieu"
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm"
            />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw size={14} />
            Rafraichir
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-8 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            Chargement des evenements...
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pagedEvents.map((eventItem) => (
              <article key={eventItem.id} className="grid gap-4 p-5 xl:grid-cols-[220px_1fr_auto]">
                <div className="h-32 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  {eventItem.imageUrl ? (
                    <img
                      src={eventItem.imageUrl}
                      alt={eventItem.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <ImageIcon size={22} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    #{eventItem.id} · {eventItem.thematique}
                  </p>
                  <div>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass[getEventStatus(eventItem)]}`}>
                      {statusLabel[getEventStatus(eventItem)]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2540]">{eventItem.title}</h3>
                  <p className="text-sm text-slate-600">{eventItem.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {eventDateLabel(eventItem)}
                    </span>
                    <span>{eventItem.time}</span>
                    <span>{eventItem.location}</span>
                    <span>{eventItem.format}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 xl:flex-col xl:items-end">
                  <details className="relative inline-block text-left">
                    <summary className="list-none inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                      <MoreHorizontal size={13} />
                      Actions
                    </summary>

                    <div className="absolute left-0 xl:left-auto xl:right-0 z-20 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                      <button
                        type="button"
                        onClick={(event) => {
                          onEdit(eventItem);
                          closeActionMenu(event.currentTarget);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Edit3 size={13} />
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(eventItem, "published", event.currentTarget)}
                        disabled={statusUpdatingId === eventItem.id}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"
                      >
                        <CheckCircle2 size={13} />
                        Publier
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(eventItem, "draft", event.currentTarget)}
                        disabled={statusUpdatingId === eventItem.id}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
                      >
                        <CircleDashed size={13} />
                        Brouillon
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(eventItem, "completed", event.currentTarget)}
                        disabled={statusUpdatingId === eventItem.id}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 disabled:opacity-60"
                      >
                        <Video size={13} />
                        Terminer
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(eventItem, "cancelled", event.currentTarget)}
                        disabled={statusUpdatingId === eventItem.id}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        <Ban size={13} />
                        Annuler
                      </button>
                    </div>
                  </details>

                  <button
                    type="button"
                    onClick={() => onDelete(eventItem.id)}
                    disabled={deletingId === eventItem.id}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                  >
                    {deletingId === eventItem.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    Supprimer
                  </button>
                </div>
              </article>
            ))}

            {pagedEvents.length === 0 && (
              <p className="p-8 text-center text-sm text-gray-500">Aucun evenement trouve.</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Affichage {filteredEvents.length === 0 ? 0 : firstIndex + 1} a{" "}
            {Math.min(firstIndex + ITEMS_PER_PAGE, filteredEvents.length)} sur {filteredEvents.length}
          </p>
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              disabled={safePage <= 1}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 disabled:opacity-50"
              aria-label="Page precedente"
            >
              <ChevronLeft size={14} />
            </button>

            <span className="font-semibold text-gray-700">
              Page {safePage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 disabled:opacity-50"
              aria-label="Page suivante"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
