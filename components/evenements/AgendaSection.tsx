"use client";

import { useState } from "react";
import {
  Calendar,
  Video,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

interface EventTag {
  label: string;
  color: string;
}

interface AgendaEvent {
  id: number;
  day: string;
  month: string;
  year: string;
  tags: EventTag[];
  title: string;
  description: string;
  time: string;
  location: string;
  seats?: string;
  type: "evenement" | "webinaire";
}

const EVENTS: AgendaEvent[] = [
  {
    id: 1,
    day: "24",
    month: "OCT",
    year: "2024",
    tags: [
      { label: "Conférence", color: "bg-blue-50 text-blue-600" },
      { label: "Hybride", color: "bg-emerald-50 text-emerald-600" },
    ],
    title: "Sommet Africain de l'IA 2024",
    description:
      "Rejoignez les leaders de la tech et décideurs politiques pour discuter de l'avenir de l'intelligence artificielle en Afrique et de son impact sur le développement économique.",
    time: "09:00 – 18:00 (GMT)",
    location: "Dakar, Sénégal & En ligne",
    seats: "500+ participants",
    type: "evenement",
  },
  {
    id: 2,
    day: "05",
    month: "DÉC",
    year: "2024",
    tags: [
      { label: "Meetup", color: "bg-pink-50 text-pink-600" },
      { label: "Présentiel", color: "bg-slate-100 text-slate-600" },
    ],
    title: "Meetup SAIEN Paris — IA et Finance",
    description:
      "Une soirée de networking autour des applications de l'IA dans le secteur financier, avec des présentations courtes et des tables rondes thématiques.",
    time: "18:30 – 21:30 (CET)",
    location: "Station F, Paris",
    seats: "80 places",
    type: "evenement",
  },
  {
    id: 3,
    day: "20",
    month: "JAN",
    year: "2025",
    tags: [
      { label: "Conférence", color: "bg-blue-50 text-blue-600" },
      { label: "Présentiel", color: "bg-slate-100 text-slate-600" },
    ],
    title: "Forum Innovation Diaspora Africaine",
    description:
      "Trois jours de rencontres, pitchs de startups et ateliers autour des enjeux de l'IA et du transfert technologique vers l'Afrique.",
    time: "09:00 – 18:00 (CET)",
    location: "Cité des Sciences, Paris",
    seats: "200 places",
    type: "evenement",
  },
  {
    id: 4,
    day: "12",
    month: "NOV",
    year: "2024",
    tags: [
      { label: "Atelier Pratique", color: "bg-orange-50 text-orange-600" },
      { label: "En ligne", color: "bg-purple-50 text-purple-600" },
    ],
    title: "Déployer des modèles LLM en production",
    description:
      "Un atelier technique intensif pour les ingénieurs data souhaitant maîtriser l'optimisation et le déploiement de modèles de langage à grande échelle.",
    time: "14:00 – 17:00 (CET)",
    location: "Zoom Meeting",
    seats: "Limité à 50 places",
    type: "webinaire",
  },
  {
    id: 5,
    day: "18",
    month: "DÉC",
    year: "2024",
    tags: [
      { label: "Table ronde", color: "bg-teal-50 text-teal-600" },
      { label: "En ligne", color: "bg-purple-50 text-purple-600" },
    ],
    title: "L'IA générative en santé africaine",
    description:
      "Table ronde avec des praticiens de santé et data scientists sur l'utilisation responsable de l'IA générative dans les systèmes de santé du continent.",
    time: "10:00 – 12:00 (GMT)",
    location: "Zoom Meeting",
    seats: "Limité à 100 places",
    type: "webinaire",
  },
  {
    id: 6,
    day: "08",
    month: "FÉV",
    year: "2025",
    tags: [
      { label: "Formation", color: "bg-indigo-50 text-indigo-600" },
      { label: "En ligne", color: "bg-purple-50 text-purple-600" },
    ],
    title: "Bootcamp RAG : Retrieval-Augmented Generation",
    description:
      "Deux jours intensifs pour maîtriser les architectures RAG, de la théorie à la mise en production avec LangChain et LlamaIndex.",
    time: "09:00 – 17:00 (CET)",
    location: "Zoom Meeting",
    seats: "Limité à 30 places",
    type: "webinaire",
  },
];

const THEMATIQUES = [
  "Intelligence Artificielle",
  "Data Science",
  "Réseaux & Sécurité",
  "Innovation Diaspora",
];

const FORMATS = ["Tous les formats", "Présentiel", "En ligne", "Hybride"];

const PER_PAGE = 3;

export default function AgendaSection() {
  const [tab, setTab] = useState<"evenement" | "webinaire">("evenement");
  const [search, setSearch] = useState("");
  const [format, setFormat] = useState("Tous les formats");
  const [page, setPage] = useState(1);

  const filtered = EVENTS.filter((e) => {
    if (e.type !== tab) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (
      format !== "Tous les formats" &&
      !e.tags.some((t) => t.label.toLowerCase() === format.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleTabChange = (next: "evenement" | "webinaire") => {
    setTab(next);
    setPage(1);
  };

  return (
    <section
      className="bg-white py-12 lg:py-16"
      aria-labelledby="agenda-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1
            id="agenda-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
          >
            Agenda SAIEN
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Découvrez nos prochains événements, conférences et ateliers dédiés
            à l&apos;intelligence artificielle et à l&apos;innovation en
            Afrique.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-100 mb-8">
          {(
            [
              { key: "evenement", icon: Calendar, label: "Événements" },
              { key: "webinaire", icon: Video, label: "Webinaires" },
            ] as const
          ).map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === key
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtres */}
          <aside className="lg:w-56 shrink-0">
            <div className="relative mb-6">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Rechercher un événement..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label="Rechercher un événement"
              />
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Thématiques
              </p>
              <div className="flex flex-col gap-2">
                {THEMATIQUES.map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-emerald-500"
                    />
                    <span className="text-sm text-slate-600">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Format
              </p>
              <div className="flex flex-col gap-2">
                {FORMATS.map((f) => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      checked={format === f}
                      onChange={() => {
                        setFormat(f);
                        setPage(1);
                      }}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <span
                      className={`text-sm ${
                        format === f
                          ? "text-emerald-600 font-medium"
                          : "text-slate-600"
                      }`}
                    >
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Liste */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-slate-700">
                {tab === "evenement" ? "Événements" : "Webinaires"} à venir{" "}
                <span className="text-slate-400 font-normal">
                  ({filtered.length})
                </span>
              </p>
              <span className="text-sm text-slate-500">
                Trier par :{" "}
                <span className="font-medium text-slate-700">
                  Date (plus proche)
                </span>
              </span>
            </div>

            {displayed.length === 0 ? (
              <p className="text-center py-16 text-slate-400 text-sm">
                Aucun résultat
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {displayed.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-5 bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Bloc date */}
                    <div className="w-14 shrink-0 flex flex-col items-center justify-start pt-1">
                      <span className="text-xs font-bold text-emerald-500 uppercase">
                        {event.month}
                      </span>
                      <span className="text-3xl font-extrabold text-slate-900 leading-none">
                        {event.day}
                      </span>
                      <span className="text-xs text-slate-400">{event.year}</span>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {event.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tag.color}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                        {event.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock
                            className="w-3.5 h-3.5 text-slate-400"
                            aria-hidden="true"
                          />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin
                            className="w-3.5 h-3.5 text-slate-400"
                            aria-hidden="true"
                          />
                          {event.location}
                        </span>
                        {event.seats && (
                          <span className="flex items-center gap-1">
                            <Users
                              className="w-3.5 h-3.5 text-slate-400"
                              aria-hidden="true"
                            />
                            {event.seats}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="shrink-0 flex items-center">
                      <button className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all text-white text-xs font-semibold px-4 py-2 rounded-full">
                        S&apos;inscrire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"
                  aria-label="Page précédente"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-emerald-500 text-white"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                    aria-current={page === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"
                  aria-label="Page suivante"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
