"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { AdminProvider, useAdminContext } from "@/components/admin/AdminContext";
import { useUserSession } from "@/components/auth/UserSessionContext";

type AdminLayoutProps = {
  children: ReactNode;
};

type AdminNavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/membres", label: "Membres", icon: Users },
  { href: "/admin/inscriptions", label: "Inscriptions", icon: UserPlus },
  { href: "/admin/evenements", label: "Evenements", icon: Calendar },
  { href: "/admin/parametres", label: "Parametres", icon: Settings },
];

const formatPendingCounter = (value: number) => {
  if (value > 99) return "99+";
  return String(value);
};

function AdminLayoutShell({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { summary } = useAdminContext();
  const { isHydrated, isAuthenticated, isAdmin, session, signOut } = useUserSession();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace("/connexion?next=/admin");
      return;
    }

    if (!isAdmin) {
      router.replace("/espace-membre");
    }
  }, [isHydrated, isAuthenticated, isAdmin, router]);

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  let pageTitle = "Tableau de bord";
  let pageDescription = "Pilotage global de la plateforme SAIEN.";

  if (pathname.startsWith("/admin/membres")) {
    pageTitle = "Gestion des Membres";
    pageDescription = "Administration du repertoire, des statuts et des roles.";
  } else if (pathname.startsWith("/admin/inscriptions")) {
    pageTitle = "Gestion des Inscriptions";
    pageDescription = "Traitement des demandes entrantes et decisions de validation.";
  } else if (pathname.startsWith("/admin/evenements")) {
    pageTitle = "Gestion des Evenements";
    pageDescription = "Planification, publication et suivi des capacites.";
  } else if (pathname.startsWith("/admin/parametres")) {
    pageTitle = "Parametres";
    pageDescription = "Configuration globale de la plateforme et des notifications.";
  }

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  if (!isHydrated || !isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          Chargement de votre espace admin...
        </p>
      </div>
    );
  }

  const initials = (session?.fullName ?? "SA")
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const roleLabel =
    session?.role === "super-admin"
      ? "Super Admin"
      : session?.role === "admin"
        ? "Admin"
        : "Membre";

  return (
    <div className="min-h-screen bg-[#F8FAFC] lg:flex lg:h-screen">
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[82vw] max-w-[22rem] border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 lg:border-l-0 lg:border-r lg:shadow-none ${
          mobileSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200">
              <span className="text-xl font-bold flex items-center gap-2 text-[#0A2540]">
                <div className="w-6 h-6 bg-[#16A34A] rounded flex items-center justify-center text-white">
                  <Users size={16} />
                </div>
                SAIEN Admin
              </span>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setMobileSidebarOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                const isRegistrationsLink = href === "/admin/inscriptions";

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      active
                        ? "bg-green-50 text-[#16A34A] border-l-4 border-[#16A34A]"
                        : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{label}</span>
                    </span>

                    {isRegistrationsLink && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {formatPendingCounter(summary.pendingRegistrations)}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors border-l-4 border-transparent"
            >
              <LogOut size={20} />
              <span className="font-medium">Deconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:min-h-0">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-[#0A2540] truncate">{pageTitle}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{pageDescription}</p>
            </div>

            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600"
            >
              <Menu size={18} />
            </button>
          </div>
        </header>

        <header className="hidden h-20 bg-white border-b border-gray-200 lg:flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2540]">{pageTitle}</h1>
            <p className="text-gray-500 text-sm">{pageDescription}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent w-64"
              />
            </div>

            <button className="relative text-gray-500 hover:text-gray-700" aria-label="Notifications">
              <Bell size={20} />
              {summary.pendingRegistrations > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden">
                {initials}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{session?.fullName ?? "Administrateur"}</p>
                <p className="text-xs text-gray-500">{roleLabel}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <AdminProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AdminProvider>
  );
}
