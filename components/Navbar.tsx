"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useUserSession } from "@/components/auth/UserSessionContext";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "A propos", href: "/a-propos" },
  { label: "Vision & Missions", href: "/vision" },
  { label: "Réseau", href: "/reseau" },
  { label: "Actualités", href: "/actualites" },
  { label: "Événements", href: "/evenements" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { session, isAuthenticated } = useUserSession();
  const dashboardHref =
    session?.role === "admin" || session?.role === "super-admin" || session?.role === "admin-event"
      ? "/admin"
      : "/espace-membre";

  const shouldShowJoin =
    !isAuthenticated || (session?.role === "member" && !session?.memberType);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#fdfef6]/95 backdrop-blur-sm border-b border-[#0a2e4a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Accueil SAIEN">
            <div className="relative h-10 w-[108px] overflow-hidden rounded-md border border-[#0a2e4a]/10 bg-white shadow-sm">
              <Image
                src="/logos/New_logo_saien.svg"
                alt="Logo SAIEN"
                fill
                priority
                sizes="108px"
                className="object-cover [object-position:center_50%]"
              />
            </div>
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
                    ? "text-[#0e6f5c] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-[#0e6f5c]"
                    : "text-[#0a2e4a]/70 hover:text-[#0a2e4a]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated && (
              <>
                <Link
                  href="/connexion"
                  className="text-sm font-medium text-[#0a2e4a]/75 hover:text-[#0a2e4a] transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/inscription"
                  className="text-sm font-medium text-[#0a2e4a]/75 hover:text-[#0a2e4a] transition-colors"
                >
                  Inscription
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link
                  href={dashboardHref}
                  className="text-sm font-medium text-[#0a2e4a]/75 hover:text-[#0a2e4a] transition-colors"
                >
                  Mon espace
                </Link>
                <Link
                  href="/deconnexion"
                  className="text-sm font-medium text-[#0a2e4a]/75 hover:text-[#0a2e4a] transition-colors"
                >
                  Deconnexion
                </Link>
              </>
            )}

            {shouldShowJoin && (
              <Link
                href="/rejoindre"
                className="flex items-center gap-1.5 bg-[#0e6f5c] hover:bg-[#0c5f50] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full"
              >
                Rejoindre le réseau
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            )}

          </div>

          {/* Mobile burger */}
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="md:hidden p-2 -mr-2 text-[#0a2e4a]"
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
        <div className="md:hidden border-t border-[#0a2e4a]/10 bg-[#fdfef6] px-4 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-[#0e6f5c]"
                  : "text-[#0a2e4a]/80 hover:text-[#0a2e4a]"
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          {!isAuthenticated && (
            <>
              <Link
                href="/connexion"
                className="text-sm font-medium text-[#0a2e4a]/80 hover:text-[#0a2e4a] transition-colors"
                onClick={() => setOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="text-sm font-medium text-[#0a2e4a]/80 hover:text-[#0a2e4a] transition-colors"
                onClick={() => setOpen(false)}
              >
                Inscription
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                href={dashboardHref}
                className="text-sm font-medium text-[#0a2e4a]/80 hover:text-[#0a2e4a] transition-colors"
                onClick={() => setOpen(false)}
              >
                Mon espace
              </Link>
              <Link
                href="/deconnexion"
                className="text-sm font-medium text-[#0a2e4a]/80 hover:text-[#0a2e4a] transition-colors"
                onClick={() => setOpen(false)}
              >
                Deconnexion
              </Link>
            </>
          )}

          {shouldShowJoin && (
            <Link
              href="/rejoindre"
              className="mt-1 flex items-center justify-center gap-1.5 bg-[#0e6f5c] hover:bg-[#0c5f50] transition-colors text-white text-sm font-semibold px-4 py-3 rounded-full"
              onClick={() => setOpen(false)}
            >
              Rejoindre le réseau
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
