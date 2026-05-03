import type { Metadata } from "next";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Mon profil — SAIEN",
  description: "Consultez et mettez à jour vos informations membre SAIEN.",
};

export default function ProfilMembrePage() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">Mon profil</h1>
          <p className="mt-2 text-slate-500">Gérez vos informations personnelles et professionnelles.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-slate-500">Nom complet</p>
            <p className="mt-1 font-semibold text-slate-800">Jean Dupont</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Titre</p>
            <p className="mt-1 font-semibold text-slate-800 inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-emerald-600" aria-hidden="true" />Data Scientist</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p className="mt-1 font-semibold text-slate-800 inline-flex items-center gap-1.5"><Mail className="h-4 w-4 text-emerald-600" aria-hidden="true" />jean.dupont@example.com</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Téléphone</p>
            <p className="mt-1 font-semibold text-slate-800 inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-emerald-600" aria-hidden="true" />+33 6 00 00 00 00</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-slate-500">Localisation</p>
            <p className="mt-1 font-semibold text-slate-800 inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-emerald-600" aria-hidden="true" />Paris, France</p>
          </div>
        </div>
      </div>
    </section>
  );
}
