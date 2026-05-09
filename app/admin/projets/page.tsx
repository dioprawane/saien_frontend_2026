"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Edit3,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import {
  deleteShowcaseProject,
  listAdminShowcaseProjects,
  upsertShowcaseProject,
  type ShowcaseProject,
  type UpsertShowcaseProjectInput,
} from "@/lib/api/showcase";

type ProjectFormState = {
  slug: string;
  badge: string;
  imageUrl: string;
  title: string;
  description: string;
  fullDescription: string;
  footerType: string;
  footerValue: string;
  featuredOnVision: boolean;
  publicVisible: boolean;
  period: string;
  location: string;
  lead: string;
  objectivesText: string;
  outcomesText: string;
};

const ITEMS_PER_PAGE = 8;
const FOOTER_TYPES = ["registrations", "mentors", "partners"] as const;

const createEmptyForm = (): ProjectFormState => ({
  slug: "",
  badge: "",
  imageUrl: "",
  title: "",
  description: "",
  fullDescription: "",
  footerType: "registrations",
  footerValue: "",
  featuredOnVision: true,
  publicVisible: true,
  period: "",
  location: "",
  lead: "",
  objectivesText: "",
  outcomesText: "",
});

const splitLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const normalizeErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const slugify = (value: string) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const projectToForm = (project: ShowcaseProject): ProjectFormState => ({
  slug: project.slug,
  badge: project.badge,
  imageUrl: project.imageUrl ?? "",
  title: project.title,
  description: project.description,
  fullDescription: project.fullDescription,
  footerType: project.footerType,
  footerValue: project.footerValue,
  featuredOnVision: project.featuredOnVision,
  publicVisible: project.publicVisible,
  period: project.period,
  location: project.location,
  lead: project.lead,
  objectivesText: project.objectives.join("\n"),
  outcomesText: project.outcomes.join("\n"),
});

const toUpsertInput = (formState: ProjectFormState): UpsertShowcaseProjectInput => ({
  slug: formState.slug.trim(),
  badge: formState.badge.trim(),
  imageUrl: formState.imageUrl.trim(),
  title: formState.title.trim(),
  description: formState.description.trim(),
  fullDescription: formState.fullDescription.trim(),
  footerType: formState.footerType.trim(),
  footerValue: formState.footerValue.trim(),
  featuredOnVision: formState.featuredOnVision,
  publicVisible: formState.publicVisible,
  period: formState.period.trim(),
  location: formState.location.trim(),
  lead: formState.lead.trim(),
  objectives: splitLines(formState.objectivesText),
  outcomes: splitLines(formState.outcomesText),
});

const toUpsertInputFromProject = (
  project: ShowcaseProject,
  overrides?: Partial<Pick<ShowcaseProject, "publicVisible" | "featuredOnVision">>,
): UpsertShowcaseProjectInput => ({
  slug: project.slug,
  badge: project.badge,
  imageUrl: project.imageUrl ?? "",
  title: project.title,
  description: project.description,
  fullDescription: project.fullDescription,
  footerType: project.footerType,
  footerValue: project.footerValue,
  featuredOnVision: overrides?.featuredOnVision ?? project.featuredOnVision,
  publicVisible: overrides?.publicVisible ?? project.publicVisible,
  period: project.period,
  location: project.location,
  lead: project.lead,
  objectives: project.objectives,
  outcomes: project.outcomes,
});

