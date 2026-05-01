import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Mes cotisations — SAIEN",
  description: "Consultez l'historique de vos cotisations et renouvellements membre.",
};

const HISTORY = [
  { year: "2026", plan: "Membre Premium", amount: "200 €", status: "À renouveler" },
  { year: "2025", plan: "Membre Premium", amount: "200 €", status: "Payé" },
  { year: "2024", plan: "Membre Actif", amount: "50 €", status: "Payé" },
  { year: "2023", plan: "Membre Actif", amount: "50 €", status: "Payé" },
];

export default function CotisationsPage() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">Mes cotisations</h1>
          <p className="mt-2 text-slate-500">Historique de vos paiements et statut de renouvellement.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600">
            <p>Année</p>
            <p>Formule</p>
            <p>Montant</p>
            <p>Statut</p>
          </div>
          <div>
            {HISTORY.map((item) => (
              <div key={item.year} className="grid grid-cols-4 px-4 py-3 text-sm border-b border-slate-100 last:border-0">
                <p className="font-semibold text-slate-700">{item.year}</p>
                <p className="text-slate-600">{item.plan}</p>
                <p className="text-slate-600 inline-flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-emerald-600" aria-hidden="true" />{item.amount}</p>
                <p>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "Payé" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {item.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-emerald-800 inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4" aria-hidden="true" />Renouvellement 2026 disponible avec réduction de 10%.</p>
          <Link href="/espace-membre/carte" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
            Renouveler depuis ma carte
          </Link>
        </div>
      </div>
    </section>
  );
}
