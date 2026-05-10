"use client";

import Link from "next/link";
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  BadgeCheck,
  CreditCard,
  Download,
  ImageOff,
  Loader2,
  PencilLine,
  Plus,
  RotateCw,
  Upload,
  Users,
  Video,
} from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import {
  getMemberProfile,
  uploadMemberAvatar,
  type MemberProfileResponse,
} from "@/lib/api/member";
import { useUserSession } from "@/components/auth/UserSessionContext";

const MAX_PHOTO_SIZE_MB = 5;
const DEFAULT_AVATAR_URL = "/members/avatar-1.png";

const MEMBER_TYPE_LABELS: Record<string, string> = {
  ACTIVE: "Membre actif",
  ADHERENT: "Membre adherent",
  HONOR: "Membre d'honneur",
  BENEFACTOR: "Membre bienfaiteur",
};

const MEMBER_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Actif",
  PENDING: "En cours",
  EXPIRED: "Expire",
  SUSPENDED: "Suspendu",
};

const COUNTRY_CODES: Record<string, string> = {
  france: "FR",
  senegal: "SN",
  canada: "CA",
  belgique: "BE",
  belgium: "BE",
  suisse: "CH",
  switzerland: "CH",
  maroc: "MA",
  morocco: "MA",
  mali: "ML",
  mauritanie: "MR",
  "cote d ivoire": "CI",
  "cote divoire": "CI",
  "ivory coast": "CI",
  guinee: "GN",
  guinea: "GN",
  gambie: "GM",
  gambia: "GM",
  nigeria: "NG",
  allemagne: "DE",
  germany: "DE",
  espagne: "ES",
  spain: "ES",
  italie: "IT",
  italy: "IT",
  "pays bas": "NL",
  netherlands: "NL",
  "royaume uni": "GB",
  "united kingdom": "GB",
  "etats unis": "US",
  "united states": "US",
  usa: "US",
};

function normalizeCountryKey(value: string | null | undefined) {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function resolveCountryCode(country: string | null | undefined): string {
  const key = normalizeCountryKey(country);
  if (!key) return "XX";

  const mapped = COUNTRY_CODES[key];
  if (mapped) return mapped;

  const compact = key.replace(/\s+/g, "");
  return compact.slice(0, 2).toUpperCase().padEnd(2, "X");
}

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

function getInitials(fullName: string | null | undefined): string {
  if (!fullName) return "XX";
  const parts = fullName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "XX";
  const first = parts[0]!.charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1]!.charAt(0) : parts[0]!.charAt(1) ?? parts[0]!.charAt(0);
  return `${first}${last}`.toUpperCase().padEnd(2, "X");
}

