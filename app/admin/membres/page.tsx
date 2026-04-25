import { Users } from "lucide-react";

export default function MembresAdminPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0A2540] mb-4">
          <Users className="text-[#16A34A]" />
          Annuaire des membres
        </h2>
        <p className="text-gray-500">
          Cette page vous permet de gérer les membres actifs et bienfaiteurs de l'association.
        </p>
      </div>
    </div>
  );
}
