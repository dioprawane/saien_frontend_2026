export class ApiClientError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details ?? null;
  }
}

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const internal = process.env.API_BASE_URL_INTERNAL?.trim();
  if (typeof window === "undefined" && internal) {
    return stripTrailingSlash(internal);
  }

  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (explicit) return stripTrailingSlash(explicit);

  const target = (process.env.NEXT_PUBLIC_BACK_API_TARGET ?? "auto").toLowerCase();
  const localBaseUrl = process.env.NEXT_PUBLIC_BACK_API_LOCAL_URL ?? "http://localhost:8090";
  const prodBaseUrl = process.env.NEXT_PUBLIC_BACK_API_PROD_URL ?? "https://api.saien.org";

  if (target === "local") return stripTrailingSlash(localBaseUrl);
  if (target === "prod") return stripTrailingSlash(prodBaseUrl);

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") {
      return stripTrailingSlash(localBaseUrl);
    }
  }

  return stripTrailingSlash(prodBaseUrl);
};

export function normalizeApiUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("data:")) return trimmed;

  if (trimmed.startsWith("/api/")) {
    return `${resolveApiBaseUrl()}${trimmed}`;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.pathname.startsWith("/api/")) {
        return `${resolveApiBaseUrl()}${parsed.pathname}${parsed.search}${parsed.hash}`;
      }
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

const toApiUrl = (path: string) => {
  const normalized = normalizeApiUrl(path);
  if (normalized && (/^https?:\/\//i.test(normalized) || normalized.startsWith("data:"))) {
    return normalized;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${resolveApiBaseUrl()}${normalizedPath}`;
};

const parsePayload = async (response: Response) => {
  const raw = await response.text();
  if (!raw) return null;

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
};

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(toApiUrl(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = await parsePayload(response);

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String((payload as { message?: unknown }).message ?? "Erreur API")
        : `Erreur API (${response.status})`;

    throw new ApiClientError(message, response.status, payload);
  }

  return payload as T;
}

export function getApiBaseUrl() {
  return resolveApiBaseUrl();
}
