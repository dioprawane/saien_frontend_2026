"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, Search, Trash2, Users } from "lucide-react";
import {
  type NewsletterSubscriber,
  deleteNewsletterSubscriber,
  getAdminNewsletterSubscribers,
} from "@/lib/api/newsletter";
import { getApiErrorMessage } from "@/lib/api/errors";

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminNewsletterSubscribers();
      setSubscribers(data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible de charger les abonnés."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = async (email: string) => {
    if (!confirm(`Supprimer l'abonné ${email} ?`)) return;
    setDeletingEmail(email);
    try {
      await deleteNewsletterSubscriber(email);
      setSubscribers((prev) => prev.filter((s) => s.email !== email));
    } catch (err) {
      setError(getApiErrorMessage(err, "Erreur lors de la suppression."));
    } finally {
      setDeletingEmail(null);
    }
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <Mail className="h-6 w-6 text-brand-green-hover" />
        <div>
          <h1 className="text-2xl font-black text-[#0A2540]">Newsletter</h1>
          <p className="text-sm text-slate-500">
            {subscribers.length} abonné{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-[#0A2540] placeholder:text-slate-400 focus:border-brand-green focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-slate-400 text-sm">
            Chargement...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Users className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-500">
              {search ? "Aucun abonné trouvé." : "Aucun abonné pour l'instant."}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 text-left">Email</th>
                <th className="hidden px-4 py-3 text-left sm:table-cell">Source</th>
                <th className="hidden px-4 py-3 text-left md:table-cell">Date d&apos;abonnement</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sub) => (
                <tr key={sub.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-[#0A2540]">{sub.email}</td>
                  <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                    {sub.source ?? "—"}
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                    {formatDate(sub.subscribedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => void handleDelete(sub.email)}
                      disabled={deletingEmail === sub.email}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
