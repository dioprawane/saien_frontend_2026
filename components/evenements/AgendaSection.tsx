"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Video,
  MonitorPlay,
  ArrowRight,
} from "lucide-react";

interface Intervenant {
  name: string;
  role: string;
  initials: string;
}

interface EventTag {
  label: string;
  icon?: any;
  color: string;
  bgColor: string;
}

interface AgendaEvent {
  id: number;
  day: string;
  month: string;
  year: string;
  tags: EventTag[];
  thematique: string;
  format: string;
  title: string;
  description: string;
  time: string;
  location: string;
  seats?: string;
  imageUrl?: string;
  objectifs?: string[];
  intervenants?: Intervenant[];
}

const EVENTS: AgendaEvent[] = [
  {
    id: 1,
    day: "24",
    month: "OCT",
    year: "2024",
    thematique: "Intelligence Artificielle",
    format: "Hybride",
    tags: [
      { label: "Conférence", color: "text-blue-600", bgColor: "bg-blue-50", icon: Video },
      { label: "Hybride", color: "text-brand-green-hover", bgColor: "bg-brand-green-soft", icon: MonitorPlay },
    ],
    title: "Sommet Africain de l'IA 2024",
    description: "Rejoignez les leaders de la tech et décideurs politiques pour discuter de l'avenir de l'intelligence artificielle en Afrique et de son impact sur le développement économique.",
    time: "09:00 – 18:00 (GMT)",
    location: "Dakar, Sénégal & En ligne",
    seats: "500+ participants",
    imageUrl: "/event-1.png",
    objectifs: ["Comprendre les enjeux de l'IA", "Créer des synergies", "Élaborer des politiques"],
    intervenants: [
      { name: "Dr. Aissatou Sow", role: "Chercheuse IA", initials: "AS" },
      { name: "Marc Dupont", role: "Directeur Tech", initials: "MD" }
    ]
  },
  {
    id: 2,
    day: "12",
    month: "NOV",
    year: "2024",
    thematique: "Data Science",
    format: "En ligne",
    tags: [
      { label: "Atelier Pratique", color: "text-purple-600", bgColor: "bg-purple-50", icon: Video },
      { label: "En ligne", color: "text-blue-600", bgColor: "bg-blue-50", icon: MonitorPlay },
    ],
    title: "Déployer des modèles LLM en production",
    description: "Un atelier technique intensif pour les ingénieurs data souhaitant maîtriser l'optimisation et le déploiement de modèles de langage à grande échelle.",
    time: "14:00 – 17:00 (CET)",
    location: "Zoom Meeting",
    seats: "Limité à 50 places",
    imageUrl: "/event-3.png",
    objectifs: ["Optimiser les prompt", "Gérer les coûts d'inférence"],
    intervenants: [
      { name: "Youssef Alaoui", role: "ML Engineer", initials: "YA" }
    ]
  },
  {
    id: 3,
    day: "05",
    month: "DÉC",
    year: "2024",
    thematique: "Intelligence Artificielle",
    format: "Présentiel",
    tags: [
      { label: "Meetup", color: "text-pink-600", bgColor: "bg-pink-50" },
      { label: "Présentiel", color: "text-slate-600", bgColor: "bg-brand-surface" },
    ],
    title: "Meetup SAIEN Paris — IA et Finance",
    description: "Une soirée de networking autour des applications de l'IA dans le secteur financier, avec des présentations courtes et des tables rondes thématiques. ",
    time: "18:30 – 21:30 (CET)",
    location: "Station F, Paris",
    seats: "80 places",
    imageUrl: "/event-2.png",
    intervenants: [
      { name: "Sophie Martin", role: "Analyste Quant", initials: "SM" },
      { name: "Amadou Diallo", role: "Data Scientist", initials: "AD" },
      { name: "Lucie Bernard", role: "Investisseur", initials: "LB" }
    ]
  },
  {
    id: 4,
    day: "20",
    month: "JAN",
    year: "2025",
    thematique: "Innovation Diaspora",
    format: "Présentiel",
    tags: [
      { label: "Conférence", color: "text-orange-600", bgColor: "bg-orange-50" },
      { label: "Présentiel", color: "text-slate-600", bgColor: "bg-brand-surface" },
    ],
    title: "Forum Innovation Diaspora Africaine",
    description: "Trois jours de rencontres, pitchs de startups et ateliers autour des enjeux de l'IA et du transfert technologique vers l'Afrique.",
    time: "09:00 – 18:00 (CET)",
    location: "Cité des Sciences, Paris",
    seats: "200 places",
    objectifs: ["Favoriser l'investissement", "Pitch de startups"],
  },
  {
    id: 5,
    day: "15",
    month: "FÉV",
    year: "2025",
    thematique: "Réseaux & Sécurité",
    format: "En ligne",
    tags: [
      { label: "Webinaire", color: "text-brand-green-hover", bgColor: "bg-brand-green-soft" },
      { label: "En ligne", color: "text-blue-600", bgColor: "bg-blue-50" },
    ],
    title: "Cybersécurité à l'ère de l'IA générative",
    description: "Analysez les nouvelles menaces posées par les deepfakes et les IA génératives, et comment s'en prémunir efficacement dans les entreprises.",
    time: "10:00 – 12:00 (GMT)",
    location: "Microsoft Teams",
  },
];

const THEMATIQUES = [
  { name: "Intelligence Artificielle", count: 12 },
  { name: "Data Science", count: 8 },
  { name: "Réseaux & Sécurité", count: 5 },
  { name: "Innovation Diaspora", count: 14 },
];

