"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Video,
  MonitorPlay,
  Share2,
  Linkedin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getShowcaseEventById, registerToShowcaseEvent } from "@/lib/api/showcase";
import { EVENTS, type AgendaEvent } from "@/lib/events-data";
import { formatEventDateLabel } from "@/lib/event-display";
import { useUserSession } from "@/components/auth/UserSessionContext";
import RichTextContent from "@/components/RichTextContent";

type EvenementDetailClientProps = {
  id: number;
};

const ICON_MAP: Record<string, React.ElementType> = {
  Video,
  MonitorPlay,
};

function getFallbackEvent(id: number) {
  return EVENTS.find((item) => item.id === id) ?? null;
}

export default function EvenementDetailClient({ id }: EvenementDetailClientProps) {
  const { isAuthenticated, session } = useUserSession();
  const [event, setEvent] = useState<AgendaEvent | null>(() => getFallbackEvent(id));
  const [isLoading, setIsLoading] = useState(event === null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Registration state
  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regStatus, setRegStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [regMessage, setRegMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadEvent() {
      if (!Number.isFinite(id) || id <= 0) {
        setEvent(null);
        setLoadError("Evenement introuvable.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setLoadError(null);

      try {
        const remoteEvent = await getShowcaseEventById(id);
        if (!isCancelled) {
          setEvent(remoteEvent);
        }
      } catch {
        if (isCancelled) return;

        const fallbackEvent = getFallbackEvent(id);
        setEvent(fallbackEvent);

        if (fallbackEvent) {
          setLoadError("Impossible de charger l'evenement distant, affichage des donnees locales.");
        } else {
          setLoadError("Evenement introuvable.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadEvent();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (isLoading && !event) {
    return (
      <>
        <Navbar />
        <main className="bg-brand-surface min-h-screen flex items-center justify-center px-4">
          <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Chargement de l'evenement...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="bg-brand-surface min-h-screen flex items-center justify-center px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm max-w-xl">
            <h1 className="text-xl font-bold text-[#0A2540]">Evenement introuvable</h1>
            <p className="mt-2 text-sm text-slate-600">
              L'evenement demande n'existe pas ou n'est plus disponible.
            </p>
            <Link
              href="/evenements"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-hover"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Retour aux evenements
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">
        <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] to-[#0d3a60]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/50 to-transparent" />

          <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux evenements
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {event.tags.map((tag, index) => {
                const IconComponent = tag.iconName ? ICON_MAP[tag.iconName] : null;
                return (
                  <span
                    key={`${tag.label}-${index}`}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag.color} ${tag.bgColor}`}
                  >
                    {IconComponent ? <IconComponent className="w-3 h-3" /> : null}
                    {tag.label}
                  </span>
                );
              })}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-3xl">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {loadError ? (
            <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
              {loadError}
            </p>
          ) : null}

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0 space-y-10">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-green shrink-0" />
                  {formatEventDateLabel(event)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-green shrink-0" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                  {event.location}
                </span>
                {event.seats ? (
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-green shrink-0" />
                    {event.seats}
                  </span>
                ) : null}
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0A2540] mb-4">A propos de cet evenement</h2>
                <RichTextContent
                  html={event.fullDescription || event.description}
                  className="text-slate-600 leading-relaxed text-[15px]"
                />
              </div>

              {event.objectifs && event.objectifs.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Objectifs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.objectifs.map((objective, index) => (
                      <div
                        key={`${objective}-${index}`}
                        className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 leading-snug">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {event.programme && event.programme.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Programme</h2>
                  <div className="relative pl-6 border-l-2 border-brand-green/20 space-y-6">
                    {event.programme.map((item, index) => (
                      <div key={`${item.time}-${index}`} className="relative">
                        <div className="absolute -left-[1.625rem] w-4 h-4 rounded-full border-2 border-brand-green bg-white top-0.5" />
                        <span className="text-xs font-bold text-brand-green uppercase tracking-widest">
                          {item.time}
                        </span>
                        <h3 className="text-sm font-bold text-[#0A2540] mt-0.5">{item.title}</h3>
                        {item.description ? (
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {event.intervenants && event.intervenants.some((speaker) => speaker.type === "Animateur" || speaker.type === "Coordinateur") ? (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Animateurs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.intervenants
                      .filter((speaker) => speaker.type === "Animateur" || speaker.type === "Coordinateur")
                      .map((speaker, index) => (
                        <div key={`${speaker.name}-${index}`} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2540] to-[#0d3a60] text-white text-sm font-black flex items-center justify-center shrink-0 shadow">
                            {speaker.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#0A2540]">{speaker.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{speaker.role}</p>
                          </div>
                          {speaker.linkedin ? (
                            <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${speaker.name}`} className="w-8 h-8 rounded-lg bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all shrink-0">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}

              {event.intervenants && event.intervenants.some((speaker) => !speaker.type || speaker.type === "Intervenant") ? (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Intervenants</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.intervenants
                      .filter((speaker) => !speaker.type || speaker.type === "Intervenant")
                      .map((speaker, index) => (
                        <div key={`${speaker.name}-${index}`} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2540] to-[#0d3a60] text-white text-sm font-black flex items-center justify-center shrink-0 shadow">
                            {speaker.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#0A2540]">{speaker.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{speaker.role}</p>
                          </div>
                          {speaker.linkedin ? (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`LinkedIn de ${speaker.name}`}
                              className="w-8 h-8 rounded-lg bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all shrink-0"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="w-full lg:w-[300px] shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-24 space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green mb-2">
                    Inscription
                  </p>
                  <h3 className="text-lg font-bold text-[#0A2540] leading-snug">
                    Participer a cet evenement
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-brand-green shrink-0" />
                    <span>{formatEventDateLabel(event)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-green shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  {event.seats ? (
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{event.seats}</span>
                    </div>
                  ) : null}
                </div>

                {/* Registration panel by visibility */}
                {event.eventVisibility === "open" ? (
                  <RegistrationFormOpen
                    eventId={event.id}
                    regEmail={regEmail}
                    setRegEmail={setRegEmail}
                    regName={regName}
                    setRegName={setRegName}
                    regStatus={regStatus}
                    regMessage={regMessage}
                    onSubmit={async () => {
                      if (regStatus === "loading") return;
                      setRegStatus("loading");
                      setRegMessage(null);
                      try {
                        const res = await registerToShowcaseEvent(event.id, regEmail.trim(), regName.trim() || null, null);
                        setRegStatus("success");
                        setRegMessage(res.message);
                      } catch {
                        setRegStatus("error");
                        setRegMessage("Une erreur est survenue. Veuillez réessayer.");
                      }
                    }}
                  />
                ) : isAuthenticated && session?.email ? (
                  <RegistrationButtonMember
                    regStatus={regStatus}
                    regMessage={regMessage}
                    onRegister={async () => {
                      if (regStatus === "loading") return;
                      setRegStatus("loading");
                      setRegMessage(null);
                      try {
                        const res = await registerToShowcaseEvent(
                          event.id,
                          session.email,
                          session.fullName ?? null,
                          session.email,
                        );
                        setRegStatus("success");
                        setRegMessage(res.message);
                      } catch {
                        setRegStatus("error");
                        setRegMessage("Une erreur est survenue. Veuillez réessayer.");
                      }
                    }}
                  />
                ) : (
                  <div className="pt-2 space-y-3">
                    <Link
                      href={`/connexion?next=/evenements/${event.id}`}
                      className="block w-full py-3 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm text-center"
                    >
                      Se connecter pour s&apos;inscrire
                    </Link>
                    <div className="pt-2 border-t border-gray-100 text-center">
                      <p className="text-xs text-slate-400">
                        Pas encore membre ?{" "}
                        <Link href="/rejoindre" className="text-brand-green font-semibold hover:underline">
                          Rejoindre
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                <button className="w-full py-3 border border-gray-200 text-slate-600 hover:bg-brand-surface font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Partager l&apos;evenement
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

type RegStatus = "idle" | "loading" | "success" | "error";

function RegistrationFormOpen({
  regEmail,
  setRegEmail,
  regName,
  setRegName,
  regStatus,
  regMessage,
  onSubmit,
}: {
  eventId: number;
  regEmail: string;
  setRegEmail: (v: string) => void;
  regName: string;
  setRegName: (v: string) => void;
  regStatus: RegStatus;
  regMessage: string | null;
  onSubmit: () => void;
}) {
  if (regStatus === "success") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-4 text-sm text-green-700">
        <CheckCircle2 className="mb-2 h-5 w-5 text-green-500" />
        <p className="font-semibold">Inscription confirmée !</p>
        {regMessage && <p className="mt-1 text-xs">{regMessage}</p>}
        <p className="mt-1 text-xs">Un email avec le lien de connexion vous a été envoyé.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 pt-1">
      <input
        type="text"
        value={regName}
        onChange={(e) => setRegName(e.target.value)}
        placeholder="Votre nom complet"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-[#0A2540] placeholder:text-slate-400 focus:border-brand-green focus:outline-none"
      />
      <input
        type="email"
        required
        value={regEmail}
        onChange={(e) => setRegEmail(e.target.value)}
        placeholder="Votre adresse email *"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-[#0A2540] placeholder:text-slate-400 focus:border-brand-green focus:outline-none"
      />
      {regMessage && regStatus === "error" && (
        <p className="text-xs text-red-600">{regMessage}</p>
      )}
      <button
        onClick={onSubmit}
        disabled={regStatus === "loading" || !regEmail.trim()}
        className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm disabled:opacity-70"
      >
        {regStatus === "loading" ? "Envoi..." : "S\u2019inscrire — recevoir le lien"}
      </button>
      <p className="text-center text-xs text-slate-400">
        Inscription ouverte. Le lien vous sera envoyé par email.
      </p>
    </div>
  );
}

function RegistrationButtonMember({
  regStatus,
  regMessage,
  onRegister,
}: {
  regStatus: RegStatus;
  regMessage: string | null;
  onRegister: () => void;
}) {
  if (regStatus === "success") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-4 text-sm text-green-700">
        <CheckCircle2 className="mb-2 h-5 w-5 text-green-500" />
        <p className="font-semibold">Inscription confirmée !</p>
        {regMessage && <p className="mt-1 text-xs">{regMessage}</p>}
        <p className="mt-1 text-xs">L&apos;événement est visible dans votre espace membre.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 pt-1">
      {regMessage && regStatus === "error" && (
        <p className="mb-1 text-xs text-red-600">{regMessage}</p>
      )}
      <button
        onClick={onRegister}
        disabled={regStatus === "loading"}
        className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm disabled:opacity-70"
      >
        {regStatus === "loading" ? "Envoi..." : "S\u2019inscrire maintenant"}
      </button>
    </div>
  );
}

