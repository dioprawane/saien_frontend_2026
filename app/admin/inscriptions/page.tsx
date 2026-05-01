"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  MoreHorizontal,
  Search,
  ShieldX,
  Trash2,
  Undo2,
  UserCheck,
  Users,
} from "lucide-react";
import {
  type AdminRegistration,
  type MemberType,
  type RegistrationStatus,
  useAdminContext,
} from "@/components/admin/AdminContext";

const DEFAULT_ITEMS_PER_PAGE = 8;
const PAGE_SIZE_OPTIONS = [8, 12, 20] as const;

const statusLabel: Record<RegistrationStatus, string> = {
  pending: "En attente",
  approved: "Validee",
  rejected: "Refusee",
};

const statusClassName: Record<RegistrationStatus, string> = {
  pending: "bg-orange-100 text-orange-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const typeLabel: Record<MemberType, string> = {
  active: "Actif",
  adherent: "Adherent",
  honor: "Honneur",
  benefactor: "Bienfaiteur",
};

const sourceLabel: Record<AdminRegistration["source"], string> = {
  website: "Site web",
  event: "Evenement",
  referral: "Parrainage",
};

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));

export default function InscriptionsAdminPage() {
  const {
    registrations,
    summary,
    approveRegistration,
    rejectRegistration,
    setRegistrationPending,
    bulkSetRegistrationStatus,
    deleteRegistration,
  } = useAdminContext();

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RegistrationStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | MemberType>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);

  const filteredRegistrations = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return [...registrations]
      .filter((registration) => {
        if (statusFilter !== "all" && registration.status !== statusFilter) return false;
        if (typeFilter !== "all" && registration.type !== typeFilter) return false;

        if (!normalizedSearch) return true;

        return (
          registration.fullName.toLowerCase().includes(normalizedSearch) ||
          registration.email.toLowerCase().includes(normalizedSearch) ||
          registration.id.toLowerCase().includes(normalizedSearch)
        );
      })
      .sort(
        (left, right) =>
          new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime(),
      );
  }, [registrations, searchValue, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / itemsPerPage));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setSelectedIds((previous) =>
      previous.filter((id) => filteredRegistrations.some((registration) => registration.id === id)),
    );
  }, [filteredRegistrations]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * itemsPerPage;
  const pageRows = filteredRegistrations.slice(firstIndex, firstIndex + itemsPerPage);

  const allRowsSelected = pageRows.length > 0 && pageRows.every((row) => selectedIds.includes(row.id));

  const setAllRowsSelected = (selected: boolean) => {
    if (!selected) {
      setSelectedIds((previous) => previous.filter((id) => !pageRows.some((row) => row.id === id)));
      return;
    }

    setSelectedIds((previous) => {
      const next = new Set(previous);
      pageRows.forEach((row) => next.add(row.id));
      return [...next];
    });
  };

  const toggleRow = (registrationId: string) => {
    setSelectedIds((previous) =>
      previous.includes(registrationId)
        ? previous.filter((id) => id !== registrationId)
        : [...previous, registrationId],
    );
  };

  const resetSelection = () => setSelectedIds([]);

  const runBulkAction = (status: RegistrationStatus) => {
    if (selectedIds.length === 0) return;
    bulkSetRegistrationStatus(selectedIds, status);
    resetSelection();
  };

  const stats = [
    {
      label: "Inscriptions",
      value: registrations.length,
      icon: Users,
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
    {
      label: "En attente",
      value: summary.pendingRegistrations,
      icon: Clock3,
      color: "text-orange-700",
      bg: "bg-orange-100",
    },
    {
      label: "Validees",
      value: summary.approvedRegistrations,
      icon: CheckCircle2,
      color: "text-green-700",
      bg: "bg-green-100",
    },
    {
      label: "Refusees",
      value: summary.rejectedRegistrations,
      icon: ShieldX,
      color: "text-red-700",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-lg font-bold text-[#0A2540]">Demandes d'inscription</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Rechercher nom, email, ID"
                  className="h-10 w-64 rounded-lg border border-gray-200 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40"
                />
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                <Filter size={15} className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value as "all" | RegistrationStatus);
                    setPage(1);
                  }}
                  className="h-10 bg-transparent text-sm text-gray-700 focus:outline-none"
                >
                  <option value="all">Tous statuts</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Validees</option>
                  <option value="rejected">Refusees</option>
                </select>
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                <select
                  value={typeFilter}
                  onChange={(event) => {
                    setTypeFilter(event.target.value as "all" | MemberType);
                    setPage(1);
                  }}
                  className="h-10 bg-transparent text-sm text-gray-700 focus:outline-none"
                >
                  <option value="all">Tous types</option>
                  <option value="active">Actif</option>
                  <option value="adherent">Adherent</option>
                  <option value="honor">Honneur</option>
                  <option value="benefactor">Bienfaiteur</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => runBulkAction("approved")}
              disabled={selectedIds.length === 0}
              className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              Valider selection
            </button>
            <button
              type="button"
              onClick={() => runBulkAction("rejected")}
              disabled={selectedIds.length === 0}
              className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
              <ShieldX size={14} />
              Refuser selection
            </button>
            <button
              type="button"
              onClick={() => runBulkAction("pending")}
              disabled={selectedIds.length === 0}
              className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <Undo2 size={14} />
              Repasser en attente
            </button>
            {selectedIds.length > 0 && (
              <p className="text-xs text-gray-500">{selectedIds.length} element(s) selectionne(s)</p>
            )}

            <div className="ml-auto inline-flex items-center gap-2">
              <label htmlFor="inscriptions-page-size" className="text-xs text-gray-500">
                Lignes
              </label>
              <select
                id="inscriptions-page-size"
                value={itemsPerPage}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value));
                  setPage(1);
                  resetSelection();
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-4 py-3 border-b border-gray-100">
                  <input
                    type="checkbox"
                    checked={allRowsSelected}
                    onChange={(event) => setAllRowsSelected(event.target.checked)}
                    aria-label="Selectionner la page"
                  />
                </th>
                <th className="px-4 py-3 border-b border-gray-100">Nom</th>
                <th className="px-4 py-3 border-b border-gray-100">Email</th>
                <th className="px-4 py-3 border-b border-gray-100">Type</th>
                <th className="px-4 py-3 border-b border-gray-100">Source</th>
                <th className="px-4 py-3 border-b border-gray-100">Date</th>
                <th className="px-4 py-3 border-b border-gray-100">Statut</th>
                <th className="px-4 py-3 border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageRows.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(registration.id)}
                      onChange={() => toggleRow(registration.id)}
                      aria-label={`Selectionner ${registration.fullName}`}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900">{registration.fullName}</p>
                    <p className="text-xs text-gray-400">{registration.id}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{registration.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{typeLabel[registration.type]}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{sourceLabel[registration.source]}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{formatDate(registration.submittedAt)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName[registration.status]}`}
                    >
                      {statusLabel[registration.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <RegistrationRowActions
                      registration={registration}
                      onApprove={() => approveRegistration(registration.id, "Jean Dupont")}
                      onReject={() =>
                        rejectRegistration(registration.id, "Jean Dupont", "Refus administratif")
                      }
                      onSetPending={() => setRegistrationPending(registration.id)}
                      onDelete={() => deleteRegistration(registration.id)}
                    />
                  </td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                    Aucune inscription ne correspond aux filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-500">
          <p>
            Affichage {filteredRegistrations.length === 0 ? 0 : firstIndex + 1} a{" "}
            {Math.min(firstIndex + itemsPerPage, filteredRegistrations.length)} sur {filteredRegistrations.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPage((previous) => Math.max(1, previous - 1));
                resetSelection();
              }}
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
              onClick={() => {
                setPage((previous) => Math.min(totalPages, previous + 1));
                resetSelection();
              }}
              disabled={safePage >= totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationRowActions({
  registration,
  onApprove,
  onReject,
  onSetPending,
  onDelete,
}: {
  registration: AdminRegistration;
  onApprove: () => void;
  onReject: () => void;
  onSetPending: () => void;
  onDelete: () => void;
}) {
  const closeMenu = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return;
    target.closest("details")?.removeAttribute("open");
  };

  return (
    <details className="relative inline-block text-left">
      <summary className="list-none inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
        <MoreHorizontal size={16} />
      </summary>

      <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
        {registration.status !== "approved" && (
          <button
            type="button"
            onClick={(event) => {
              onApprove();
              closeMenu(event.currentTarget);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-green-700 hover:bg-green-50"
          >
            <UserCheck size={13} />
            Valider
          </button>
        )}

        {registration.status !== "rejected" && (
          <button
            type="button"
            onClick={(event) => {
              onReject();
              closeMenu(event.currentTarget);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
          >
            <ShieldX size={13} />
            Refuser
          </button>
        )}

        {registration.status !== "pending" && (
          <button
            type="button"
            onClick={(event) => {
              onSetPending();
              closeMenu(event.currentTarget);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            <Undo2 size={13} />
            Remettre en attente
          </button>
        )}

        <button
          type="button"
          onClick={(event) => {
            onDelete();
            closeMenu(event.currentTarget);
          }}
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100"
        >
          <Trash2 size={13} />
          Supprimer
        </button>
      </div>
    </details>
  );
}
