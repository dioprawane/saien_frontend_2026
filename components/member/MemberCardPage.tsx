"use client";

import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  BadgeCheck,
  Calendar,
  CreditCard,
  Download,
  Mail,
  PencilLine,
  Plus,
  Printer,
  RotateCw,
  Users,
  Video,
} from "lucide-react";

const MEMBER = {
  fullName: "Jean Dupont",
  email: "jean.dupont@example.com",
  joinDate: "15 Janvier 2023",
  memberType: "Membre Actif",
  status: "Actif",
  expiresOn: "31 Décembre 2025",
  memberId: "SAIEN-7629428",
};

const TEST_MEMBER_PHOTO = "/cartes-membre/diop.jpg";
const MAX_PHOTO_SIZE_MB = 5;

export default function MemberCardPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);
  const uploadedPhotoUrlRef = useRef<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showPhotoOnCard, setShowPhotoOnCard] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [scanHint, setScanHint] = useState<string | null>(null);
  const memberTypeBadgeLabel = MEMBER.memberType.replace(/^membre\s+/i, "").trim() || MEMBER.memberType;
  const memberVerificationToken = MEMBER.memberId.replace(/^SAIEN-/i, "").trim() || MEMBER.memberId;

  const releaseUploadedPhotoUrl = () => {
    if (!uploadedPhotoUrlRef.current) return;
    URL.revokeObjectURL(uploadedPhotoUrlRef.current);
    uploadedPhotoUrlRef.current = null;
  };

  useEffect(() => {
    if (!barcodeRef.current) return;

    const verificationPath = `/c/${encodeURIComponent(memberVerificationToken)}`;
    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
    const runtimeOrigin = window.location.origin;
    const verificationUrl = configuredSiteUrl
      ? `${configuredSiteUrl}${verificationPath}`
      : `${runtimeOrigin}${verificationPath}`;

    try {
      const verificationHostname = new URL(verificationUrl).hostname.toLowerCase();
      if (verificationHostname === "localhost" || verificationHostname === "127.0.0.1") {
        setScanHint(
          "Pour scanner depuis un téléphone, configurez NEXT_PUBLIC_SITE_URL avec une URL publique (pas localhost).",
        );
      } else {
        setScanHint(null);
      }
    } catch {
      setScanHint("URL de vérification invalide. Vérifiez NEXT_PUBLIC_SITE_URL.");
    }

    JsBarcode(barcodeRef.current, verificationUrl, {
      format: "CODE128",
      lineColor: "#0a2e4a",
      width: 0.85,
      height: 58,
      margin: 2,
      displayValue: false,
      background: "transparent",
    });
  }, [memberVerificationToken]);

  useEffect(() => {
    return () => {
      releaseUploadedPhotoUrl();
    };
  }, []);

  const handleUseTestPhoto = () => {
    releaseUploadedPhotoUrl();
    setPhotoUrl(TEST_MEMBER_PHOTO);
    setShowPhotoOnCard(true);
    setPhotoError(null);
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Veuillez sélectionner un fichier image valide.");
      event.target.value = "";
      return;
    }

    const maxSizeBytes = MAX_PHOTO_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setPhotoError(`L'image dépasse ${MAX_PHOTO_SIZE_MB} Mo.`);
      event.target.value = "";
      return;
    }

    const nextPhotoUrl = URL.createObjectURL(file);
    releaseUploadedPhotoUrl();
    uploadedPhotoUrlRef.current = nextPhotoUrl;

    setPhotoUrl(nextPhotoUrl);
    setShowPhotoOnCard(true);
    setPhotoError(null);
    event.target.value = "";
  };

  const handleRemovePhoto = () => {
    releaseUploadedPhotoUrl();
    setPhotoUrl(null);
    setShowPhotoOnCard(false);
    setPhotoError(null);
  };

  const captureCardPng = async () => {
    if (!cardRef.current) {
      throw new Error("Carte non disponible pour l'export.");
    }

    return toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 4,
    });
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      setExportError(null);

      const imageData = await captureCardPng();
      const cardElement = cardRef.current;
      if (!cardElement) throw new Error("Carte introuvable.");

      const cardWidth = cardElement.offsetWidth;
      const cardHeight = cardElement.offsetHeight;

      const pdf = new jsPDF({
        orientation: cardWidth > cardHeight ? "landscape" : "portrait",
        unit: "px",
        format: [cardHeight, cardWidth],
      });

      pdf.setProperties({
        title: `Carte Membre ${MEMBER.fullName}`,
        subject: "Carte membre SAIEN",
        author: "SAIEN",
      });

      pdf.addImage(imageData, "PNG", 0, 0, cardWidth, cardHeight, undefined, "SLOW");
      pdf.save(`carte-membre-${MEMBER.memberId}.pdf`);
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

  const handlePrintCard = async () => {
    try {
      setIsExporting(true);
      setExportError(null);

      const imageData = await captureCardPng();
      const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");

      if (!printWindow) {
        throw new Error("Impossible d'ouvrir la fenêtre d'impression.");
      }

      printWindow.document.write(`
        <!doctype html>
        <html lang="fr">
          <head>
            <meta charset="UTF-8" />
            <title>Impression carte membre</title>
            <style>
              body {
                margin: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f1f3f5;
              }
              img {
                width: min(92vw, 460px);
                height: auto;
                display: block;
                box-shadow: 0 18px 40px rgba(15, 23, 42, 0.2);
                border-radius: 18px;
              }
              @media print {
                body {
                  background: white;
                }
                img {
                  width: 86mm;
                  box-shadow: none;
                }
              }
            </style>
          </head>
          <body>
            <img src="${imageData}" alt="Carte membre ${MEMBER.fullName}" />
          </body>
        </html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } catch (error) {
      setExportError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l'impression.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="py-7 lg:py-9">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-xl border border-[#0e6f5c]/25 bg-[#0e6f5c]/10 px-4 py-3 text-[#0e6f5c] text-sm flex items-center justify-between">
          <p className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Votre carte est active.
          </p>
          <button
            type="button"
            className="text-[#0e6f5c]/70 hover:text-[#0e6f5c]"
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

        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] gap-6 items-start">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="rounded-xl border border-slate-200 p-1 inline-flex text-xs font-semibold">
                <button type="button" className="rounded-md bg-[#0a2e4a] px-4 py-1.5 text-white">
                  Premium
                </button>
                <button type="button" className="rounded-md px-4 py-1.5 text-slate-500">
                  Standard
                </button>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[#0a2e4a]">
                    Photo sur la carte (optionnelle)
                  </p>
                  <label className="inline-flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                      checked={showPhotoOnCard}
                      disabled={!photoUrl}
                      onChange={(event) => setShowPhotoOnCard(event.target.checked)}
                    />
                    Afficher
                  </label>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleUseTestPhoto}
                    className="rounded-lg bg-[#0e6f5c] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0c5f50]"
                  >
                    Tester avec diop.jpg
                  </button>

                  <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                    Importer une photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="sr-only"
                    />
                  </label>

                  {photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Retirer la photo
                    </button>
                  )}
                </div>

                {photoUrl ? (
                  <p className="mt-2 text-[11px] text-slate-500">
                    {photoUrl === TEST_MEMBER_PHOTO
                      ? "Photo de test appliquée : /cartes-membre/diop.jpg"
                      : "Photo importée appliquée à la carte."}
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-slate-400">Aucune photo sélectionnée.</p>
                )}

                {photoError && (
                  <p className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] text-rose-700">
                    {photoError}
                  </p>
                )}
              </div>

              <div
                ref={cardRef}
                className="mt-3 rounded-2xl bg-gradient-to-br from-[#0a2e4a] to-[#0e6f5c] p-4 text-white shadow-[0_26px_50px_-35px_rgba(10,37,64,0.9)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="relative h-12 w-[104px] overflow-hidden rounded-md border border-white/35 bg-white shadow-sm">
                      <Image
                        src="/logos/Logo_saien_cartemembre.png"
                        alt="Logo SAIEN"
                        fill
                        sizes="104px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full border border-white/40 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]">
                      Premium
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#fdfef6]/80 text-right">
                      Réseau d&apos;excellence
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
                      <p className="mt-1 text-2xl font-bold leading-tight">{MEMBER.fullName}</p>
                    </div>

                    {showPhotoOnCard && photoUrl && (
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/35 bg-white/10">
                        <img
                          src={photoUrl}
                          alt={`Photo de ${MEMBER.fullName}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-cyan-100">Statut</p>
                      <p className="font-semibold">{MEMBER.status}</p>
                    </div>
                    <div>
                      <p className="text-cyan-100">Expiration</p>
                      <p className="font-semibold">31 Déc 2025</p>
                    </div>
                  </div>
                </div>

                <div className="mx-auto mt-4 rounded-lg bg-white p-2.5 text-slate-800">
                  <svg
                    ref={barcodeRef}
                    className="h-[58px] w-full"
                    aria-label={`Code barre du membre ${MEMBER.memberId}`}
                  />
                  <p className="mt-1 text-center text-[10px] font-semibold tracking-[0.12em] text-[#0A3458]">
                    ID: {MEMBER.memberId}
                  </p>
                </div>

                <div className="mt-4 border-t border-white/20" />
              </div>

              {scanHint && (
                <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[11px] text-amber-700">
                  {scanHint}
                </p>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button type="button" className="rounded-lg bg-black py-2 text-xs font-semibold text-white">
                  Apple Wallet
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700"
                >
                  Google Pay
                </button>
              </div>
            </div>
          </aside>

          <div className="space-y-4">
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
                  <p className="font-semibold text-slate-800 mt-1">{MEMBER.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Adresse email</p>
                  <p className="font-semibold text-slate-800 mt-1">{MEMBER.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date d&apos;adhésion</p>
                  <p className="font-semibold text-slate-800 mt-1">{MEMBER.joinDate}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Type de membre</p>
                  <span className="mt-1 inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                    {MEMBER.memberType}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500">Identifiant membre</p>
                  <p className="font-semibold text-slate-800 mt-1">{MEMBER.memberId}</p>
                </div>
              </div>

              <div className="mx-4 mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-sm text-emerald-700 font-semibold">
                  Actif jusqu&apos;au {MEMBER.expiresOn}
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
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0e6f5c] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0c5f50] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {isExporting ? "Export en cours..." : "Télécharger PDF HD"}
                </button>
                <button
                  type="button"
                  onClick={handlePrintCard}
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0a2e4a] px-4 py-3 text-sm font-semibold text-[#0a2e4a] hover:bg-[#0a2e4a] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Imprimer la carte
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
    </section>
  );
}
