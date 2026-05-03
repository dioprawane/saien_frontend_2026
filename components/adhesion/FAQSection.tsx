"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Le prix de l'adhésion est-il déductible des impôts ?",
    a: "En tant qu'association reconnue d'utilité publique, les cotisations versées à SAIEN peuvent ouvrir droit à une réduction d'impôt. Nous vous fournissons un reçu fiscal après chaque paiement.",
  },
  {
    q: "Quel est le délai pour recevoir ma carte de membre ?",
    a: "Après validation de votre profil (48h maximum), vous recevrez votre carte de membre numérique immédiatement et votre carte physique sous 10 jours ouvrés.",
  },
  {
    q: "Comment accéder à l'annuaire des membres ?",
    a: "L'annuaire est accessible depuis votre espace membre dès la confirmation de votre adhésion. Vous pouvez rechercher par compétence, ville ou domaine d'expertise.",
  },
  {
    q: "Puis-je modifier mon statut en cours d'année ?",
    a: "Oui, vous pouvez passer du statut Actif au statut Bienfaiteur à tout moment en réglant la différence de cotisation. Le changement prend effet immédiatement.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-brand-surface py-20 lg:py-28" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Questions fréquentes
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Tout ce que vous devez savoir sur l&apos;adhésion SAIEN.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-slate-100">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-sm font-medium text-slate-800 hover:text-brand-green-hover transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180 text-brand-green" : "text-slate-400"
                  }`}
                  aria-hidden="true"
                />
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


