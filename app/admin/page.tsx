import { LayoutDashboard } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0A2540] mb-4">
          <LayoutDashboard className="text-[#16A34A]" />
          Vue d'ensemble
        </h2>
        <p className="text-gray-500">
          Bienvenue sur le tableau de bord de l'application SAIEN. Les statistiques globales apparaîtront ici.
        </p>
      </div>
    </div>
  );
}
