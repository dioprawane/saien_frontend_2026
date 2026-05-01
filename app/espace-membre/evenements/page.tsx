import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mes événements — SAIEN",
  description: "Consultez vos événements à venir et vos inscriptions SAIEN.",
};

const MEMBER_EVENTS = [
  {
    title: "Conférence IA Responsable 2026",
    date: "18 Juin 2026",
    time: "18:30",
    location: "Paris, France",
    status: "Inscrit",
  },
  {
    title: "Atelier MLOps pour scale-up",
    date: "03 Juillet 2026",
    time: "19:00",
    location: "En ligne",
    status: "Invitation",
  },
  {
    title: "Meetup Diaspora Data Science",
    date: "24 Juillet 2026",
    time: "18:00",
    location: "Montréal, Canada",
    status: "Inscrit",
  },
];

export default function EspaceMembreEvenementsPage() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">Mes événements</h1>
          <p className="mt-2 text-slate-500">Suivez vos inscriptions et confirmez vos participations aux prochains rendez-vous.</p>
        </div>

        <div className="space-y-3">
          {MEMBER_EVENTS.map((event) => (
            <article key={event.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0A3458]">{event.title}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" aria-hidden="true" />{event.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" aria-hidden="true" />{event.time}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" />{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${event.status === "Inscrit" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {event.status}
                  </span>
                  <Link href="/evenements" className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                    Détails
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
