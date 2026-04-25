import { 
  Users, 
  Hourglass, 
  CheckCircle2, 
  XOctagon,
  ChevronDown,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function InscriptionsAdminPage() {
  const stats = [
    { label: "Membres Totaux", value: "2,450", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "En attente", value: "48", icon: Hourglass, color: "text-orange-500", bg: "bg-orange-100" },
    { label: "Validées (Ce mois)", value: "156", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { label: "Refusées", value: "12", icon: XOctagon, color: "text-red-500", bg: "bg-red-100" },
  ];

  const requests = [
    {
      id: "AM",
      name: "Amadou Diallo",
      email: "amadou.d@example.com",
      type: "Actif",
      date: "15 Oct 2023",
      status: "En attente",
      statusColor: "text-orange-600",
      statusBg: "bg-orange-100",
      avatarColor: "bg-blue-100 text-blue-700"
    },
    {
      id: "SK",
      name: "Sarah Kouassi",
      email: "sarah.k@example.com",
      type: "Bienfaiteur",
      date: "14 Oct 2023",
      status: "Validé",
      statusColor: "text-green-700",
      statusBg: "bg-green-100",
      avatarColor: "bg-purple-100 text-purple-700"
    },
    {
      id: "ML",
      name: "Marc Laurent",
      email: "m.laurent@tech.org",
      type: "Actif",
      date: "14 Oct 2023",
      status: "En attente",
      statusColor: "text-orange-600",
      statusBg: "bg-orange-100",
      avatarColor: "bg-indigo-100 text-indigo-700"
    },
    {
      id: "CD",
      name: "Chloe Dubois",
      email: "chloe.d@example.com",
      type: "Actif",
      date: "12 Oct 2023",
      status: "Refusé",
      statusColor: "text-red-700",
      statusBg: "bg-red-100",
      avatarColor: "bg-indigo-100 text-indigo-700"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {/* Table Header Area */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0A2540]">Demandes d'inscription récentes</h2>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors">
              <Filter size={16} />
              Tous les statuts
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors">
              Type de membre
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-gray-100">Nom / Prénom</th>
                <th className="px-6 py-4 border-b border-gray-100">Email</th>
                <th className="px-6 py-4 border-b border-gray-100">Type</th>
                <th className="px-6 py-4 border-b border-gray-100">Date</th>
                <th className="px-6 py-4 border-b border-gray-100">Statut</th>
                <th className="px-6 py-4 border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${req.avatarColor}`}>
                      {req.id}
                    </div>
                    <span className="font-semibold text-gray-900">{req.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{req.email}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium text-sm">{req.type}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{req.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${req.statusBg} ${req.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${req.statusColor.replace('text', 'bg')}`}></span>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <p>Affichage 1 à 4 sur 48 entrées</p>
          
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#0A2540] text-white flex items-center justify-center font-medium">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 flex items-center justify-center font-medium transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 flex items-center justify-center font-medium transition-colors">3</button>
            <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
