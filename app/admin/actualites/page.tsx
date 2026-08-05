"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Edit3,
  Loader2,
  MoreHorizontal,
  Newspaper,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import {
  deleteShowcaseArticle,
  listAdminShowcaseArticles,
  uploadShowcaseArticleImage,
  upsertShowcaseArticle,
  type ShowcaseArticleStatus,
  type UpsertShowcaseArticleInput,
} from "@/lib/api/showcase";
import { ARTICLE_CATEGORIES, type Article, type ArticleImage } from "@/lib/articles-data";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { splitHtmlIntoBlocks } from "@/lib/rich-text";

type ArticleSectionDraft = {
  localId: string;
  heading: string;
  paragraphsText: string;
  imagesJson: string;
  videosJson: string;
};

type ArticleFormState = {
  id: string;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  featured: boolean;
  status: ShowcaseArticleStatus;
  tagsText: string;
  sections: ArticleSectionDraft[];
};

const ITEMS_PER_PAGE = 8;
const DEFAULT_CATEGORY = "Intelligence Artificielle";
const DEFAULT_CATEGORY_COLOR = "bg-blue-50 text-blue-600";

const ARTICLE_STATUS_LABEL: Record<ShowcaseArticleStatus, string> = {
  draft: "Brouillon",
  published: "Publie",
  withdrawn: "Retire",
};

const ARTICLE_STATUS_BADGE: Record<ShowcaseArticleStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  published: "bg-green-100 text-green-700",
  withdrawn: "bg-amber-100 text-amber-700",
};

const closeActionMenu = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return;
  target.closest("details")?.removeAttribute("open");
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

const splitLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const MONTH_INDEX_BY_KEY: Record<string, number> = {
  jan: 0,
  fev: 1,
  mar: 2,
  avr: 3,
  mai: 4,
  jun: 5,
  jui: 6,
  jul: 6,
  aou: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const normalizeMonthKey = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .trim()
    .toLowerCase();

const toDateInputValue = (rawDate: string): string => {
  const trimmed = rawDate.trim();
  if (!trimmed) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const explicitMatch = trimmed.match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);
  if (explicitMatch) {
    const day = Number(explicitMatch[1]);
    const month = MONTH_INDEX_BY_KEY[normalizeMonthKey(explicitMatch[2])] ?? -1;
    const year = Number(explicitMatch[3]);
    if (month >= 0 && day >= 1 && day <= 31) {
      return `${String(year).padStart(4, "0")}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
  }

  return "";
};

const toDisplayDate = (rawDate: string): string => {
  const normalized = toDateInputValue(rawDate);
  if (!normalized) {
    return rawDate.trim();
  }

  const date = new Date(`${normalized}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return rawDate.trim();
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/\./g, "");
};

const createSectionDraft = (): ArticleSectionDraft => ({
  localId: typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `section-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  heading: "",
  paragraphsText: "",
  imagesJson: "[]",
  videosJson: "[]",
});

const getNextLegacyId = (articles: Article[]) => {
  const maxId = articles.reduce((max, article) => Math.max(max, article.id), 0);
  return maxId + 1;
};

const createEmptyForm = (nextId: number): ArticleFormState => ({
  id: String(nextId),
  slug: "",
  category: DEFAULT_CATEGORY,
  categoryColor: DEFAULT_CATEGORY_COLOR,
  title: "",
  excerpt: "",
  author: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min",
  coverImage: "",
  featured: false,
  status: "draft",
  tagsText: "",
  sections: [createSectionDraft()],
});

const articleToForm = (article: Article): ArticleFormState => {
  const mappedSections = article.sections.length
    ? article.sections.map((section) => ({
        localId: createSectionDraft().localId,
        heading: section.heading,
        paragraphsText: (section.paragraphs ?? []).join("\n"),
        imagesJson: JSON.stringify(section.images ?? [], null, 2),
        videosJson: JSON.stringify(section.videos ?? [], null, 2),
      }))
    : [createSectionDraft()];

  return {
    id: String(article.id),
    slug: article.slug,
    category: article.category,
    categoryColor: article.categoryColor,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    date: toDateInputValue(article.date),
    readTime: article.readTime,
    coverImage: article.coverImage,
    featured: Boolean(article.featured),
    status: article.status ?? "published",
    tagsText: article.tags.join(", "),
    sections: mappedSections,
  };
};

const normalizeSectionJson = (raw: string, label: string) => {
  const trimmed = raw.trim();
  if (!trimmed) return "[]";

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error(`${label} doit etre un tableau JSON.`);
    }
    return JSON.stringify(parsed);
  } catch {
    throw new Error(`${label} doit etre un JSON valide de type tableau.`);
  }
};

const parseSectionImages = (raw: string): ArticleImage[] => {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    const images: ArticleImage[] = [];

    for (const item of parsed) {
      if (typeof item !== "object" || item === null) {
        continue;
      }

      const candidate = item as { src?: unknown; alt?: unknown; caption?: unknown };
      const src = typeof candidate.src === "string" ? candidate.src.trim() : "";
      if (!src) {
        continue;
      }

      const alt = typeof candidate.alt === "string" && candidate.alt.trim()
        ? candidate.alt.trim()
        : "Image article";
      const caption = typeof candidate.caption === "string" && candidate.caption.trim()
        ? candidate.caption.trim()
        : undefined;

      images.push(caption ? { src, alt, caption } : { src, alt });
    }

    return images;
  } catch {
    return [];
  }
};

const getArticleStatus = (article: Article): ShowcaseArticleStatus => {
  return article.status ?? "published";
};

export default function ActualitesAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);
  const [uploadingSectionId, setUploadingSectionId] = useState<string | null>(null);
  const [statusUpdatingSlug, setStatusUpdatingSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formState, setFormState] = useState<ArticleFormState>(() => createEmptyForm(1));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArticles() {
      try {
        const remoteArticles = await listAdminShowcaseArticles();
        if (cancelled) return;

        setArticles(remoteArticles);
        setFormState(createEmptyForm(getNextLegacyId(remoteArticles)));
      } catch (error) {
        if (cancelled) return;
        setErrorMessage(normalizeErrorMessage(error, "Impossible de charger les actualites depuis la base."));
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadArticles();

    return () => {
      cancelled = true;
    };
  }, []);

  const categoryOptions = useMemo(() => {
    const base = ARTICLE_CATEGORIES.filter((category) => category !== "Toutes");
    const extra = Array.from(new Set(articles.map((article) => article.category))).filter(Boolean);
    return Array.from(new Set([...base, ...extra]));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();

    return [...articles]
      .filter((article) => {
        if (!normalized) return true;

        return (
          article.title.toLowerCase().includes(normalized)
          || article.category.toLowerCase().includes(normalized)
          || article.author.toLowerCase().includes(normalized)
          || article.slug.toLowerCase().includes(normalized)
        );
      })
      .sort((left, right) => right.id - left.id);
  }, [articles, searchValue]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setPage((previous) => Math.min(previous, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);
  const firstIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pagedArticles = filteredArticles.slice(firstIndex, firstIndex + ITEMS_PER_PAGE);

  const stats = {
    total: articles.length,
    published: articles.filter((article) => getArticleStatus(article) === "published").length,
    draft: articles.filter((article) => getArticleStatus(article) === "draft").length,
    withdrawn: articles.filter((article) => getArticleStatus(article) === "withdrawn").length,
  };

  const resetToCreateMode = (sourceArticles: Article[]) => {
    setEditingSlug(null);
    setFormState(createEmptyForm(getNextLegacyId(sourceArticles)));
  };

  const refreshArticles = async () => {
    const remoteArticles = await listAdminShowcaseArticles();
    setArticles(remoteArticles);
    return remoteArticles;
  };

  const updateSection = (
    localId: string,
    field: keyof Omit<ArticleSectionDraft, "localId">,
    value: string,
  ) => {
    setFormState((previous) => ({
      ...previous,
      sections: previous.sections.map((section) =>
        section.localId === localId ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const addSection = () => {
    setFormState((previous) => ({
      ...previous,
      sections: [...previous.sections, createSectionDraft()],
    }));
  };

  const removeSection = (localId: string) => {
    setFormState((previous) => {
      const remaining = previous.sections.filter((section) => section.localId !== localId);
      return {
        ...previous,
        sections: remaining.length ? remaining : [createSectionDraft()],
      };
    });
  };

  const uploadCoverImageFile = async (file: File | null) => {
    if (!file) return;

    setIsUploadingCoverImage(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const uploaded = await uploadShowcaseArticleImage(file);
      setFormState((previous) => ({ ...previous, coverImage: uploaded.url }));
      setSuccessMessage("Image de couverture televersee vers Object Storage.");
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de televerser l'image de couverture."));
    } finally {
      setIsUploadingCoverImage(false);
    }
  };

  const uploadSectionImageFiles = async (localId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);

    setUploadingSectionId(localId);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const uploadedFiles = await Promise.all(
        fileList.map((file) => uploadShowcaseArticleImage(file)),
      );

      const appendedImages: ArticleImage[] = uploadedFiles.map((uploaded, index) => ({
        src: uploaded.url,
        alt: fileList[index]?.name || "Image article",
      }));

      setFormState((previous) => ({
        ...previous,
        sections: previous.sections.map((section) => {
          if (section.localId !== localId) {
            return section;
          }

          const existingImages = parseSectionImages(section.imagesJson);
          return {
            ...section,
            imagesJson: JSON.stringify([...existingImages, ...appendedImages], null, 2),
          };
        }),
      }));

      setSuccessMessage(`${uploadedFiles.length} image(s) de section televersee(s) vers Object Storage.`);
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de televerser les images de section."));
    } finally {
      setUploadingSectionId(null);
    }
  };

  const onEdit = (article: Article) => {
    setEditingSlug(article.slug);
    setFormState(articleToForm(article));
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onCancelEdit = () => {
    resetToCreateMode(articles);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onRefresh = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const remoteArticles = await refreshArticles();
      if (editingSlug === null) {
        setFormState((previous) => ({ ...previous, id: String(getNextLegacyId(remoteArticles)) }));
      }
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de rafraichir les actualites."));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const id = editingSlug === null ? Number(formState.id) : Number(formState.id);
    if (!Number.isInteger(id) || id <= 0) {
      setErrorMessage("ID invalide. Utilisez un entier positif.");
      return;
    }

    const title = formState.title.trim();
    const slug = slugify(formState.slug.trim() || title);
    const category = formState.category.trim();
    const categoryColor = formState.categoryColor.trim();
    const excerpt = formState.excerpt.trim();
    const author = formState.author.trim();
    const date = toDisplayDate(formState.date.trim());
    const readTime = formState.readTime.trim();
    const coverImage = formState.coverImage.trim();

    if (!slug || !title || !category || !categoryColor || !excerpt || !author || !date || !readTime || !coverImage) {
      setErrorMessage("Merci de renseigner tous les champs obligatoires.");
      return;
    }

    const duplicateBySlug = articles.find((article) => article.slug === slug && article.id !== id);
    if (duplicateBySlug) {
      setErrorMessage("Ce slug existe deja pour un autre article.");
      return;
    }

    const sectionsToPersist: NonNullable<UpsertShowcaseArticleInput["sections"]> = [];

    try {
      for (let index = 0; index < formState.sections.length; index += 1) {
        const section = formState.sections[index];
        const heading = section.heading.trim();
        const paragraphs = splitLines(section.paragraphsText);
        const hasAnyContent =
          heading.length > 0
          || paragraphs.length > 0
          || section.imagesJson.trim().length > 0
          || section.videosJson.trim().length > 0;

        if (!hasAnyContent) {
          continue;
        }

        if (!heading) {
          throw new Error(`Le titre de la section #${index + 1} est obligatoire.`);
        }

        const imagesJson = normalizeSectionJson(section.imagesJson, `Images section #${index + 1}`);
        const videosJson = normalizeSectionJson(section.videosJson, `Videos section #${index + 1}`);

        sectionsToPersist.push({
          heading,
          paragraphs,
          imagesJson,
          videosJson,
        });
      }
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Sections invalides."));
      return;
    }

    const payload: UpsertShowcaseArticleInput = {
      id,
      slug,
      category,
      categoryColor,
      title,
      excerpt,
      author,
      date,
      readTime,
      coverImage,
      featured: formState.featured,
      status: formState.status,
      tags: splitCsv(formState.tagsText),
      sections: sectionsToPersist,
    };

    setIsSaving(true);

    try {
      await upsertShowcaseArticle(payload);
      const remoteArticles = await refreshArticles();
      resetToCreateMode(remoteArticles);
      setSuccessMessage(
        editingSlug === null
          ? "Article cree et enregistre en base."
          : "Article modifie et enregistre en base.",
      );
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible d'enregistrer l'article."));
    } finally {
      setIsSaving(false);
    }
  };

  const onDelete = async (slug: string) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(`Supprimer l'article ${slug} ? Cette action est irreversible.`);
      if (!confirmed) return;
    }

    setDeletingSlug(slug);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteShowcaseArticle(slug);
      const remoteArticles = await refreshArticles();

      if (editingSlug === slug || editingSlug === null) {
        resetToCreateMode(remoteArticles);
      }

      setSuccessMessage("Article supprime de la base.");
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de supprimer cet article."));
    } finally {
      setDeletingSlug(null);
    }
  };

  const onStatusChange = async (
    article: Article,
    status: ShowcaseArticleStatus,
    closeTarget?: EventTarget | null,
  ) => {
    setStatusUpdatingSlug(article.slug);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await upsertShowcaseArticle({
        id: article.id,
        slug: article.slug,
        category: article.category,
        categoryColor: article.categoryColor,
        title: article.title,
        excerpt: article.excerpt,
        author: article.author,
        date: article.date,
        readTime: article.readTime,
        coverImage: article.coverImage,
        featured: Boolean(article.featured),
        status,
        tags: article.tags,
        sections: (article.sections ?? []).map((section) => ({
          heading: section.heading,
          paragraphs: section.paragraphs,
          images: section.images ?? [],
          videos: section.videos ?? [],
        })),
      });

      const remoteArticles = await refreshArticles();

      if (editingSlug === article.slug) {
        const fresh = remoteArticles.find((item) => item.slug === article.slug);
        if (fresh) {
          setFormState(articleToForm(fresh));
        }
      }

      setSuccessMessage(`Statut mis a jour: ${ARTICLE_STATUS_LABEL[status]}.`);
      closeActionMenu(closeTarget ?? null);
    } catch (error) {
      setErrorMessage(normalizeErrorMessage(error, "Impossible de changer le statut."));
    } finally {
      setStatusUpdatingSlug(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Articles total</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Publies</p>
          <p className="mt-1 text-3xl font-bold text-green-700">{stats.published}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Brouillons</p>
          <p className="mt-1 text-3xl font-bold text-slate-700">{stats.draft}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Retires</p>
          <p className="mt-1 text-3xl font-bold text-amber-700">{stats.withdrawn}</p>
        </article>
      </div>

      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-[#0A2540]">
          {editingSlug === null ? <Plus size={18} /> : <Edit3 size={18} />}
          {editingSlug === null ? "Ajouter une actualite" : `Modifier l'article ${editingSlug}`}
        </h2>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {editingSlug === null && (
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
              value={formState.slug}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, slug: event.target.value }))
              }
              placeholder="Slug (auto si vide)"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            <select
              value={formState.category}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, category: event.target.value }))
              }
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              {formState.category && !categoryOptions.includes(formState.category) ? (
                <option value={formState.category}>{formState.category}</option>
              ) : null}
            </select>
            <input
              type="text"
              value={formState.categoryColor}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, categoryColor: event.target.value }))
              }
              placeholder="Classe couleur categorie"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <input
              type="text"
              value={formState.author}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, author: event.target.value }))
              }
              placeholder="Auteur"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            <input
              type="date"
              value={formState.date}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, date: event.target.value }))
              }
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <input
              type="text"
              value={formState.readTime}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, readTime: event.target.value }))
              }
              placeholder="Temps de lecture"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <select
              value={formState.status}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  status: event.target.value as ShowcaseArticleStatus,
                }))
              }
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publie</option>
              <option value="withdrawn">Retire</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="url"
              value={formState.coverImage}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, coverImage: event.target.value }))
              }
              placeholder="URL image de couverture"
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm"
            />
            <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              {isUploadingCoverImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              Upload cover
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={isUploadingCoverImage}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  void uploadCoverImageFile(file);
                  event.target.value = "";
                }}
              />
            </label>
          </div>

          <textarea
            value={formState.excerpt}
            onChange={(event) =>
              setFormState((previous) => ({ ...previous, excerpt: event.target.value }))
            }
            placeholder="Resume"
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={formState.tagsText}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, tagsText: event.target.value }))
              }
              placeholder="Tags (separes par des virgules)"
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
            />
            <label className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formState.featured}
                onChange={(event) =>
                  setFormState((previous) => ({ ...previous, featured: event.target.checked }))
                }
              />
              Mettre a la une
            </label>
          </div>

          <div className="space-y-3 rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[#0A2540]">Sections de l'article</h3>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Plus size={12} />
                Ajouter section
              </button>
            </div>

            <div className="space-y-3">
              {formState.sections.map((section, index) => (
                <article key={section.localId} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-gray-600">Section {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeSection(section.localId)}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-red-200 px-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                      Supprimer
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(event) => updateSection(section.localId, "heading", event.target.value)}
                      placeholder="Titre de section"
                      className="h-9 w-full rounded-md border border-gray-200 px-3 text-sm"
                    />
                    <RichTextEditor
                      value={section.paragraphsText}
                      onChange={(html) =>
                        updateSection(section.localId, "paragraphsText", splitHtmlIntoBlocks(html).join("\n"))
                      }
                      placeholder="Contenu de la section"
                      minHeightClassName="min-h-[100px]"
                    />
                    <textarea
                      value={section.imagesJson}
                      onChange={(event) => updateSection(section.localId, "imagesJson", event.target.value)}
                      placeholder='Images JSON (ex: [{"src":"/image.png","alt":"Description"}])'
                      rows={3}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs font-mono"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-500">
                        Upload multiple images: elles seront ajoutees automatiquement au JSON ci-dessus.
                      </p>
                      <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                        {uploadingSectionId === section.localId ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                        Uploader
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          multiple
                          className="hidden"
                          disabled={uploadingSectionId !== null}
                          onChange={(event) => {
                            void uploadSectionImageFiles(section.localId, event.target.files);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                    <textarea
                      value={section.videosJson}
                      onChange={(event) => updateSection(section.localId, "videosJson", event.target.value)}
                      placeholder='Videos JSON (ex: [{"youtubeId":"dQw4w9WgXcQ","title":"Demo"}] ou [{"url":"https://youtu.be/dQw4w9WgXcQ","title":"Demo"}])'
                      rows={3}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs font-mono"
                    />
                    <p className="text-[11px] text-slate-500">
                      Tu peux saisir soit youtubeId (11 caracteres), soit une URL YouTube complete; le systeme extrait automatiquement l'identifiant.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSaving || isUploadingCoverImage || uploadingSectionId !== null}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0A2540] px-4 text-sm font-semibold text-white hover:bg-[#12385a] disabled:opacity-60"
            >
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Newspaper size={15} />}
              {editingSlug === null ? "Enregistrer" : "Mettre a jour"}
            </button>

            {editingSlug !== null && (
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
              placeholder="Rechercher par titre, categorie, auteur, slug"
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
            Chargement des actualites...
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pagedArticles.map((article) => (
              <article key={article.slug} className="grid gap-4 p-5 xl:grid-cols-[220px_1fr_auto]">
                <div className="h-32 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <Newspaper size={22} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    #{article.id} · {article.category}
                  </p>
                  <div>
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${ARTICLE_STATUS_BADGE[getArticleStatus(article)]}`}>
                      {ARTICLE_STATUS_LABEL[getArticleStatus(article)]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2540]">{article.title}</h3>
                  <p className="text-sm text-slate-600">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                    <span>{article.slug}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 xl:flex-col xl:items-end">
                  <details className="relative inline-block text-left">
                    <summary className="list-none inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                      <MoreHorizontal size={13} />
                      Actions
                    </summary>

                    <div className="absolute left-0 z-20 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg xl:left-auto xl:right-0">
                      <button
                        type="button"
                        onClick={(event) => {
                          onEdit(article);
                          closeActionMenu(event.currentTarget);
                        }}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Edit3 size={13} />
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(article, "published", event.currentTarget)}
                        disabled={statusUpdatingSlug === article.slug}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"
                      >
                        <CheckCircle2 size={13} />
                        Publier
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(article, "draft", event.currentTarget)}
                        disabled={statusUpdatingSlug === article.slug}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
                      >
                        <CircleDashed size={13} />
                        Brouillon
                      </button>
                      <button
                        type="button"
                        onClick={(event) => onStatusChange(article, "withdrawn", event.currentTarget)}
                        disabled={statusUpdatingSlug === article.slug}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 disabled:opacity-60"
                      >
                        <Ban size={13} />
                        Retirer
                      </button>
                    </div>
                  </details>

                  <button
                    type="button"
                    onClick={() => onDelete(article.slug)}
                    disabled={deletingSlug === article.slug}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                  >
                    {deletingSlug === article.slug ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    Supprimer
                  </button>
                </div>
              </article>
            ))}

            {pagedArticles.length === 0 && (
              <p className="p-8 text-center text-sm text-gray-500">Aucun article trouve.</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Affichage {filteredArticles.length === 0 ? 0 : firstIndex + 1} a{" "}
            {Math.min(firstIndex + ITEMS_PER_PAGE, filteredArticles.length)} sur {filteredArticles.length}
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
