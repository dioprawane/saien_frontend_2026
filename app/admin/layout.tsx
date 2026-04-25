"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  Settings, 
  LogOut,
  Bell,
  Search
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Helper pour vérifier si un lien est actif
  const isActive = (path: string) => pathname === path;

  // Déterminer le titre et la description en fonction de la route
  let pageTitle = "Tableau de bord";
  let pageDescription = "Aperçu général de la plateforme.";

  if (pathname === "/admin/membres") {
    pageTitle = "Gestion des Membres";
    pageDescription = "Liste et gestion de tous les membres.";
  } else if (pathname === "/admin/inscriptions") {
    pageTitle = "Gestion des Inscriptions";
    pageDescription = "Bienvenue, Admin. Voici les dernières demandes.";
  } else if (pathname === "/admin/evenements") {
    pageTitle = "Gestion des Événements";
    pageDescription = "Calendrier et organisation des événements.";
  } else if (pathname === "/admin/parametres") {
    pageTitle = "Paramètres";
    pageDescription = "Configuration du système et de votre compte.";
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-bold flex items-center gap-2 text-[#0A2540]">
              <div className="w-6 h-6 bg-[#16A34A] rounded flex items-center justify-center text-white">
                <Users size={16} />
              </div>
              SAIEN Admin
            </span>
          </div>
          
          <nav className="p-4 space-y-1">
            <Link 
              href="/admin" 
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive("/admin") 
                  ? "bg-green-50 text-[#16A34A] border-l-4 border-[#16A34A]" 
                  : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Tableau de bord</span>
            </Link>
            
            <Link 
              href="/admin/membres" 
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive("/admin/membres") 
                  ? "bg-green-50 text-[#16A34A] border-l-4 border-[#16A34A]" 
                  : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
            >
              <Users size={20} />
              <span className="font-medium">Membres</span>
            </Link>
            
            <Link 
              href="/admin/inscriptions" 
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                isActive("/admin/inscriptions") 
                  ? "bg-green-50 text-[#16A34A] border-l-4 border-[#16A34A]" 
                  : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserPlus size={20} />
                <span className="font-medium">Inscriptions</span>
              </div>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">12</span>
            </Link>
            
            <Link 
              href="/admin/evenements" 
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive("/admin/evenements") 
                  ? "bg-green-50 text-[#16A34A] border-l-4 border-[#16A34A]" 
                  : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
            >
              <Calendar size={20} />
              <span className="font-medium">Événements</span>
            </Link>
            
            <Link 
              href="/admin/parametres" 
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive("/admin/parametres") 
                  ? "bg-green-50 text-[#16A34A] border-l-4 border-[#16A34A]" 
                  : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
              }`}
            >
              <Settings size={20} />
              <span className="font-medium">Paramètres</span>
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors border-l-4 border-transparent">
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2540]">{pageTitle}</h1>
            <p className="text-gray-500 text-sm">{pageDescription}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent w-64"
              />
            </div>
            
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Jean Dupont" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Jean Dupont</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