const FORMATS = ["Tous les formats", "Présentiel", "En ligne", "Hybride"];

const PER_PAGE = 3;

export default function AgendaSection() {
  const [tab, setTab] = useState<"evenements" | "webinaires">("evenements");
  const [search, setSearch] = useState("");
  const [format, setFormat] = useState("Tous les formats");
  const [selectedThematiques, setSelectedThematiques] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const isWebinaire = (e: AgendaEvent) =>
    e.tags.some((t) => t.label.toLowerCase().includes("webinaire"));

  const tabFiltered = EVENTS.filter((e) =>
    tab === "webinaires" ? isWebinaire(e) : !isWebinaire(e)
  );

  const filtered = tabFiltered.filter((e) => {
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedThematiques.length > 0 && !selectedThematiques.includes(e.thematique)) return false;
    if (format !== "Tous les formats" && e.format.toLowerCase() !== format.toLowerCase()) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const displayed = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleThematique = (tName: string) => {
    setSelectedThematiques(prev =>
      prev.includes(tName) ? prev.filter(n => n !== tName) : [...prev, tName]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setFormat("Tous les formats");
    setSelectedThematiques([]);
    setPage(1);
  };

  const switchTab = (t: "evenements" | "webinaires") => {
    setTab(t);
    setPage(1);
    clearFilters();
  };

  return (
    <section className="bg-brand-surface min-h-screen py-12 lg:py-16" aria-labelledby="agenda-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Onglets ── */}
        <div className="flex items-center gap-1 mb-8 border-b border-gray-200">
          <button
            onClick={() => switchTab("evenements")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === "evenements"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Événements
          </button>
          <button
            onClick={() => switchTab("webinaires")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === "webinaires"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Video className="w-4 h-4" />
            Webinaires
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          <aside className="w-full lg:w-[280px] shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-[#0A2540]">Filtres</h2>
              <button onClick={clearFilters} className="text-xs text-slate-400 hover:text-slate-700 font-medium transition-colors">Réinitialiser</button>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green"
              />
            </div>

            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0A2540]/60 mb-4">Thématiques</p>
              <div className="flex flex-col gap-3">
                {THEMATIQUES.map((t) => (
                  <label key={t.name} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedThematiques.includes(t.name)}
                        onChange={() => toggleThematique(t.name)}
                        className="w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{t.name}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 bg-brand-surface px-2 py-0.5 rounded-full">{t.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0A2540]/60 mb-4">Format</p>
              <div className="flex flex-col gap-3">
                {FORMATS.map((f) => (
                  <label key={f} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="format"
                      checked={format === f}
                      onChange={() => { setFormat(f); setPage(1); }}
                      className="w-4 h-4 text-brand-green border-gray-300 focus:ring-brand-green"
                    />
                    <span className={`text-sm transition-colors group-hover:text-slate-900 ${format === f ? "text-[#0A2540] font-semibold" : "text-slate-500"}`}>{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 w-full min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h1 id="agenda-heading" className="text-2xl font-bold text-[#0A2540]">
                {tab === "webinaires" ? "Webinaires" : "Événements"} à venir{" "}
                <span className="text-brand-green">({filtered.length})</span>
              </h1>
              <p className="hidden sm:block text-sm text-slate-400">
                Trier par : <span className="font-semibold text-[#0A2540]">Date (plus proche)</span>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {displayed.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-slate-500 text-sm">Aucun résultat trouvé pour ces filtres.</p>
                  <button onClick={clearFilters} className="mt-4 text-sm text-brand-green font-semibold hover:underline">Réinitialiser les filtres</button>
                </div>
              ) : (
                displayed.map((event) => (
                  <div key={event.id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-md hover:border-brand-green/20 transition-all duration-200">

                    {/* Bloc date */}
                    <div className="w-full md:w-28 bg-gradient-to-b from-[#0A2540] to-[#0d2f4d] flex flex-col items-center justify-center py-6 px-4 shrink-0">
                      <span className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em]">{event.month}</span>
                      <span className="text-[2.8rem] leading-none font-black text-white my-1">{event.day}</span>
                      <span className="text-[10px] text-white/50 font-medium">{event.year}</span>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {event.tags.map((tag, i) => {
                          const IconComponent = tag.icon;
                          return (
                            <span key={i} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag.color} ${tag.bgColor}`}>
                              {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                              {tag.label}
                            </span>
                          );
                        })}
                      </div>
                      <h3 className="text-lg font-bold text-[#0A2540] mb-1.5 group-hover:text-brand-green transition-colors line-clamp-1">{event.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-green shrink-0" />{event.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-green shrink-0" />{event.location}</span>
                        {event.seats && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-brand-green shrink-0" />{event.seats}</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 py-5 md:px-6 flex md:flex-col items-center md:justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 shrink-0 relative z-10">
                      <button aria-label="Ajouter au calendrier" onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:bg-brand-surface hover:text-brand-green hover:border-brand-green/30 transition-all shadow-sm">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <Link href={`/evenements/${event.id}`} className="relative z-10 flex items-center gap-2 px-5 py-2.5 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm whitespace-nowrap">
                        Voir <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <Link href={`/evenements/${event.id}`} className="absolute inset-0 z-0" aria-hidden="true" tabIndex={-1} />
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 disabled:opacity-40 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${page === i + 1 ? "bg-brand-green text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-brand-surface"}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 disabled:opacity-40 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


