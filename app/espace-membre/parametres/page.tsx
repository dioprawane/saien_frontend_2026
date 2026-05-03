import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paramètres membre — SAIEN",
  description: "Gérez vos préférences de compte et de notifications.",
};

const SETTINGS = [
  { title: "Notifications email", description: "Recevoir les nouveautés du réseau et invitations événements.", enabled: true },
  { title: "Notifications SMS", description: "Recevoir les rappels importants sur votre mobile.", enabled: false },
  { title: "Visibilité dans l'annuaire", description: "Afficher votre profil dans l'annuaire membre privé.", enabled: true },
  { title: "Authentification renforcée", description: "Activer une vérification supplémentaire à la connexion.", enabled: false },
];

export default function ParametresMembrePage() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">Paramètres</h1>
          <p className="mt-2 text-slate-500">Personnalisez votre expérience membre et vos préférences de sécurité.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-3">
          {SETTINGS.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-[#0A3458]">{item.title}</h2>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-7 w-12 rounded-full transition-colors ${item.enabled ? "bg-emerald-500" : "bg-slate-300"}`}
                aria-label={item.enabled ? "Désactiver" : "Activer"}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${item.enabled ? "right-1" : "left-1"}`} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
