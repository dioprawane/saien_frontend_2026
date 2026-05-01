import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EVENTS } from "@/lib/events-data";
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

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ id: String(e.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === parseInt(id));
  if (!event) return { title: "Événement introuvable — SAIEN" };
  return {
    title: `${event.title} — SAIEN`,
    description: event.description,
  };
}

const ICON_MAP: Record<string, React.ElementType> = {
  Video,
  MonitorPlay,
};

export default async function EvenementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === parseInt(id));
  if (!event) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">

        {/* ── Hero ── */}
        <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] to-[#0d3a60]" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/50 to-transparent" />

          {/* Back button */}
          <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux événements
            </Link>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {event.tags.map((tag, i) => {
                const IconComponent = tag.iconName ? ICON_MAP[tag.iconName] : null;
                return (
                  <span
                    key={i}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag.color} ${tag.bgColor}`}
                  >
                    {IconComponent && <IconComponent className="w-3 h-3" />}
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

        {/* ── Body ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── Colonne gauche ── */}
            <div className="flex-1 min-w-0 space-y-10">

              {/* Meta info bar */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-green shrink-0" />
                  {event.day} {event.month} {event.year}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-green shrink-0" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                  {event.location}
                </span>
                {event.seats && (
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-green shrink-0" />
                    {event.seats}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-[#0A2540] mb-4">À propos de cet événement</h2>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {event.fullDescription || event.description}
                </p>
              </div>

              {/* Objectifs */}
              {event.objectifs && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Objectifs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.objectifs.map((obj, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 leading-snug">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Programme */}
              {event.programme && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Programme</h2>
                  <div className="relative pl-6 border-l-2 border-brand-green/20 space-y-6">
                    {event.programme.map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[1.625rem] w-4 h-4 rounded-full border-2 border-brand-green bg-white top-0.5" />
                        <span className="text-xs font-bold text-brand-green uppercase tracking-widest">
                          {item.time}
                        </span>
                        <h3 className="text-sm font-bold text-[#0A2540] mt-0.5">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Animateurs */}
              {event.intervenants && event.intervenants.some((iv) => iv.type === "Animateur" || iv.type === "Coordinateur") && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Animateurs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.intervenants
                      .filter((iv) => iv.type === "Animateur" || iv.type === "Coordinateur")
                      .map((iv, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2540] to-[#0d3a60] text-white text-sm font-black flex items-center justify-center shrink-0 shadow">
                            {iv.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#0A2540]">{iv.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{iv.role}</p>
                          </div>
                          {iv.linkedin && (
                            <a href={iv.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${iv.name}`} className="w-8 h-8 rounded-lg bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all shrink-0">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Intervenants */}
              {event.intervenants && event.intervenants.some((iv) => !iv.type || iv.type === "Intervenant") && (
                <div>
                  <h2 className="text-xl font-bold text-[#0A2540] mb-5">Intervenants</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.intervenants
                      .filter((iv) => !iv.type || iv.type === "Intervenant")
                      .map((iv, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A2540] to-[#0d3a60] text-white text-sm font-black flex items-center justify-center shrink-0 shadow">
                            {iv.initials}
                          </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#0A2540]">{iv.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{iv.role}</p>
                        </div>
                        {iv.linkedin && (
                          <a
                            href={iv.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn de ${iv.name}`}
                            className="w-8 h-8 rounded-lg bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all shrink-0"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Colonne droite — CTA sticky ── */}
            <div className="w-full lg:w-[300px] shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-24 space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green mb-2">
                    Inscription
                  </p>
                  <h3 className="text-lg font-bold text-[#0A2540] leading-snug">
                    Participer à cet événement
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-brand-green shrink-0" />
                    <span>{event.day} {event.month} {event.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-green shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  {event.seats && (
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{event.seats}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-3">
                  <button className="w-full py-3 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm">
                    S'inscrire maintenant
                  </button>
                  <button className="w-full py-3 border border-gray-200 text-slate-600 hover:bg-brand-surface font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Partager l'événement
                  </button>
                </div>

                <div className="pt-2 border-t border-gray-100 text-center">
                  <p className="text-xs text-slate-400">
                    Réservé aux membres SAIEN.{" "}
                    <Link href="/rejoindre" className="text-brand-green font-semibold hover:underline">
                      Rejoindre
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

