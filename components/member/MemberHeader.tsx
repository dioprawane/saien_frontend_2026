"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, LayoutDashboard, LogOut, Settings, Ticket, User, Users, WalletCards } from "lucide-react";
import { useUserSession } from "@/components/auth/UserSessionContext";

const PUBLIC_NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "A propos", href: "/a-propos" },
  { label: "Vision & Missions", href: "/vision" },
  { label: "Réseau & Bureau", href: "/reseau" },
  { label: "Actualités", href: "/actualites" },
  { label: "Événements", href: "/evenements" },
];

const PROFILE_MENU_LINKS = [
  { label: "Tableau de bord", href: "/espace-membre", icon: LayoutDashboard },
  { label: "Profil", href: "/espace-membre/profil", icon: User },
  { label: "Événements", href: "/espace-membre/evenements", icon: Ticket },
  { label: "Réseau", href: "/espace-membre/reseau", icon: Users },
  { label: "Ma Carte", href: "/espace-membre/carte", icon: WalletCards },
  { label: "Paramètres", href: "/espace-membre/parametres", icon: Settings },
];

const ADMIN_SHORTCUT = { label: "Admin", href: "/admin", icon: LayoutDashboard };

export default function MemberHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isAdmin, signOut } = useUserSession();
  const shouldShowJoin = Boolean(session && !session.isMember);

  const activeSession = session ?? {
    fullName: "Jean Dupont",
    memberLabel: "Membre Actif",
    memberType: "active",
    avatarUrl: "/members/avatar-1.png",
  };

  const MEMBER_TYPE_DISPLAY: Record<string, string> = {
    active: "Membre Actif",
    adherent: "Membre Adhérent",
    honor: "Membre d'Honneur",
    benefactor: "Membre Bienfaiteur",
  };

  const memberTypeDisplay =
    (activeSession.memberType && MEMBER_TYPE_DISPLAY[activeSession.memberType]) ||
    activeSession.memberLabel;

  const closeDetails = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return;
    target.closest("details")?.removeAttribute("open");
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-[#fdfef6]/95 backdrop-blur border-b border-[#0a2e4a]/10">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Accueil SAIEN">
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

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
            {PUBLIC_NAV_LINKS.map(({ label, href }) => (
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
          {shouldShowJoin && (
            <Link
              href="/rejoindre"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0e6f5c] hover:bg-[#0c5f50] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full"
            >
              Rejoindre le réseau
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}

          <details className="relative">
            <summary
              className="list-none inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 px-2.5 py-1.5 hover:border-[#0a2e4a]/30 transition-colors [&::-webkit-details-marker]:hidden"
              aria-label="Menu utilisateur"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center">
                {activeSession.avatarUrl ? (
                  <Image
                    src={activeSession.avatarUrl}
                    alt="Avatar utilisateur"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                ) : (
                  activeSession.fullName
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                )}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-xs font-semibold text-[#0a2e4a]">{activeSession.fullName}</p>
                <p className="text-[11px] text-[#0a2e4a]/60">{memberTypeDisplay}</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#0a2e4a]/60" aria-hidden="true" />
            </summary>

            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-30">
              {PROFILE_MENU_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(event) => closeDetails(event.currentTarget)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-[#0a2e4a]/80 hover:bg-slate-50 hover:text-[#0a2e4a]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              ))}

              {isAdmin && (
                <>
                  <div className="my-1 border-t border-slate-200" />
                  <Link
                    href={ADMIN_SHORTCUT.href}
                    onClick={(event) => closeDetails(event.currentTarget)}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-[#0e6f5c] hover:bg-[#0e6f5c]/10"
                  >
                    <ADMIN_SHORTCUT.icon className="h-4 w-4" aria-hidden="true" />
                    {ADMIN_SHORTCUT.label}
                  </Link>
                </>
              )}

              <button
                type="button"
                onClick={handleSignOut}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Déconnexion
              </button>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
