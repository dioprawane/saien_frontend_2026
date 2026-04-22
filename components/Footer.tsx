import Link from "next/link";
import { Linkedin, Twitter, Github, Mail, MapPin, Network } from "lucide-react";

const LE_RESEAU = [
  { label: "À propos", href: "/a-propos" },
  { label: "Vision & Missions", href: "/vision" },
  { label: "Réseau & Bureau", href: "/reseau" },
  { label: "Devenir membre", href: "/rejoindre" },
  { label: "Annuaire public", href: "/reseau#annuaire" },
];

const RESSOURCES = [
  { label: "Actualités", href: "/actualites" },
  { label: "Publications & Rapports", href: "#" },
  { label: "Événements", href: "/evenements" },
  { label: "Projets open-source", href: "#" },
  { label: "Offres d'emploi", href: "#" },
];

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b1825] text-slate-400" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Marque */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <Network className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-white font-bold text-base">SAIEN</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Le réseau international fédérant l&apos;expertise et
              l&apos;innovation en intelligence artificielle au service de la
              diaspora.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600/60 transition-colors flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Le Réseau */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Le Réseau</h3>
            <ul className="flex flex-col gap-3">
              {LE_RESEAU.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Ressources</h3>
            <ul className="flex flex-col gap-3">
              {RESSOURCES.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-emerald-500" aria-hidden="true" />
                <a
                  href="mailto:contact@saien-network.org"
                  className="hover:text-white transition-colors break-all"
                >
                  contact@saien-network.org
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" aria-hidden="true" />
                <span>
                  Paris, France
                  <br />
                  <span className="text-xs text-slate-500">Présence globale</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bas de page */}
        <div className="border-t border-slate-700/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2026 SAIEN Network. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
