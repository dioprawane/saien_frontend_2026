import { Calendar } from "lucide-react";

export default function EvenementsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0A2540] mb-4">
          <Calendar className="text-[#16A34A]" />
          Gestion des événements
        </h2>
        <p className="text-gray-500">
          Retrouvez ici le calendrier, la création et l'édition des événements, webinaires et conférences.
        </p>
      </div>
    </div>
  );
}
