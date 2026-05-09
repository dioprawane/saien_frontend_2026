import { apiRequest, normalizeApiUrl } from "@/lib/api/client";
import type {
  Article,
  ArticleImage,
  ArticleSection,
  ArticleStatus,
  ArticleVideo,
} from "@/lib/articles-data";
import type { AgendaEvent, EventTag, Intervenant } from "@/lib/events-data";

type ApiMessage = {
  message: string;
};

type ApiEventTag = {
  label: string;
  iconName: string | null;
  color: string;
  bgColor: string;
};

type ApiEventSpeaker = {
  name: string;
  role: string;
  initials: string;
  type: string | null;
  linkedin: string | null;
};

type ApiEventProgramItem = {
  time: string;
  title: string;
  description: string | null;
};

type ApiShowcaseEvent = {
  id: number;
  day: string;
  month: string;
  year: string;
  thematique: string;
  format: string;
  title: string;
  description: string;
  fullDescription: string | null;
  time: string;
  location: string;
  seats: string | null;
  status: "draft" | "published" | "completed" | "cancelled" | null;
  imageUrl: string | null;
  objectifs: string[] | null;
  tags: ApiEventTag[] | null;
  intervenants: ApiEventSpeaker[] | null;
  programme: ApiEventProgramItem[] | null;
};

type ApiShowcaseProject = {
  slug: string;
  badge: string;
  imageUrl: string | null;
  title: string;
  description: string;
  fullDescription: string;
  footerType: "mentors" | "partners" | "registrations" | string;
  footerValue: string;
  featuredOnVision: boolean;
  publicVisible: boolean | null;
  period: string;
  location: string;
  lead: string;
  objectives: string[] | null;
  outcomes: string[] | null;
};

type ApiArticleSection = {
  heading: string;
  paragraphs: string[] | null;
  imagesJson: string | null;
  videosJson: string | null;
};

type ApiArticleStatus = "draft" | "published" | "withdrawn";

type ApiShowcaseArticle = {
  id: number;
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
  status: ApiArticleStatus | null;
  tags: string[] | null;
  sections: ApiArticleSection[] | null;
};

type ApiUpsertArticleSectionRequest = {
  heading: string;
  paragraphs: string[];
  imagesJson: string | null;
  videosJson: string | null;
};

type ApiUpsertShowcaseArticleRequest = {
  id: number;
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
  status: ApiArticleStatus;
  tags: string[];
  sections: ApiUpsertArticleSectionRequest[];
};

type ApiUpsertShowcaseProjectRequest = {
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
  objectives: string[];
  outcomes: string[];
};

export type UploadedShowcaseImage = {
  url: string;
  filename: string;
  contentType: string;
  size: number;
};

export type UpsertShowcaseEventInput = {
  id: number;
  day: string;
  month: string;
  year: string;
  thematique: string;
  format: string;
  title: string;
  description: string;
  fullDescription?: string;
  time: string;
  location: string;
  seats?: string;
  status?: "draft" | "published" | "completed" | "cancelled";
  imageUrl?: string;
  objectifs?: string[];
  tags?: EventTag[];
  intervenants?: Intervenant[];
  programme?: Array<{ time: string; title: string; description?: string }>;
};

export type ShowcaseProject = {
  slug: string;
  badge: string;
  imageUrl: string | null;
  title: string;
  description: string;
  fullDescription: string;
  footerType: "mentors" | "partners" | "registrations" | string;
  footerValue: string;
  featuredOnVision: boolean;
  publicVisible: boolean;
  period: string;
  location: string;
  lead: string;
  objectives: string[];
  outcomes: string[];
};

export type UpsertShowcaseProjectInput = {
  slug: string;
  badge: string;
  imageUrl: string;
  title: string;
  description: string;
  fullDescription: string;
  footerType: string;
  footerValue: string;
  featuredOnVision?: boolean;
  publicVisible?: boolean;
  period: string;
  location: string;
  lead: string;
  objectives?: string[];
  outcomes?: string[];
};

export type ShowcaseArticleStatus = ArticleStatus;

export type UpsertShowcaseArticleSectionInput = {
  heading: string;
  paragraphs: string[];
  images?: ArticleImage[];
  videos?: ArticleVideo[];
  imagesJson?: string;
  videosJson?: string;
};

