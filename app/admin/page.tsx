"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  UserPlus2,
  Users,
  XCircle,
} from "lucide-react";
import { type AdminEvent, type AdminRegistration, useAdminContext } from "@/components/admin/AdminContext";

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));

const registrationStatusLabel: Record<AdminRegistration["status"], string> = {
  pending: "En attente",
  approved: "Validee",
  rejected: "Refusee",
};

const eventStatusLabel: Record<AdminEvent["status"], string> = {
  draft: "Brouillon",
  published: "Publie",
  completed: "Termine",
  cancelled: "Annule",
};

export default function AdminDashboardPage() {
  const {
    summary,
    registrations,
    events,
    approveRegistration,
    rejectRegistration,
  } = useAdminContext();

  const recentRegistrations = [...registrations]
    .sort(
      (left, right) =>
        new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime(),
    )
    .slice(0, 5);

  const upcomingEvents = [...events]
    .sort((left, right) => new Date(left.startDate).getTime() - new Date(right.startDate).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0A2540] mb-2">
          <LayoutDashboard className="text-[#16A34A]" />
          Vue d'ensemble operationnelle
        </h2>
        <p className="text-gray-500 text-sm">
          Pilotage en temps reel des inscriptions, membres et evenements avec actions rapides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
            <Users size={20} />
          </div>
          <p className="text-sm text-gray-500">Membres actifs</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{summary.activeMembers}</p>
          <p className="text-xs text-gray-400 mt-1">Total membres: {summary.totalMembers}</p>
        </article>

        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
            <Clock3 size={20} />
          </div>
          <p className="text-sm text-gray-500">Demandes en attente</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{summary.pendingRegistrations}</p>
          <p className="text-xs text-gray-400 mt-1">Inscriptions a traiter</p>
        </article>

        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-3">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-sm text-gray-500">Inscriptions validees</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{summary.approvedRegistrations}</p>
          <p className="text-xs text-gray-400 mt-1">Depuis l'initialisation</p>
        </article>

        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
            <CalendarDays size={20} />
          </div>
          <p className="text-sm text-gray-500">Evenements publies</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{summary.publishedEvents}</p>
          <p className="text-xs text-gray-400 mt-1">Calendrier communautaire</p>
        </article>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#0A2540]">Inscriptions recentes</h3>
              <p className="text-xs text-gray-500 mt-1">Decisions rapides depuis le dashboard</p>
            </div>
            <Link
              href="/admin/inscriptions"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#0A2540] hover:text-[#16A34A]"
            >
              Voir tout
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentRegistrations.map((registration) => (
              <div key={registration.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{registration.fullName}</p>
                  <p className="text-sm text-gray-500 truncate">{registration.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {registrationStatusLabel[registration.status]} • {formatDate(registration.submittedAt)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {registration.status === "pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => approveRegistration(registration.id, "Jean Dupont")}
                        className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                      >
                        <CheckCircle2 size={14} />
                        Valider
                      </button>
                      <button
                        type="button"
                        onClick={() => rejectRegistration(registration.id, "Jean Dupont", "Rejet depuis dashboard")}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        <XCircle size={14} />
                        Refuser
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-gray-500">Aucune action requise</span>
                  )}
                </div>
              </div>
            ))}

            {recentRegistrations.length === 0 && (
              <p className="p-6 text-sm text-gray-500">Aucune inscription disponible.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-[#0A2540] mb-4">Actions rapides</h3>
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/admin/inscriptions"
                className="inline-flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-[#16A34A]/40 hover:text-[#16A34A]"
              >
                <span className="inline-flex items-center gap-2">
                  <UserPlus2 size={16} />
                  Traiter les inscriptions
                </span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/admin/membres"
                className="inline-flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-[#16A34A]/40 hover:text-[#16A34A]"
              >
                <span className="inline-flex items-center gap-2">
                  <Users size={16} />
                  Gerer les membres
                </span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/admin/evenements"
                className="inline-flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-[#16A34A]/40 hover:text-[#16A34A]"
              >
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  Planifier un evenement
                </span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-lg font-bold text-[#0A2540] mb-4 inline-flex items-center gap-2">
              <Activity size={18} className="text-[#16A34A]" />
              Prochains evenements
            </h3>
            <ul className="space-y-3">
              {upcomingEvents.map((eventItem) => (
                <li key={eventItem.id} className="rounded-lg border border-gray-100 p-3">
                  <p className="font-semibold text-sm text-gray-900">{eventItem.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(eventItem.startDate)} • {eventItem.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {eventStatusLabel[eventItem.status]} • {eventItem.registrations}/{eventItem.capacity}
                  </p>
                </li>
              ))}
              {upcomingEvents.length === 0 && (
                <li className="text-sm text-gray-500">Aucun evenement programme.</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
