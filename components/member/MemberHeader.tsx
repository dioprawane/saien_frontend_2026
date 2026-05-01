"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

const MEMBER_NAV = [
  { label: "Tableau de bord", href: "/espace-membre" },
  { label: "Événements", href: "/espace-membre/evenements" },
  { label: "Réseau", href: "/espace-membre/reseau" },
  { label: "Ma Carte", href: "/espace-membre/carte" },
];

export default function MemberHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/espace-membre"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-[#fdfef6]/95 backdrop-blur border-b border-[#0a2e4a]/10">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/espace-membre" className="flex items-center gap-2.5 shrink-0" aria-label="Espace membre SAIEN">
            <div className="relative h-10 w-[108px] overflow-hidden rounded-md border border-[#0a2e4a]/10 bg-white shadow-sm">
              <Image
                src="/logos/Logo_saien.png"
                alt="Logo SAIEN"
                fill
                priority
                sizes="108px"
                className="object-cover [object-position:center_50%]"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation espace membre">
            {MEMBER_NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive(href)
                    ? "border-[#0e6f5c] text-[#0a2e4a]"
                    : "border-transparent text-[#0a2e4a]/65 hover:text-[#0a2e4a]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-[#0a2e4a]/70 hover:text-[#0a2e4a] hover:border-[#0a2e4a]/30 transition-colors"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#0e6f5c]" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 px-2.5 py-1.5 hover:border-[#0a2e4a]/30 transition-colors"
            aria-label="Menu utilisateur"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="/members/avatar-1.png"
                alt="Avatar utilisateur"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-xs font-semibold text-[#0a2e4a]">Jean Dupont</p>
              <p className="text-[11px] text-[#0a2e4a]/60">Membre Actif</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[#0a2e4a]/60" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
