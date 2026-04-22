"use client";

import { useState, FormEvent } from "react";
import { Mail, MapPin, ArrowRight, Linkedin, Twitter, Github } from "lucide-react";

const SUBJECTS = ["Adhésion", "Partenariat", "Presse", "Autre"] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-white pt-16 pb-12" aria-labelledby="contact-hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full mb-4">
            Restons connectés
          </span>
          <h1
            id="contact-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
          >
            Contactez notre réseau{" "}
            <span className="text-emerald-500">d&apos;innovation</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Une question, un partenariat ou un projet à nous soumettre ?
            Nous répondons dans les meilleurs délais.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Colonne gauche — infos */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h2 className="font-bold text-slate-900 text-lg mb-6">
                  Informations de contact
                </h2>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                        Email direct
                      </p>
                      <a
                        href="mailto:bureau@saien.org"
                        className="text-sm text-slate-800 font-medium hover:text-emerald-600 transition-colors"
                      >
                        bureau@saien.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-blue-500" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                        Siège social
                      </p>
                      <p className="text-sm text-slate-800 font-medium">
                        Paris, France
                      </p>
                      <p className="text-xs text-slate-400">Réseau International</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
                    Nos réseaux
                  </p>
                  <div className="flex gap-3">
                    {[
                      {
                        icon: Linkedin,
                        href: "https://linkedin.com",
                        label: "LinkedIn SAIEN",
                      },
                      {
                        icon: Twitter,
                        href: "https://twitter.com",
                        label: "Twitter SAIEN",
                      },
                      {
                        icon: Github,
                        href: "https://github.com",
                        label: "GitHub SAIEN",
                      },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-emerald-400 hover:text-emerald-500 transition-colors"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chip décoratif */}
              <div className="bg-[#0b1825] rounded-2xl p-7 text-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg font-extrabold">AI</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">SAIEN Network</p>
                  <p className="text-slate-300 text-xs mt-0.5">
                    Société de l&apos;Intelligence Artificielle et le Numérique
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne droite — formulaire */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="font-bold text-slate-900 text-lg mb-6">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-emerald-500" />
                  </div>
                  <p className="font-bold text-slate-900 mb-2">
                    Message bien reçu !
                  </p>
                  <p className="text-sm text-slate-500">
                    Nous vous répondrons dans les 48h ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      placeholder="Jean Dupont"
                      required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      placeholder="jean.dupont@email.com"
                      required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Sujet
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-slate-600"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Votre message
                    </label>
                    <textarea
                      placeholder="Décrivez votre demande..."
                      rows={4}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all text-white font-semibold text-sm py-3.5 rounded-full flex items-center justify-center gap-2"
                  >
                    Envoyer le message
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    En soumettant ce formulaire, vous acceptez notre{" "}
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
    </main>
  );
}
