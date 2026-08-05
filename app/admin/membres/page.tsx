"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import {
  type AdminMember,
  type AdminRole,
  type AdminMemberStatus as MemberStatus,
  type AdminMemberType as MemberType,
  createAdminMember,
  deleteAdminMember,
  getAdminMembers,
  updateAdminMemberRole,
  updateAdminMemberStatus,
  updateAdminMemberType,
} from "@/lib/api/admin";
import { getApiErrorMessage } from "@/lib/api/errors";

const typeLabel: Record<MemberType, string> = {
  active: "Actif",
  adherent: "Adherent",
  honor: "Honneur",
  benefactor: "Bienfaiteur",
};

const roleLabel: Record<AdminRole, string> = {
  member: "Membre",
  admin: "Admin",
  "super-admin": "Super Admin",
  "admin-event": "Admin Evenements",
};

const statusLabel: Record<MemberStatus, string> = {
  active: "Actif",
  pending: "En cours",
  expired: "Expire",
  suspended: "Suspendu",
};

const STATUS_ACTIONS: Array<{ value: MemberStatus; label: string }> = [
  { value: "active", label: "Activer" },
  { value: "pending", label: "En cours" },
  { value: "expired", label: "Expire" },
  { value: "suspended", label: "Suspendre" },
];

const getStatusBadgeClass = (status: MemberStatus) => {
  if (status === "active") return "bg-emerald-100 text-emerald-700";
  if (status === "pending") return "bg-amber-100 text-amber-700";
  if (status === "expired") return "bg-slate-100 text-slate-700";
  return "bg-rose-100 text-rose-700";
};

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));

const DEFAULT_ITEMS_PER_PAGE = 8;
const PAGE_SIZE_OPTIONS = [8, 12, 20] as const;

