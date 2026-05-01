import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Mail, MapPin } from "lucide-react";

const NAVIGATION = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Événements", href: "/evenements" },
  { label: "Annuaire", href: "/reseau#annuaire" },
];

const MEMBER_SPACE = [
  { label: "Mon profil", href: "/espace-membre/profil" },
  { label: "Ma carte digitale", href: "/espace-membre/carte" },
  { label: "Mes cotisations", href: "/espace-membre/cotisations" },
  { label: "Paramètres", href: "/espace-membre/parametres" },
];

export default function MemberFooter() {
  return (
    <footer className="bg-[#0a2e4a] text-slate-200 mt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative h-12 w-[156px] overflow-hidden rounded-lg border border-white/20 bg-white/95 shadow-sm">
                <Image
                  src="/logos/Logo_saien.png"
                  alt="Logo SAIEN"
                  fill
                  sizes="156px"
                  className="object-cover [object-position:center_50%]"
                />
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Le réseau d&apos;excellence pour l&apos;innovation et l&apos;intelligence artificielle.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="LinkedIn" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-[#0e6f5c] transition-colors">
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Twitter" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-[#0e6f5c] transition-colors">
                <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Navigation</h3>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-slate-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Espace Membre</h3>
            <ul className="space-y-2">
              {MEMBER_SPACE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-slate-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#0e6f5c] shrink-0" aria-hidden="true" />
                123 Avenue de l&apos;Innovation, 75001 Paris, France
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="h-3.5 w-3.5 text-[#0e6f5c] shrink-0" aria-hidden="true" />
                contact@saien-network.org
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <p className="text-[11px] text-slate-400">© 2026 SAIEN Network. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <a href="#" className="hover:text-white transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
