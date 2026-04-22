import Link from "next/link";
import { ArrowRight, Monitor, MapPin, GraduationCap } from "lucide-react";
import EventCard from "./EventCard";

const EVENTS = [
  {
    day: "15",
    month: "Nov",
    imageBg: "bg-gradient-to-br from-slate-700 via-blue-900 to-slate-900",
    category: "Webinaire",
    CategoryIcon: Monitor,
    title: "L'IA générative en entreprise",
    description:
      "Comment intégrer les LLMs dans vos processus métiers pour gagner en productivité.",
    time: "14:00 – 15:30 (CET)",
  },
  {
    day: "28",
    month: "Nov",
    imageBg: "bg-gradient-to-br from-teal-700 via-cyan-900 to-slate-900",
    category: "Paris, France",
    CategoryIcon: MapPin,
    title: "Meetup Diaspora Tech",
    description:
      "Rencontre annuelle des membres SAIEN basés en Europe pour échanger sur les tendances IA.",
    time: "18:30 – 21:00 (CET)",
  },
  {
    day: "05",
    month: "Déc",
    imageBg: "bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-900",
    category: "Workshop En Ligne",
    CategoryIcon: GraduationCap,
    title: "Masterclass : Fine-tuning LLMs",
    description:
      "Atelier technique sur l'adaptation de modèles open-source à des cas d'usage spécifiques.",
    time: "10:00 – 12:00 (EST)",
  },
];

export default function EventsSection() {
  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 lg:mb-12">
          <div>
            <h2
              id="events-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1"
            >
              Événements à venir
            </h2>
            <p className="text-slate-500 text-sm">
              Participez à nos prochaines rencontres et webinaires.
            </p>
          </div>
          <Link
            href="/evenements"
            className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 text-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium"
          >
            Voir tout l&apos;agenda
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