export default function MembresAdminPage() {
  const supportsExtendedStatuses = true;

  const [members, setMembers] = useState<AdminMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | MemberType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberStatus>("all");
  const [roleFilter, setRoleFilter] = useState<"all" | AdminRole>("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [newMember, setNewMember] = useState({
    fullName: "",
    email: "",
    type: "active" as MemberType,
    city: "",
    role: "member" as AdminRole,
  });

  const loadMembers = useCallback(async () => {
    setIsLoadingMembers(true);
    setRequestError(null);

    try {
      const response = await getAdminMembers();
      setMembers(response);
    } catch (error) {
      setRequestError(getApiErrorMessage(error, "Impossible de charger les membres depuis la base de données."));
    } finally {
      setIsLoadingMembers(false);
    }
  }, []);

  useEffect(() => {
    void loadMembers();
  }, [loadMembers]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return [...members]
      .filter((member) => {
        if (typeFilter !== "all" && member.type !== typeFilter) return false;
        if (statusFilter !== "all" && member.status !== statusFilter) return false;
        if (roleFilter !== "all" && member.role !== roleFilter) return false;

        if (!normalizedSearch) return true;

        return (
          member.fullName.toLowerCase().includes(normalizedSearch) ||
          member.email.toLowerCase().includes(normalizedSearch) ||
          member.city.toLowerCase().includes(normalizedSearch)
        );
      })
      .sort((left, right) => left.fullName.localeCompare(right.fullName));
  }, [members, roleFilter, searchValue, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / itemsPerPage));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * itemsPerPage;
  const pageRows = filteredMembers.slice(firstIndex, firstIndex + itemsPerPage);

  const stats = {
    total: members.length,
    active: members.filter((member) => member.status === "active").length,
    suspended: members.filter((member) => member.status === "suspended").length,
    admins: members.filter((member) => member.role !== "member").length,
  };

  const replaceMember = (updated: AdminMember) => {
    setMembers((previous) =>
      previous.map((member) =>
        member.id === updated.id ? updated : member,
      ),
    );
  };

  const handleCreateMember = async () => {
    if (!newMember.fullName.trim() || !newMember.email.trim()) return;

    setIsMutating(true);
    setRequestError(null);

    try {
      const created = await createAdminMember({
        fullName: newMember.fullName.trim(),
        email: newMember.email.trim(),
        type: newMember.type,
        city: newMember.city.trim(),
        role: newMember.role,
        title: "",
        phone: "",
        country: "",
        expertise: "",
      });

      setMembers((previous) => [created, ...previous]);

      setNewMember({
        fullName: "",
        email: "",
        type: "active",
        city: "",
        role: "member",
      });
    } catch (error) {
      setRequestError(getApiErrorMessage(error, "Impossible d'ajouter le membre."));
    } finally {
      setIsMutating(false);
    }
  };

  const handleSetMemberStatus = async (memberId: string, status: MemberStatus) => {
    if (!supportsExtendedStatuses && (status === "pending" || status === "expired")) {
      setRequestError(
        "Les statuts En cours et Expire ne sont pas encore actives. Activez NEXT_PUBLIC_MEMBER_STATUS_EXTENDED=true apres la mise a jour backend + BDD.",
      );
      return;
    }

    setIsMutating(true);
    setRequestError(null);

    try {
      const updated = await updateAdminMemberStatus(memberId, status);
      replaceMember(updated);
    } catch (error) {
      setRequestError(getApiErrorMessage(error, "Impossible de mettre à jour le statut du membre."));
    } finally {
      setIsMutating(false);
    }
  };

  const handleChangeMemberType = async (memberId: string, type: MemberType) => {
    setIsMutating(true);
    setRequestError(null);

    try {
      const updated = await updateAdminMemberType(memberId, type);
      replaceMember(updated);
    } catch (error) {
      setRequestError(getApiErrorMessage(error, "Impossible de mettre à jour le type du membre."));
    } finally {
      setIsMutating(false);
    }
  };

  const handleChangeMemberRole = async (memberId: string, role: AdminRole) => {
    setIsMutating(true);
    setRequestError(null);

    try {
      const updated = await updateAdminMemberRole(memberId, role);
      replaceMember(updated);
    } catch (error) {
      setRequestError(getApiErrorMessage(error, "Impossible de mettre à jour le rôle du membre."));
    } finally {
      setIsMutating(false);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    setIsMutating(true);
    setRequestError(null);

    try {
      await deleteAdminMember(memberId);
      setMembers((previous) => previous.filter((member) => member.id !== memberId));
    } catch (error) {
      setRequestError(getApiErrorMessage(error, "Impossible de supprimer ce membre."));
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Membres total</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
        </article>
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Membres actifs</p>
          <p className="mt-1 text-3xl font-bold text-green-700">{stats.active}</p>
        </article>
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Comptes suspendus</p>
          <p className="mt-1 text-3xl font-bold text-orange-700">{stats.suspended}</p>
        </article>
        <article className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Roles admin</p>
          <p className="mt-1 text-3xl font-bold text-blue-700">{stats.admins}</p>
        </article>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
        <h2 className="text-lg font-bold text-[#0A2540] inline-flex items-center gap-2">
          <Plus size={18} className="text-[#16A34A]" />
          Ajouter un membre
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
          <input
            type="text"
            value={newMember.fullName}
            onChange={(event) => setNewMember((previous) => ({ ...previous, fullName: event.target.value }))}
            placeholder="Nom complet"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm min-w-0"
          />
          <input
            type="email"
            value={newMember.email}
            onChange={(event) => setNewMember((previous) => ({ ...previous, email: event.target.value }))}
            placeholder="Email"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm min-w-0"
          />
          <select
            value={newMember.type}
            onChange={(event) =>
              setNewMember((previous) => ({ ...previous, type: event.target.value as MemberType }))
            }
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm min-w-0"
          >
            <option value="active">Actif</option>
            <option value="adherent">Adherent</option>
            <option value="honor">Honneur</option>
            <option value="benefactor">Bienfaiteur</option>
          </select>
          <input
            type="text"
            value={newMember.city}
            onChange={(event) => setNewMember((previous) => ({ ...previous, city: event.target.value }))}
            placeholder="Ville"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm min-w-0"
          />
          <select
            value={newMember.role}
            onChange={(event) =>
              setNewMember((previous) => ({ ...previous, role: event.target.value as AdminRole }))
            }
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm min-w-0"
          >
            <option value="member">Membre</option>
            <option value="admin">Admin</option>
            <option value="admin-event">Admin Evenements</option>
            <option value="super-admin">Super Admin</option>
          </select>
          <button
            type="button"
            onClick={() => {
              void handleCreateMember();
            }}
            disabled={isMutating}
            className="h-10 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A2540] px-4 text-sm font-semibold text-white hover:bg-[#12385a] disabled:opacity-60"
          >
            <Plus size={14} />
            Ajouter
          </button>
        </div>

        {requestError && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {requestError}
          </p>
        )}
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 space-y-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setPage(1);
              }}
              placeholder="Rechercher membre"
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value as "all" | MemberType);
                setPage(1);
              }}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              <option value="all">Tous types</option>
              <option value="active">Actif</option>
              <option value="adherent">Adherent</option>
              <option value="honor">Honneur</option>
              <option value="benefactor">Bienfaiteur</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as "all" | MemberStatus);
                setPage(1);
              }}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              <option value="all">Tous statuts</option>
              <option value="active">Actif</option>
              <option value="pending">En cours</option>
              <option value="expired">Expire</option>
              <option value="suspended">Suspendu</option>
            </select>

            <select
              value={roleFilter}
              onChange={(event) => {
                setRoleFilter(event.target.value as "all" | AdminRole);
                setPage(1);
              }}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              <option value="all">Tous roles</option>
              <option value="member">Membre</option>
              <option value="admin">Admin</option>
              <option value="admin-event">Admin Evenements</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {isLoadingMembers && (
            <p className="rounded-lg border border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
              Chargement des membres depuis la base de données...
            </p>
          )}

          {pageRows.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              supportsExtendedStatuses={supportsExtendedStatuses}
              onStatusChange={(status) => {
                void handleSetMemberStatus(member.id, status);
              }}
              onTypeChange={(type) => {
                void handleChangeMemberType(member.id, type);
              }}
              onRoleChange={(role) => {
                void handleChangeMemberRole(member.id, role);
              }}
              onDelete={() => {
                void handleDeleteMember(member.id);
              }}
            />
          ))}

          {!isLoadingMembers && pageRows.length === 0 && (
            <p className="rounded-lg border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-500">
              Aucun membre ne correspond aux criteres actuels.
            </p>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-3">Membre</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Ville</th>
                <th className="px-4 py-3">Adhesion</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoadingMembers && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                    Chargement des membres depuis la base de données...
                  </td>
                </tr>
              )}

              {pageRows.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  supportsExtendedStatuses={supportsExtendedStatuses}
                  onStatusChange={(status) => {
                    void handleSetMemberStatus(member.id, status);
                  }}
                  onTypeChange={(type) => {
                    void handleChangeMemberType(member.id, type);
                  }}
                  onRoleChange={(role) => {
                    void handleChangeMemberRole(member.id, role);
                  }}
                  onDelete={() => {
                    void handleDeleteMember(member.id);
                  }}
                />
              ))}

              {!isLoadingMembers && pageRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                    Aucun membre ne correspond aux criteres actuels.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-500">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
            <p>
              Affichage {filteredMembers.length === 0 ? 0 : firstIndex + 1} a{" "}
              {Math.min(firstIndex + itemsPerPage, filteredMembers.length)} sur {filteredMembers.length}
            </p>
            <div className="inline-flex items-center gap-2">
              <label htmlFor="membres-page-size" className="text-xs text-gray-500">
                Lignes
              </label>
              <select
                id="membres-page-size"
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

function MemberCard({
  member,
  supportsExtendedStatuses,
  onStatusChange,
  onTypeChange,
  onRoleChange,
  onDelete,
}: {
  member: AdminMember;
  supportsExtendedStatuses: boolean;
  onStatusChange: (status: MemberStatus) => void;
  onTypeChange: (type: MemberType) => void;
  onRoleChange: (role: AdminRole) => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900">{member.fullName}</p>
          <p className="truncate text-sm text-gray-600">{member.email}</p>
        </div>

        <MemberActionsMenu
          member={member}
          supportsExtendedStatuses={supportsExtendedStatuses}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        <label className="rounded-lg bg-gray-50 p-2">
          <p className="text-[11px] uppercase tracking-wide text-gray-400">Type</p>
          <select
            value={member.type ?? ""}
            onChange={(event) => onTypeChange(event.target.value as MemberType)}
            className="mt-1 h-8 w-full rounded-md border border-gray-200 px-2 text-xs"
          >
            <option value="">—</option>
            <option value="active">{typeLabel.active}</option>
            <option value="adherent">{typeLabel.adherent}</option>
            <option value="honor">{typeLabel.honor}</option>
            <option value="benefactor">{typeLabel.benefactor}</option>
          </select>
        </label>

        <label className="rounded-lg bg-gray-50 p-2">
          <p className="text-[11px] uppercase tracking-wide text-gray-400">Role</p>
          <select
            value={member.role}
            onChange={(event) => onRoleChange(event.target.value as AdminRole)}
            className="mt-1 h-8 w-full rounded-md border border-gray-200 px-2 text-xs"
          >
            <option value="member">{roleLabel.member}</option>
            <option value="admin">{roleLabel.admin}</option>
            <option value="admin-event">{roleLabel["admin-event"]}</option>
            <option value="super-admin">{roleLabel["super-admin"]}</option>
          </select>
        </label>

        <div className="rounded-lg bg-gray-50 p-2">
          <p className="text-[11px] uppercase tracking-wide text-gray-400">Statut</p>
          {member.status ? (
            <span
              className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusBadgeClass(member.status)}`}
            >
              {statusLabel[member.status]}
            </span>
          ) : (
            <span className="mt-1 text-xs text-gray-400">—</span>
          )}
        </div>

        <div className="rounded-lg bg-gray-50 p-2">
          <p className="text-[11px] uppercase tracking-wide text-gray-400">Ville</p>
          <p className="mt-1 font-medium text-gray-700">{member.city}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">Adhesion: {formatDate(member.joinedAt)}</p>
    </article>
  );
}

function MemberRow({
  member,
  supportsExtendedStatuses,
  onStatusChange,
  onTypeChange,
  onRoleChange,
  onDelete,
}: {
  member: AdminMember;
  supportsExtendedStatuses: boolean;
  onStatusChange: (status: MemberStatus) => void;
  onTypeChange: (type: MemberType) => void;
  onRoleChange: (role: AdminRole) => void;
  onDelete: () => void;
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-4">
        <p className="font-semibold text-gray-900">{member.fullName}</p>
        <p className="text-xs text-gray-500">{member.email}</p>
      </td>
      <td className="px-4 py-4">
        <select
          value={member.type ?? ""}
          onChange={(event) => onTypeChange(event.target.value as MemberType)}
          className="h-8 rounded-md border border-gray-200 px-2 text-xs"
        >
          <option value="">—</option>
          <option value="active">{typeLabel.active}</option>
          <option value="adherent">{typeLabel.adherent}</option>
          <option value="honor">{typeLabel.honor}</option>
          <option value="benefactor">{typeLabel.benefactor}</option>
        </select>
      </td>
      <td className="px-4 py-4">
        {member.status ? (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(member.status)}`}
          >
            {statusLabel[member.status]}
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
      <td className="px-4 py-4">
        <select
          value={member.role}
          onChange={(event) => onRoleChange(event.target.value as AdminRole)}
          className="h-8 rounded-md border border-gray-200 px-2 text-xs"
        >
          <option value="member">{roleLabel.member}</option>
          <option value="admin">{roleLabel.admin}</option>
          <option value="admin-event">{roleLabel["admin-event"]}</option>
          <option value="super-admin">{roleLabel["super-admin"]}</option>
        </select>
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{member.city}</td>
      <td className="px-4 py-4 text-sm text-gray-500">{formatDate(member.joinedAt)}</td>
      <td className="px-4 py-4 text-right">
        <MemberActionsMenu
          member={member}
          supportsExtendedStatuses={supportsExtendedStatuses}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

function MemberActionsMenu({
  member,
  supportsExtendedStatuses,
  onStatusChange,
  onDelete,
}: {
  member: AdminMember;
  supportsExtendedStatuses: boolean;
  onStatusChange: (status: MemberStatus) => void;
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
        {STATUS_ACTIONS.map((action) => (
          (() => {
            const isUnsupportedOnProd =
              !supportsExtendedStatuses && (action.value === "pending" || action.value === "expired");

            return (
          <button
            key={action.value}
            type="button"
            onClick={(event) => {
              if (isUnsupportedOnProd) {
                closeMenu(event.currentTarget);
                return;
              }
              onStatusChange(action.value);
              closeMenu(event.currentTarget);
            }}
            className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-xs font-semibold ${
              isUnsupportedOnProd
                ? "cursor-not-allowed text-gray-400"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            disabled={isUnsupportedOnProd}
          >
            <span>{isUnsupportedOnProd ? `${action.label} (indispo)` : action.label}</span>
            {member.status === action.value && <Check size={13} className="text-emerald-600" />}
          </button>
            );
          })()
        ))}

        <div className="my-1 h-px bg-gray-100" />

        <button
          type="button"
          onClick={(event) => {
            onDelete();
            closeMenu(event.currentTarget);
          }}
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
        >
          <Trash2 size={13} />
          Supprimer
        </button>
      </div>
    </details>
  );
}
