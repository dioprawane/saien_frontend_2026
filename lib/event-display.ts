import type { AgendaEvent } from "@/lib/events-data";

export type EventChronologyState = "upcoming" | "today" | "finished" | "cancelled";

type EventChronology = {
  state: EventChronologyState;
  label: string;
  className: string;
};

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

const normalizeMonthKey = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

export function toEventDate(event: AgendaEvent): Date | null {
  const year = Number(event.year);
  const day = Number(event.day);
  const month = MONTH_INDEX_BY_KEY[normalizeMonthKey(event.month)] ?? -1;

  if (!Number.isInteger(year) || !Number.isInteger(day) || month < 0) {
    return null;
  }

  const date = new Date(year, month, day, 0, 0, 0, 0);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function getEventChronology(event: AgendaEvent, now = new Date()): EventChronology {
  if (event.status === "cancelled") {
    return {
      state: "cancelled",
      label: "Annule",
      className: "bg-red-100 text-red-700",
    };
  }

  if (event.status === "completed") {
    return {
      state: "finished",
      label: "Termine",
      className: "bg-slate-100 text-slate-700",
    };
  }

  const eventDate = toEventDate(event);
  if (!eventDate) {
    return {
      state: "upcoming",
      label: "A venir",
      className: "bg-emerald-100 text-emerald-700",
    };
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  if (eventDate.getTime() === today.getTime()) {
    return {
      state: "today",
      label: "Aujourd'hui",
      className: "bg-blue-100 text-blue-700",
    };
  }

  if (eventDate.getTime() < today.getTime()) {
    return {
      state: "finished",
      label: "Termine",
      className: "bg-slate-100 text-slate-700",
    };
  }

  return {
    state: "upcoming",
    label: "A venir",
    className: "bg-emerald-100 text-emerald-700",
  };
}

export function compareEventsByChronology(left: AgendaEvent, right: AgendaEvent, now = new Date()) {
  const priority: Record<EventChronologyState, number> = {
    today: 0,
    upcoming: 1,
    finished: 2,
    cancelled: 3,
  };

  const leftChronology = getEventChronology(left, now);
  const rightChronology = getEventChronology(right, now);

  if (priority[leftChronology.state] !== priority[rightChronology.state]) {
    return priority[leftChronology.state] - priority[rightChronology.state];
  }

  const leftDate = toEventDate(left);
  const rightDate = toEventDate(right);

  if (leftDate && rightDate) {
    if (leftChronology.state === "finished" || leftChronology.state === "cancelled") {
      return rightDate.getTime() - leftDate.getTime();
    }

    return leftDate.getTime() - rightDate.getTime();
  }

  return left.id - right.id;
}

export function getFormatBadgeClass(format: string): string {
  const normalized = format.toLowerCase();

  if (normalized.includes("ligne") || normalized.includes("online")) {
    return "bg-blue-100 text-blue-700";
  }

  if (normalized.includes("hybride") || normalized.includes("hybrid")) {
    return "bg-violet-100 text-violet-700";
  }

  if (normalized.includes("presentiel") || normalized.includes("présentiel") || normalized.includes("onsite")) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}
