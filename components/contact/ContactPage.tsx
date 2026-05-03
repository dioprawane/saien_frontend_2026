"use client";

import { useState, FormEvent } from "react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Microchip,
  Send,
  Twitter,
} from "lucide-react";

const SUBJECTS = ["Adhésion", "Partenariat", "Presse", "Autre"] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-[#fdfef6] pt-14 pb-10 border-b border-[#0a2e4a]/10" aria-labelledby="contact-hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0e6f5c]/20 bg-[#0e6f5c]/10 px-3 py-1 text-xs font-semibold text-[#0e6f5c] mb-5">
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
            Restons connectés
          </span>
          <h1
            id="contact-hero-heading"
            className="text-4xl sm:text-5xl font-extrabold text-[#0a2e4a] leading-[1.04]"
          >
            Contactez notre
            <br className="hidden sm:block" />
            réseau d&apos;innovation
          </h1>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Une question sur nos projets d&apos;intelligence artificielle ou envie de collaborer ?
            Notre équipe est à votre disposition pour échanger.
          </p>
        </div>
      </section>

      <section className="bg-[#fdfef6] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[390px_minmax(0,1fr)] gap-6 lg:gap-7 items-start">
            <div className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-[#0a2e4a] mb-5">Informations de contact</h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0e6f5c]/20 bg-[#0e6f5c]/10 text-[#0e6f5c] shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-[0.12em]">Email direct</p>
                      <a href="mailto:bureau@saien.org" className="text-sm font-semibold text-[#0a2e4a] hover:text-[#0e6f5c] transition-colors">
                        bureau@saien.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0e6f5c]/20 bg-[#0e6f5c]/10 text-[#0e6f5c] shrink-0">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-[0.12em]">Siège social</p>
                      <p className="text-sm font-semibold text-[#0a2e4a]">Paris, France</p>
                      <p className="text-xs text-slate-400">Réseau international</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-[0.12em] mb-3">Nos réseaux</p>
                  <div className="flex gap-2.5">
                    {[
                      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                      { icon: Twitter, href: "https://twitter.com", label: "Twitter / X" },
                      { icon: Github, href: "https://github.com", label: "GitHub" },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-[#0e6f5c]/35 hover:text-[#0e6f5c] transition-colors"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>

              <article className="relative rounded-2xl border border-slate-200 bg-white min-h-[145px] overflow-hidden">
                <div className="absolute top-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-400">
                  <Microchip className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="h-full w-full flex items-center justify-center">
                  <span className="inline-flex h-8 w-8 rounded-full bg-[#0e6f5c]/18" aria-hidden="true" />
                </div>
              </article>
            </div>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0a2e4a] mb-5">Envoyez-nous un message</h2>

              {submitted ? (
                <div className="rounded-xl border border-[#0e6f5c]/25 bg-[#0e6f5c]/10 p-6 text-center">
                  <p className="text-lg font-bold text-[#0a2e4a]">Message envoyé avec succès</p>
                  <p className="mt-2 text-sm text-[#0e6f5c]">
                    Nous vous répondrons dans les 48h ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block text-xs font-semibold text-slate-600">
                      Nom complet
                      <input
                        type="text"
                        placeholder="Jean Dupont"
                        required
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </label>

                    <label className="block text-xs font-semibold text-slate-600">
                      Adresse email
                      <input
                        type="email"
                        placeholder="jean@example.com"
                        required
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </label>
                  </div>

                  <label className="block text-xs font-semibold text-slate-600">
                    Sujet
                    <select
                      required
                      defaultValue=""
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="" disabled>
                        Sélectionnez un sujet
                      </option>
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-xs font-semibold text-slate-600">
                    Votre message
                    <textarea
                      rows={6}
                      placeholder="Comment pouvons-nous vous aider ?"
                      required
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0e6f5c] hover:bg-[#0c5f50] px-4 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    Envoyer le message
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    En soumettant ce formulaire, vous acceptez notre
                    {" "}
                    <a href="/confidentialite" className="underline hover:text-slate-600">
                      politique de confidentialité
                    </a>
                    .
                  </p>
                </form>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
