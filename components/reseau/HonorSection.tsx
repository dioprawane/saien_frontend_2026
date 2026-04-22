import { Linkedin } from "lucide-react";

const HONOR_MEMBERS = [
  {
    name: "Prof. Marie Desroches",
    title: "Pionnière en IA Éthique",
    bio: "Professeure émérite, ses travaux ont façonné les régulations européennes sur l'intelligence artificielle responsable.",
    initials: "MD",
  },
  {
    name: "Dr. Jean Dupont",
    title: "Fondateur de TechForGood",
    bio: "A créé de multiples initiatives utilisant le Deep Learning pour résoudre des défis environnementaux majeurs.",
    initials: "JD",
  },
  {
    name: "Elena Rostova",
    title: "Auteure & Visionnaire",
    bio: "Conférencière internationale et auteure de best-sellers sur l'impact sociétal de l'automatisation cognitive.",
    initials: "ER",
  },
];

export default function HonorSection() {
  return (
    <section
      className="bg-slate-50 py-20 lg:py-28"
      aria-labelledby="honor-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex w-10 h-10 rounded-full bg-emerald-100 items-center justify-center mb-4">
            <span className="text-emerald-500 text-lg" aria-hidden="true">
              ✦
            </span>
          </div>
          <h2
            id="honor-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Membres d&apos;Honneur
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Reconnaissance de nos membres ayant apporté une contribution
            exceptionnelle à l&apos;écosystème IA et à notre communauté.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {HONOR_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-300 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                {member.initials}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                <p className="text-emerald-500 text-xs font-medium mt-0.5">
                  {member.title}
                </p>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
              <a
                href="#"
                className="mt-auto inline-flex items-center gap-1.5 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors text-slate-600 text-xs font-medium px-4 py-2 rounded-full"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                Voir le profil
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