export default function ProjetsAdminPage() {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [visibilityUpdatingSlug, setVisibilityUpdatingSlug] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formState, setFormState] = useState<ProjectFormState>(() => createEmptyForm());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const remoteProjects = await listAdminShowcaseProjects();
        if (cancelled) return;
        setProjects(remoteProjects);
      } catch (error) {
        if (cancelled) return;
        setErrorMessage(normalizeErrorMessage(error, "Impossible de charger les projets depuis la base."));
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();

    return [...projects]
      .filter((project) => {
        if (!normalized) return true;

        return (
          project.title.toLowerCase().includes(normalized)
          || project.slug.toLowerCase().includes(normalized)
          || project.badge.toLowerCase().includes(normalized)
        );
      })
      .sort((left, right) => left.title.localeCompare(right.title, "fr"));
  }, [projects, searchValue]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pagedProjects = filteredProjects.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);

  const stats = {
    total: projects.length,
    publicVisible: projects.filter((project) => project.publicVisible).length,
    hidden: projects.filter((project) => !project.publicVisible).length,
    featuredOnVision: projects.filter((project) => project.featuredOnVision).length,
  };

  const refreshProjects = async () => {
    const remoteProjects = await listAdminShowcaseProjects();
    setProjects(remoteProjects);
    return remoteProjects;
  };

  const resetToCreateMode = () => {
    setEditingSlug(null);
    setFormState(createEmptyForm());
  };

  const onRefresh = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await refreshProjects();
      setSuccessMessage("Liste des projets rafraichie.");
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de rafraichir les projets."));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateFromTitle = () => {
    if (!formState.slug.trim() && formState.title.trim()) {
      setFormState((previous) => ({
        ...previous,
        slug: slugify(previous.title),
      }));
    }
  };

  const onEdit = (project: ShowcaseProject) => {
    setEditingSlug(project.slug);
    setFormState(projectToForm(project));
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onCancelEdit = () => {
    resetToCreateMode();
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onDelete = async (slug: string) => {
    const confirmed = window.confirm("Supprimer ce projet ? Cette action est irreversible.");
    if (!confirmed) return;

    setDeletingSlug(slug);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteShowcaseProject(slug);
      const remoteProjects = await refreshProjects();

      if (editingSlug === slug) {
        resetToCreateMode();
      }

      setSuccessMessage("Projet supprime avec succes.");

      if (remoteProjects.length === 0) {
        setPage(1);
      }
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de supprimer le projet."));
    } finally {
      setDeletingSlug(null);
    }
  };

  const onToggleVisibility = async (project: ShowcaseProject) => {
    setVisibilityUpdatingSlug(project.slug);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const updated = await upsertShowcaseProject(
        toUpsertInputFromProject(project, { publicVisible: !project.publicVisible }),
        project.slug,
      );

      setProjects((previous) =>
        previous.map((item) => (item.slug === project.slug ? updated : item)),
      );

      if (editingSlug === project.slug) {
        setFormState((previous) => ({
          ...previous,
          publicVisible: updated.publicVisible,
        }));
      }

      setSuccessMessage(
        updated.publicVisible
          ? "Projet rendu visible au public."
          : "Projet masque du public.",
      );
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de changer la visibilite du projet."));
    } finally {
      setVisibilityUpdatingSlug(null);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const slug = formState.slug.trim();
    if (!slug) {
      setErrorMessage("Le slug est obligatoire.");
      return;
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      setErrorMessage("Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets.");
      return;
    }

    if (
      !formState.badge.trim()
      || !formState.imageUrl.trim()
      || !formState.title.trim()
      || !formState.description.trim()
      || !formState.fullDescription.trim()
      || !formState.footerType.trim()
      || !formState.footerValue.trim()
      || !formState.period.trim()
      || !formState.location.trim()
      || !formState.lead.trim()
    ) {
      setErrorMessage("Merci de renseigner tous les champs obligatoires du projet.");
      return;
    }

    if (editingSlug !== null && slug !== editingSlug) {
      setErrorMessage("Le slug ne peut pas etre modifie en mode edition. Cree un nouveau projet pour changer de slug.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = toUpsertInput(formState);
      const persisted = await upsertShowcaseProject(payload, editingSlug ?? payload.slug);

      setProjects((previous) => {
        const existingIndex = previous.findIndex((item) => item.slug === (editingSlug ?? payload.slug));
        if (existingIndex === -1) {
          return [...previous, persisted];
        }

        const next = [...previous];
        next[existingIndex] = persisted;
        return next;
      });

      setSuccessMessage(
        editingSlug === null
          ? "Projet cree et enregistre en base."
          : "Projet mis a jour en base.",
      );

      resetToCreateMode();
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible d'enregistrer le projet."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-[#0A2540]">Gestion des projets</h2>
        <p className="mt-1 text-sm text-gray-500">
          Ajoute, modifie, supprime et controle la visibilite publique des projets depuis la BDD.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total projets</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
        </article>

        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Visibles public</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.publicVisible}</p>
        </article>

        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Masques public</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.hidden}</p>
        </article>

        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Mis en avant Vision</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.featuredOnVision}</p>
        </article>
      </section>

      {(errorMessage || successMessage) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            errorMessage
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {errorMessage ?? successMessage}
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0A2540]">
              {editingSlug ? "Modifier un projet" : "Nouveau projet"}
            </h3>
            {editingSlug && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                <Ban size={14} />
                Annuler edition
              </button>
            )}
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block text-sm text-gray-700">
                Slug *
                <input
                  type="text"
                  value={formState.slug}
                  disabled={editingSlug !== null}
                  onBlur={onCreateFromTitle}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, slug: slugify(event.target.value) }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50"
                  placeholder="ex: saien-talks"
                />
              </label>

              <label className="block text-sm text-gray-700">
                Badge *
                <input
                  type="text"
                  value={formState.badge}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, badge: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="ex: Communaute"
                />
              </label>
            </div>

            <label className="block text-sm text-gray-700">
              Titre *
              <input
                type="text"
                value={formState.title}
                onBlur={onCreateFromTitle}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, title: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm text-gray-700">
              URL image *
              <input
                type="text"
                value={formState.imageUrl}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, imageUrl: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                placeholder="/event-1.png ou https://..."
              />
            </label>

            <label className="block text-sm text-gray-700">
              Description courte *
              <textarea
                value={formState.description}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, description: event.target.value }))
                }
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm text-gray-700">
              Description complete *
              <textarea
                value={formState.fullDescription}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, fullDescription: event.target.value }))
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block text-sm text-gray-700">
                Footer type *
                <select
                  value={formState.footerType}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, footerType: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {FOOTER_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-gray-700">
                Footer value *
                <input
                  type="text"
                  value={formState.footerValue}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, footerValue: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="ex: 1 250 inscrits"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="block text-sm text-gray-700">
                Periode *
                <input
                  type="text"
                  value={formState.period}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, period: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>

              <label className="block text-sm text-gray-700">
                Lieu *
                <input
                  type="text"
                  value={formState.location}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, location: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>

              <label className="block text-sm text-gray-700">
                Lead *
                <input
                  type="text"
                  value={formState.lead}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, lead: event.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formState.featuredOnVision}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, featuredOnVision: event.target.checked }))
                  }
                />
                Affiche dans Vision (projets phares)
              </label>

              <label className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={formState.publicVisible}
                  onChange={(event) =>
                    setFormState((previous) => ({ ...previous, publicVisible: event.target.checked }))
                  }
                />
                Visible au public
              </label>
            </div>

            <label className="block text-sm text-gray-700">
              Objectifs (1 ligne = 1 item)
              <textarea
                value={formState.objectivesText}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, objectivesText: event.target.value }))
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm text-gray-700">
              Resultats (1 ligne = 1 item)
              <textarea
                value={formState.outcomesText}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, outcomesText: event.target.value }))
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                {editingSlug ? "Mettre a jour" : "Ajouter le projet"}
              </button>

              <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                Rafraichir
              </button>
            </div>
          </form>
        </article>

        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[#0A2540]">Projets en base</h3>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {filteredProjects.length} element(s)
            </span>
          </div>

          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setPage(1);
              }}
              placeholder="Rechercher par titre, slug ou badge"
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm"
            />
          </div>

          {isLoading ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <Loader2 size={15} className="animate-spin" />
                Chargement des projets...
              </span>
            </div>
          ) : pagedProjects.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <CircleDashed size={16} />
                Aucun projet trouve pour ce filtre.
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {pagedProjects.map((project) => {
                const isEditing = editingSlug === project.slug;
                const isDeleting = deletingSlug === project.slug;
                const isVisibilityUpdating = visibilityUpdatingSlug === project.slug;

                return (
                  <article key={project.slug} className="rounded-lg border border-gray-200 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">{project.title}</p>
                        <p className="truncate text-xs text-gray-500">/{project.slug}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            project.publicVisible
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {project.publicVisible ? "Public" : "Masque"}
                        </span>

                        {project.featuredOnVision && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                            Vision
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs text-gray-600">{project.description}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(project)}
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                          isEditing
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Edit3 size={13} />
                        Modifier
                      </button>

                      <button
                        type="button"
                        disabled={isVisibilityUpdating}
                        onClick={() => onToggleVisibility(project)}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-60"
                      >
                        {isVisibilityUpdating ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : project.publicVisible ? (
                          <EyeOff size={13} />
                        ) : (
                          <Eye size={13} />
                        )}
                        {project.publicVisible ? "Masquer" : "Rendre public"}
                      </button>

                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => onDelete(project.slug)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                      >
                        {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        Supprimer
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
            <span>
              Page {safePage} / {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                disabled={safePage <= 1}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 disabled:opacity-40"
                aria-label="Page precedente"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
                disabled={safePage >= totalPages}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 disabled:opacity-40"
                aria-label="Page suivante"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {successMessage && (
            <p className="mt-3 inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1 text-xs text-green-700">
              <CheckCircle2 size={13} />
              {successMessage}
            </p>
          )}
        </article>
      </section>
    </div>
  );
}
