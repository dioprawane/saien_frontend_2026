"use client";

import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Informations",
    desc: "Renseignez vos coordonnées et votre parcours professionnel.",
  },
  {
    n: 2,
    title: "Validation",
    desc: "Examen de votre profil par le comité d'admission SAIEN.",
  },
  {
    n: 3,
    title: "Paiement & Accès",
    desc: "Règlement de la cotisation et accès immédiat à l'espace membre.",
  },
];

export default function AdhesionForm() {
  const [statut, setStatut] = useState<"actif" | "bienfaiteur">("actif");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="adhesion-form-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Étapes */}
          <div>
            <h2
              id="adhesion-form-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
            >
              Rejoignez le mouvement
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Complétez le formulaire pour initier votre adhésion.
              Notre équipe validera votre profil sous 48h.
            </p>

            <ol className="flex flex-col gap-6">
              {STEPS.map(({ n, title, desc }) => (
                <li key={n} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {n}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{title}</p>
                    <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 sm:p-9">
            <h3 className="font-bold text-slate-900 text-lg mb-6">
              Formulaire d&apos;adhésion
            </h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-brand-green-soft-strong flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-6 h-6 text-brand-green" />
                </div>
                <p className="font-bold text-slate-900 mb-2">
                  Candidature envoyée !
                </p>
                <p className="text-slate-500 text-sm">
                  Vous recevrez un email de confirmation sous 48h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Prénom
                    </label>
                    <input
                      type="text"
                      placeholder="Jean"
                      required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Nom
                    </label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    placeholder="jean.dupont@entreprise.com"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Statut souhaité
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "actif", label: "Actif (50€)" },
                      { key: "bienfaiteur", label: "Bienfaiteur (200€)" },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStatut(key as "actif" | "bienfaiteur")}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          statut === key
                            ? "bg-brand-green text-white border-brand-green"
                            : "border-slate-200 text-slate-600 hover:border-brand-green-soft-strong"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Méthode de paiement (post-validation)
                  </label>
                  <select className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green bg-white text-slate-600">
                    <option>Carte Bancaire</option>
                    <option>Virement bancaire</option>
                    <option>PayPal</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-hover active:scale-[0.98] transition-all text-white font-semibold text-sm py-3.5 rounded-full flex items-center justify-center gap-2"
                >
                  Soumettre ma candidature
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <p className="text-center text-xs text-slate-400">
                  Vos données sont sécurisées et traitées conformément à notre{" "}
                  <a href="/confidentialite" className="underline hover:text-slate-600">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


