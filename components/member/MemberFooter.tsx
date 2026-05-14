import Image from "next/image";
import Link from "next/link";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

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

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/saien-ai/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/saien_officiel?igsh=MWx6Y2JsZjNldDZybg%3D%3D&utm_source=qr" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1D4QBYZ9cc/?mibextid=wwXIfr" },
  { icon: Youtube, label: "Youtube", href: "https://www.youtube.com/@Saien-b8r" },
  { icon: AtSign, label: "Threads", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
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
                  src="/logos/New_logo_saien.svg"
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
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-[#0e6f5c] transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
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
              <li className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="h-3.5 w-3.5 text-[#0e6f5c] shrink-0" aria-hidden="true" />
                <a href="mailto:bureau@saien.org" className="hover:text-white transition-colors">
                  bureau@saien.org
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-300">
                <Phone className="h-3.5 w-3.5 text-[#0e6f5c] shrink-0" aria-hidden="true" />
                <a href="tel:+33759733545" className="hover:text-white transition-colors">
                  +33 7 59 73 35 45
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#0e6f5c] shrink-0" aria-hidden="true" />
                06000 Nice, FRANCE
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0e6f5c] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0b5a4a] transition-colors"
            >
              Nous contacter
            </Link>
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
