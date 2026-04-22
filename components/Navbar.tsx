"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Network } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "A propos", href: "/a-propos" },
  { label: "Vision & Missions", href: "/vision" },
  { label: "Réseau & Bureau", href: "/reseau" },
  { label: "Actualités", href: "/actualites" },
  { label: "Événements", href: "/evenements" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Network className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-slate-900 font-bold text-base tracking-wide">
              SAIEN
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`relative text-sm font-medium pb-1 transition-colors ${
                  isActive(href)
                    ? "text-emerald-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-emerald-500"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/connexion"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/rejoindre"
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full"
            >
              Rejoindre le réseau
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="md:hidden p-2 -mr-2 text-slate-700"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-emerald-500"
                  : "text-slate-700 hover:text-slate-900"
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/connexion"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            onClick={() => setOpen(false)}
          >
            Connexion
          </Link>
          <Link
            href="/rejoindre"
            className="mt-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-sm font-semibold px-4 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Rejoindre le réseau
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}
