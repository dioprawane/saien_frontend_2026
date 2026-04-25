import { Settings } from "lucide-react";

export default function ParametresAdminPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0A2540] mb-4">
          <Settings className="text-[#16A34A]" />
          Paramètres du système
        </h2>
        <p className="text-gray-500">
          Cette section vous permet de configurer les réglages globaux de la plateforme.
        </p>
      </div>
    </div>
  );
}