function buildMemberId(
  joinedAtIso: string | null | undefined,
  country: string | null | undefined,
  fullName: string | null | undefined,
) {
  const fallback = `SAIEN-XX-${getInitials(fullName)}-000000000000`;
  if (!joinedAtIso) return fallback;

  const date = new Date(joinedAtIso);
  if (Number.isNaN(date.getTime())) return fallback;

  const yy = pad2(date.getFullYear() % 100);
  const datePart = `${yy}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
  const timePart = `${pad2(date.getHours())}${pad2(date.getMinutes())}${pad2(date.getSeconds())}`;

  return `SAIEN-${resolveCountryCode(country)}-${getInitials(fullName)}-${datePart}${timePart}`;
}

function getOffsetWithinAncestor(node: HTMLElement, ancestor: HTMLElement) {
  let current: HTMLElement | null = node;
  let x = 0;
  let y = 0;

  while (current && current !== ancestor) {
    x += current.offsetLeft - current.scrollLeft;
    y += current.offsetTop - current.scrollTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return { x, y };
}

function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function proxiedAvatarUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (!/^https?:\/\//i.test(url)) return url;
  try {
    const parsed = new URL(url);
    if (typeof window !== "undefined" && parsed.origin === window.location.origin) {
      return url;
    }
  } catch {
    return url;
  }
  return `/api/avatar-proxy?url=${encodeURIComponent(url)}`;
}

function formatJoinedDate(joinedAtIso: string | null | undefined) {
  if (!joinedAtIso) return "—";
  const date = new Date(joinedAtIso);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(date);
}

function formatExpiry(joinedAtIso: string | null | undefined) {
  const date = joinedAtIso ? new Date(joinedAtIso) : new Date();
  const reference = Number.isNaN(date.getTime()) ? new Date() : date;
  const expiryYear = reference.getFullYear() + 1;
  return {
    long: `31 Décembre ${expiryYear}`,
    short: `31 Déc ${expiryYear}`,
  };
}

const waitForImageReady = (image: HTMLImageElement) => {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      image.removeEventListener("load", done);
      image.removeEventListener("error", done);
      resolve();
    };

    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
};

export default function MemberCardPage() {
  const { session, isHydrated, updateSession } = useUserSession();
  const cardRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<MemberProfileResponse | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    if (!session?.email) {
      setIsLoadingProfile(false);
      setProfileError("Connectez-vous pour afficher votre carte de membre.");
      return;
    }

    let cancelled = false;
    setIsLoadingProfile(true);
    setProfileError(null);

    getMemberProfile(session.email)
      .then((remoteProfile) => {
        if (cancelled) return;
        setProfile(remoteProfile);
        setPhotoUrl(remoteProfile.avatarUrl ?? session.avatarUrl ?? DEFAULT_AVATAR_URL);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof ApiClientError
            ? error.message
            : "Impossible de charger votre profil pour le moment.";
        setProfileError(message);
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingProfile(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isHydrated, session?.email, session?.avatarUrl]);

  const fullName = profile?.fullName ?? session?.fullName ?? "Membre SAIEN";
  const email = profile?.email ?? session?.email ?? "—";

  const computedMemberId = useMemo(
    () => buildMemberId(profile?.joinedAt ?? null, profile?.country ?? null, fullName),
    [profile?.joinedAt, profile?.country, fullName],
  );

  const memberTypeLabel = useMemo(() => {
    if (!profile?.memberType) return "Membre";
    const upper = profile.memberType.toUpperCase();
    return MEMBER_TYPE_LABELS[upper] ?? profile.memberType;
  }, [profile?.memberType]);

  const memberStatusLabel = useMemo(() => {
    if (!profile?.memberStatus) return "Actif";
    const upper = profile.memberStatus.toUpperCase();
    return MEMBER_STATUS_LABELS[upper] ?? profile.memberStatus;
  }, [profile?.memberStatus]);

  const isCardAvailable = useMemo(
    () => profile?.memberStatus?.toUpperCase() === "ACTIVE",
    [profile?.memberStatus],
  );

  const memberTypeBadgeLabel = memberTypeLabel.replace(/^membre\s+/i, "").trim() || memberTypeLabel;

  const expiry = useMemo(
    () => formatExpiry(profile?.joinedAt ?? null),
    [profile?.joinedAt],
  );

  const joinDateLabel = useMemo(
    () => formatJoinedDate(profile?.joinedAt ?? null),
    [profile?.joinedAt],
  );

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !session?.email) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Veuillez sélectionner un fichier image valide.");
      return;
    }

    const maxSizeBytes = MAX_PHOTO_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setPhotoError(`L'image dépasse ${MAX_PHOTO_SIZE_MB} Mo.`);
      return;
    }

    setIsUploadingPhoto(true);
    setPhotoError(null);

    try {
      const updatedProfile = await uploadMemberAvatar(session.email, file);
      setProfile(updatedProfile);
      const nextAvatar = updatedProfile.avatarUrl ?? DEFAULT_AVATAR_URL;
      setPhotoUrl(nextAvatar);

      updateSession({
        ...session,
        avatarUrl: updatedProfile.avatarUrl ?? session.avatarUrl,
      });
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Impossible de televerser l'image pour le moment.";
      setPhotoError(message);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const getCaptureContext = async () => {
    if (!cardRef.current) {
      throw new Error("Carte non disponible pour l'export.");
    }

    const cardElement = cardRef.current;
    const cardImages = Array.from(cardElement.querySelectorAll("img"));
    await Promise.all(cardImages.map((image) => waitForImageReady(image)));

    if (typeof document !== "undefined" && "fonts" in document) {
      await document.fonts.ready;
    }

    const mobileLikeDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const exportPixelRatio = mobileLikeDevice ? 2 : 4;

    return { cardElement, exportPixelRatio };
  };

  const captureCardPng = async () => {
    const { cardElement, exportPixelRatio } = await getCaptureContext();

    return toPng(cardElement, {
      cacheBust: true,
      pixelRatio: exportPixelRatio,
      fetchRequestInit: {
        mode: "cors",
      },
    });
  };

  const captureCardJpeg = async () => {
    const { cardElement, exportPixelRatio } = await getCaptureContext();

    return toJpeg(cardElement, {
      cacheBust: true,
      pixelRatio: exportPixelRatio,
      quality: 0.95,
      fetchRequestInit: {
        mode: "cors",
      },
    });
  };

  const captureCardWebp = async () => {
    const pngData = await captureCardPng();

    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Impossible de convertir l'image au format WebP."));
          return;
        }

        ctx.drawImage(image, 0, 0);
        resolve(canvas.toDataURL("image/webp", 0.95));
      };
      image.onerror = () => reject(new Error("Impossible de préparer l'image WebP."));
      image.src = pngData;
    });
  };

  const handleDownloadPdf = async () => {
    if (!isCardAvailable) {
      setExportError("La carte membre est disponible uniquement pour les membres au statut actif.");
      return;
    }

    try {
      setIsExporting(true);
      setExportError(null);

      const imageData = await captureCardPng();
      const { cardElement } = await getCaptureContext();

      const cardWidth = cardElement.offsetWidth;
      const cardHeight = cardElement.offsetHeight;
      const sourceWidth = cardElement.clientWidth || cardWidth;
      const sourceHeight = cardElement.clientHeight || cardHeight;
      const scaleX = cardWidth / sourceWidth;
      const scaleY = cardHeight / sourceHeight;

      const pdf = new jsPDF({
        orientation: cardWidth > cardHeight ? "landscape" : "portrait",
        unit: "px",
        format: [cardHeight, cardWidth],
      });

      pdf.setProperties({
        title: `Carte Membre ${profile?.fullName ?? "SAIEN"}`,
        subject: "Carte membre SAIEN",
        author: "SAIEN",
      });

      pdf.addImage(imageData, "PNG", 0, 0, cardWidth, cardHeight, undefined, "SLOW");

      // Re-injecte des annotations de liens cliquables sur le PDF (le PNG aplati les a perdus).
      const linkNodes = cardElement.querySelectorAll<HTMLAnchorElement>("a[href]");
      linkNodes.forEach((node) => {
        const href = node.getAttribute("href");
        if (!href) return;

        const position = getOffsetWithinAncestor(node, cardElement);
        const x = position.x * scaleX;
        const y = position.y * scaleY;
        const w = node.offsetWidth * scaleX;
        const h = node.offsetHeight * scaleY;

        if (w <= 0 || h <= 0) return;
        pdf.link(x, y, w, h, { url: href });
      });

      pdf.save(`carte-membre-${computedMemberId}.pdf`);
    } catch (error) {
      setExportError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l'export PDF.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadImage = async (format: "png" | "jpg" | "webp") => {
    if (!isCardAvailable) {
      setExportError("La carte membre est disponible uniquement pour les membres au statut actif.");
      return;
    }

    try {
      setIsExporting(true);
      setExportError(null);

      let imageData = "";
      if (format === "png") {
        imageData = await captureCardPng();
      } else if (format === "jpg") {
        imageData = await captureCardJpeg();
      } else {
        imageData = await captureCardWebp();
      }

      downloadDataUrl(imageData, `carte-membre-${computedMemberId}.${format}`);
    } catch (error) {
      setExportError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l'export de l'image.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const displayPhoto = photoUrl ? proxiedAvatarUrl(photoUrl) : null;

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    setPhotoError(null);
  };

  return (
    <section className="py-7 lg:py-9">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div
          className={`rounded-xl px-4 py-3 text-sm flex items-center justify-between ${
            isCardAvailable
              ? "border border-[#0e6f5c]/25 bg-[#0e6f5c]/10 text-[#0e6f5c]"
              : "border border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          <p className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            {isCardAvailable
              ? "Votre carte est active."
              : `Carte indisponible (statut: ${memberStatusLabel}).`}
          </p>
          <button
            type="button"
            className={isCardAvailable ? "text-[#0e6f5c]/70 hover:text-[#0e6f5c]" : "text-amber-700/70 hover:text-amber-700"}
            aria-label="Fermer l'alerte"
          >
            ×
          </button>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a2e4a]">
            Ma carte de membre SAIEN
          </h1>
          <p className="mt-2 text-slate-500 max-w-2xl">
            Présentez votre carte pour accéder aux événements et avantages exclusifs du réseau.
          </p>
        </div>

        {profileError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {profileError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] gap-6 items-start">
          <aside className="space-y-4">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[#0a2e4a]">
                    Photo de profil sur la carte
                  </p>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <label
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 ${
                      isUploadingPhoto ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    {isUploadingPhoto ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    Importer une photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="sr-only"
                      disabled={isUploadingPhoto || !session?.email || !isCardAvailable}
                    />
                  </label>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      disabled={!isCardAvailable}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-rose-300 hover:text-rose-600"
                    >
                      <ImageOff className="h-3.5 w-3.5" aria-hidden="true" />
                      Retirer la photo
                    </button>
                  )}
                </div>

                <p className="mt-2 text-[11px] text-slate-500">
                  Par défaut, la photo de votre profil est utilisée. Toute nouvelle image
                  remplace votre avatar et est stockée sur l&apos;Object Storage. Vous pouvez
                  aussi télécharger la carte sans photo.
                </p>

                {photoError && (
                  <p className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] text-rose-700">
                    {photoError}
                  </p>
                )}
              </div>

                <div
                  ref={cardRef}
                  className="relative mt-3 rounded-2xl border border-white/20 bg-gradient-to-br from-[#0a2e4a] to-[#0e6f5c] p-4 text-white shadow-[0_26px_50px_-35px_rgba(10,37,64,0.9)]"
                >
                <div className="flex items-start justify-between gap-3">
                  <div className="relative h-12 w-[104px] shrink-0 overflow-hidden rounded-md border border-white/35 bg-white shadow-sm">
                    <img
                      src="/logos/New_logo_saien.svg"
                      alt="Logo SAIEN"
                      width={104}
                      height={48}
                      loading="eager"
                      decoding="sync"
                      crossOrigin="anonymous"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-end gap-0.5 text-right">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#fdfef6]/80">
                      Réseau d&apos;excellence
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                      Senegalese AI Excellence Network
                    </p>
                  </div>
                </div>

                  <div className="mt-3 rounded-xl border border-white/20 bg-white/10 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-100">Membre</p>
                        <span className="rounded-full border border-cyan-100/40 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-50">
                          {memberTypeBadgeLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-2xl font-bold leading-tight">{fullName}</p>
                    </div>

                    {displayPhoto && (
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/35 bg-white/10">
                        <img
                          src={displayPhoto}
                          alt={`Photo de ${fullName}`}
                          loading="eager"
                          decoding="sync"
                          crossOrigin="anonymous"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <p className="text-cyan-100">ID</p>
                      <p className="font-semibold whitespace-nowrap text-[10.5px] tracking-tight">
                        {computedMemberId}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-cyan-100">Expiration</p>
                      <p className="font-semibold whitespace-nowrap">{expiry.short}</p>
                    </div>
                  </div>
                </div>

                  <div className="mt-4 border-t border-white/20 pt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] text-cyan-50 leading-none">
                  <a
                    href="mailto:bureau@saien.org"
                    className="inline-block py-1 font-semibold hover:text-white hover:underline"
                  >
                    bureau@saien.org
                  </a>
                  <a
                    href="https://saien.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-block py-1 font-semibold hover:text-white hover:underline"
                  >
                    saien.org
                  </a>
                </div>

                {!isCardAvailable && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-slate-950 p-4 text-center">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.1em] text-white">Carte inactive</p>
                      <p className="mt-1 text-xs font-medium text-slate-300">
                        Statut {memberStatusLabel}. L&apos;aperçu est masque tant que le compte n&apos;est pas actif.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {!isCardAvailable && (
                <div className="absolute inset-0 z-20 rounded-2xl" aria-hidden="true" />
              )}
            </div>
          </aside>

          <div className="space-y-4">
            {!isCardAvailable && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
                Les actions de cette page sont desactivees tant que le statut membre n&apos;est pas Actif.
              </div>
            )}

            <div className={`${!isCardAvailable ? "pointer-events-none opacity-60 select-none" : ""} space-y-4`}>
            <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h2 className="text-sm font-bold text-[#0A3458] flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  Informations du profil
                </h2>
                <Link
                  href="/espace-membre/profil"
                  className="text-xs font-semibold text-slate-500 hover:text-emerald-600 inline-flex items-center gap-1"
                >
                  <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
                  Modifier
                </Link>
              </div>

              <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Nom complet</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {isLoadingProfile ? "Chargement..." : fullName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Adresse email</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {isLoadingProfile ? "Chargement..." : email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date d&apos;adhésion</p>
                  <p className="font-semibold text-slate-800 mt-1">{joinDateLabel}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Type de membre</p>
                  <span className="mt-1 inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                    {memberTypeLabel}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500">Identifiant membre</p>
                  <p className="font-semibold text-slate-800 mt-1 break-all">{computedMemberId}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Statut</p>
                  <p className="font-semibold text-slate-800 mt-1">{memberStatusLabel}</p>
                </div>
              </div>

              <div className="mx-4 mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-sm text-emerald-700 font-semibold">
                  Actif jusqu&apos;au {expiry.long}
                </p>
                <Link
                  href="/espace-membre/cotisations"
                  className="text-xs font-semibold text-slate-600 hover:text-emerald-600"
                >
                  Voir l&apos;historique
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-bold text-[#0A3458] mb-3">Actions de gestion</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isExporting || !isCardAvailable}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0e6f5c] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0c5f50] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {isExporting ? "Export en cours..." : "Télécharger PDF HD"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadImage("png")}
                  disabled={isExporting || !isCardAvailable}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0a2e4a] px-4 py-3 text-sm font-semibold text-[#0a2e4a] hover:bg-[#0a2e4a] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Télécharger PNG
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadImage("jpg")}
                  disabled={isExporting || !isCardAvailable}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0a2e4a] px-4 py-3 text-sm font-semibold text-[#0a2e4a] hover:bg-[#0a2e4a] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Télécharger JPG
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadImage("webp")}
                  disabled={isExporting || !isCardAvailable}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0a2e4a] px-4 py-3 text-sm font-semibold text-[#0a2e4a] hover:bg-[#0a2e4a] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Télécharger WEBP
                </button>
              </div>

              {exportError && (
                <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {exportError}
                </p>
              )}

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#0a2e4a] inline-flex items-center gap-2">
                    <RotateCw className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                    Renouvellement
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Anticipez votre renouvellement pour 2026 et bénéficiez de 10% de réduction.
                  </p>
                </div>
                <Link
                  href="/espace-membre/cotisations"
                  className="inline-flex items-center justify-center rounded-lg bg-white border border-slate-300 px-4 py-2 text-xs font-semibold text-[#0a2e4a] hover:border-[#0e6f5c]/40 hover:text-[#0e6f5c]"
                >
                  Renouveler maintenant
                </Link>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#0a2e4a]">Avantages de votre carte</h2>
                <Link
                  href="/espace-membre/reseau"
                  className="text-xs font-semibold text-[#0e6f5c] hover:text-[#0c5f50]"
                >
                  Voir tout
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <CreditCard className="h-4 w-4 text-[#0a2e4a]" aria-hidden="true" />
                  <h3 className="mt-2 text-sm font-semibold text-[#0a2e4a]">Accès événements</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Entrée prioritaire et gratuite aux meetups et conférences SAIEN.
                  </p>
                </article>

                <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Users className="h-4 w-4 text-[#0a2e4a]" aria-hidden="true" />
                  <h3 className="mt-2 text-sm font-semibold text-[#0a2e4a]">Réseau privé</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Accès à l&apos;annuaire des membres et aux groupes de discussion.
                  </p>
                </article>

                <article className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Video className="h-4 w-4 text-[#0a2e4a]" aria-hidden="true" />
                  <h3 className="mt-2 text-sm font-semibold text-[#0a2e4a]">Webinaires exclusifs</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Accès illimité aux replays et sessions de formation en ligne.
                  </p>
                </article>

                <article className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col items-center justify-center text-center">
                  <Plus className="h-4 w-4 text-[#0a2e4a]" aria-hidden="true" />
                  <p className="mt-2 text-sm font-semibold text-[#0a2e4a]">Découvrir plus</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Nouveaux avantages disponibles chaque trimestre.
                  </p>
                </article>
              </div>
            </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