export type UpsertShowcaseArticleInput = {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  status?: ShowcaseArticleStatus;
  tags?: string[];
  sections?: UpsertShowcaseArticleSectionInput[];
};

const EVENT_ICON_NAMES = new Set(["Video", "MonitorPlay"]);
const INTERVENANT_TYPES = new Set(["Intervenant", "Animateur", "Coordinateur"]);

function absolutizeApiUrl(url: string | null | undefined): string | null {
  return normalizeApiUrl(url);
}

function parseJsonArray<T>(raw: string | null | undefined): T[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function extractYoutubeId(value: string | null | undefined): string | null {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();

    if (host === "youtu.be") {
      const candidate = url.pathname.replace(/^\//, "").split("/")[0];
      return /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null;
    }

    if (host.endsWith("youtube.com")) {
      const byQuery = url.searchParams.get("v");
      if (byQuery && /^[A-Za-z0-9_-]{11}$/.test(byQuery)) {
        return byQuery;
      }

      const parts = url.pathname.split("/").filter(Boolean);
      const embedIndex = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live");
      if (embedIndex >= 0 && parts[embedIndex + 1] && /^[A-Za-z0-9_-]{11}$/.test(parts[embedIndex + 1])) {
        return parts[embedIndex + 1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeEventTag(tag: ApiEventTag): EventTag {
  const iconName = tag.iconName && EVENT_ICON_NAMES.has(tag.iconName)
    ? (tag.iconName as EventTag["iconName"])
    : undefined;

  return {
    label: tag.label,
    iconName,
    color: tag.color || "text-slate-600",
    bgColor: tag.bgColor || "bg-brand-surface",
  };
}

function normalizeIntervenant(speaker: ApiEventSpeaker): Intervenant {
  return {
    name: speaker.name,
    role: speaker.role,
    initials: speaker.initials,
    type:
      speaker.type && INTERVENANT_TYPES.has(speaker.type)
        ? (speaker.type as Intervenant["type"])
        : undefined,
    linkedin: speaker.linkedin ?? undefined,
  };
}

function normalizeShowcaseEvent(event: ApiShowcaseEvent): AgendaEvent {
  return {
    id: event.id,
    day: event.day,
    month: event.month,
    year: event.year,
    status: event.status ?? "draft",
    tags: (event.tags ?? []).map(normalizeEventTag),
    thematique: event.thematique,
    format: event.format,
    title: event.title,
    description: event.description,
    fullDescription: event.fullDescription ?? undefined,
    time: event.time,
    location: event.location,
    seats: event.seats ?? undefined,
    imageUrl: absolutizeApiUrl(event.imageUrl) ?? undefined,
    objectifs: event.objectifs ?? undefined,
    intervenants: (event.intervenants ?? []).map(normalizeIntervenant),
    programme: (event.programme ?? []).map((item) => ({
      time: item.time,
      title: item.title,
      description: item.description ?? undefined,
    })),
  };
}

function normalizeShowcaseProject(project: ApiShowcaseProject): ShowcaseProject {
  return {
    slug: project.slug,
    badge: project.badge,
    imageUrl: absolutizeApiUrl(project.imageUrl) ?? project.imageUrl,
    title: project.title,
    description: project.description,
    fullDescription: project.fullDescription,
    footerType: project.footerType,
    footerValue: project.footerValue,
    featuredOnVision: project.featuredOnVision,
    publicVisible: project.publicVisible ?? true,
    period: project.period,
    location: project.location,
    lead: project.lead,
    objectives: project.objectives ?? [],
    outcomes: project.outcomes ?? [],
  };
}

function normalizeArticleSection(section: ApiArticleSection): ArticleSection {
  const images = parseJsonArray<ArticleImage>(section.imagesJson)
    .filter((image) => Boolean(image?.src))
    .map((image) => ({
      src: absolutizeApiUrl(image.src) ?? image.src,
      alt: image.alt || "Image article",
      caption: image.caption,
    }));

  const videos = parseJsonArray<{ youtubeId?: string; url?: string; title?: string; caption?: string }>(section.videosJson)
    .map((video) => {
      const youtubeId = extractYoutubeId(video.youtubeId) ?? extractYoutubeId(video.url);
      if (!youtubeId) {
        return null;
      }

      const title = video.title || "Video";
      if (video.caption && video.caption.trim()) {
        return {
          youtubeId,
          title,
          caption: video.caption,
        } as ArticleVideo;
      }

      return {
        youtubeId,
        title,
      } as ArticleVideo;
    })
    .filter((video): video is ArticleVideo => video !== null);

  return {
    heading: section.heading,
    paragraphs: section.paragraphs ?? [],
    images: images.length ? images : undefined,
    videos: videos.length ? videos : undefined,
  };
}

function normalizeArticleStatus(status: ApiArticleStatus | null | undefined): ArticleStatus {
  return status ?? "published";
}

function sectionJsonPayload(value: string | undefined, fallback: unknown[] | undefined): string | null {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? normalized : "[]";
  }

  if (!fallback || fallback.length === 0) {
    return "[]";
  }

  return JSON.stringify(fallback);
}

function toApiArticleSectionRequest(section: UpsertShowcaseArticleSectionInput): ApiUpsertArticleSectionRequest {
  return {
    heading: section.heading,
    paragraphs: section.paragraphs,
    imagesJson: sectionJsonPayload(section.imagesJson, section.images),
    videosJson: sectionJsonPayload(section.videosJson, section.videos),
  };
}

function normalizeShowcaseArticle(article: ApiShowcaseArticle): Article {
  return {
    id: article.id,
    slug: article.slug,
    category: article.category,
    categoryColor: article.categoryColor,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    date: article.date,
    readTime: article.readTime,
    coverImage: absolutizeApiUrl(article.coverImage) ?? article.coverImage,
    featured: article.featured,
    status: normalizeArticleStatus(article.status),
    tags: article.tags ?? [],
    sections: (article.sections ?? []).map(normalizeArticleSection),
  };
}

function toApiTagRequest(tag: EventTag): ApiEventTag {
  return {
    label: tag.label,
    iconName: tag.iconName ?? null,
    color: tag.color,
    bgColor: tag.bgColor,
  };
}

function toApiSpeakerRequest(speaker: Intervenant): ApiEventSpeaker {
  return {
    name: speaker.name,
    role: speaker.role,
    initials: speaker.initials,
    type: speaker.type ?? null,
    linkedin: speaker.linkedin ?? null,
  };
}

function toApiProgramItemRequest(item: { time: string; title: string; description?: string }): ApiEventProgramItem {
  return {
    time: item.time,
    title: item.title,
    description: item.description ?? null,
  };
}

function toApiProjectRequest(input: UpsertShowcaseProjectInput): ApiUpsertShowcaseProjectRequest {
  return {
    slug: input.slug,
    badge: input.badge,
    imageUrl: input.imageUrl,
    title: input.title,
    description: input.description,
    fullDescription: input.fullDescription,
    footerType: input.footerType,
    footerValue: input.footerValue,
    featuredOnVision: input.featuredOnVision ?? false,
    publicVisible: input.publicVisible ?? true,
    period: input.period,
    location: input.location,
    lead: input.lead,
    objectives: input.objectives ?? [],
    outcomes: input.outcomes ?? [],
  };
}

export async function listShowcaseEvents() {
  const events = await apiRequest<ApiShowcaseEvent[]>("/api/showcase/events");
  return events.map(normalizeShowcaseEvent);
}

export async function getShowcaseEventById(id: number) {
  const event = await apiRequest<ApiShowcaseEvent>(`/api/showcase/events/${id}`);
  return normalizeShowcaseEvent(event);
}

export async function upsertShowcaseEvent(input: UpsertShowcaseEventInput) {
  const payload = {
    id: input.id,
    day: input.day,
    month: input.month,
    year: input.year,
    thematique: input.thematique,
    format: input.format,
    title: input.title,
    description: input.description,
    fullDescription: input.fullDescription ?? null,
    time: input.time,
    location: input.location,
    seats: input.seats ?? null,
    status: input.status ?? "draft",
    imageUrl: input.imageUrl ?? null,
    objectifs: input.objectifs ?? [],
    tags: (input.tags ?? []).map(toApiTagRequest),
    intervenants: (input.intervenants ?? []).map(toApiSpeakerRequest),
    programme: (input.programme ?? []).map(toApiProgramItemRequest),
  };

  const event = await apiRequest<ApiShowcaseEvent>(`/api/admin/showcase/events/${input.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return normalizeShowcaseEvent(event);
}

export function deleteShowcaseEvent(id: number) {
  return apiRequest<ApiMessage>(`/api/admin/showcase/events/${id}`, {
    method: "DELETE",
  });
}

export function uploadShowcaseEventImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<UploadedShowcaseImage>("/api/admin/showcase/events/upload-image", {
    method: "POST",
    body: formData,
  }).then((uploaded) => ({
    ...uploaded,
    url: absolutizeApiUrl(uploaded.url) ?? uploaded.url,
  }));
}

export function uploadShowcaseArticleImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<UploadedShowcaseImage>("/api/admin/showcase/articles/upload-image", {
    method: "POST",
    body: formData,
  }).then((uploaded) => ({
    ...uploaded,
    url: absolutizeApiUrl(uploaded.url) ?? uploaded.url,
  }));
}

export async function listShowcaseProjects() {
  const projects = await apiRequest<ApiShowcaseProject[]>("/api/showcase/projects");
  return projects.map(normalizeShowcaseProject);
}

export async function getShowcaseProjectBySlug(slug: string) {
  const project = await apiRequest<ApiShowcaseProject>(`/api/showcase/projects/${encodeURIComponent(slug)}`);
  return normalizeShowcaseProject(project);
}

export async function listAdminShowcaseProjects() {
  const projects = await apiRequest<ApiShowcaseProject[]>("/api/admin/showcase/projects");
  return projects.map(normalizeShowcaseProject);
}

export async function getAdminShowcaseProjectBySlug(slug: string) {
  const project = await apiRequest<ApiShowcaseProject>(`/api/admin/showcase/projects/${encodeURIComponent(slug)}`);
  return normalizeShowcaseProject(project);
}

export async function upsertShowcaseProject(input: UpsertShowcaseProjectInput, slugPath?: string) {
  const payload = toApiProjectRequest(input);
  const pathSlug = slugPath ?? input.slug;

  const project = await apiRequest<ApiShowcaseProject>(`/api/admin/showcase/projects/${encodeURIComponent(pathSlug)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return normalizeShowcaseProject(project);
}

export function deleteShowcaseProject(slug: string) {
  return apiRequest<ApiMessage>(`/api/admin/showcase/projects/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export async function listShowcaseArticles() {
  const articles = await apiRequest<ApiShowcaseArticle[]>("/api/showcase/articles");
  return articles.map(normalizeShowcaseArticle);
}

export async function getShowcaseArticleBySlug(slug: string) {
  const article = await apiRequest<ApiShowcaseArticle>(`/api/showcase/articles/${encodeURIComponent(slug)}`);
  return normalizeShowcaseArticle(article);
}

export async function listAdminShowcaseArticles() {
  const articles = await apiRequest<ApiShowcaseArticle[]>("/api/admin/showcase/articles");
  return articles.map(normalizeShowcaseArticle);
}

export async function getAdminShowcaseArticleBySlug(slug: string) {
  const article = await apiRequest<ApiShowcaseArticle>(`/api/admin/showcase/articles/${encodeURIComponent(slug)}`);
  return normalizeShowcaseArticle(article);
}

export async function upsertShowcaseArticle(input: UpsertShowcaseArticleInput) {
  const payload: ApiUpsertShowcaseArticleRequest = {
    id: input.id,
    slug: input.slug,
    category: input.category,
    categoryColor: input.categoryColor,
    title: input.title,
    excerpt: input.excerpt,
    author: input.author,
    date: input.date,
    readTime: input.readTime,
    coverImage: input.coverImage,
    featured: input.featured ?? false,
    status: input.status ?? "draft",
    tags: input.tags ?? [],
    sections: (input.sections ?? []).map(toApiArticleSectionRequest),
  };

  const article = await apiRequest<ApiShowcaseArticle>(`/api/admin/showcase/articles/${encodeURIComponent(input.slug)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return normalizeShowcaseArticle(article);
}

export function deleteShowcaseArticle(slug: string) {
  return apiRequest<ApiMessage>(`/api/admin/showcase/articles/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}
