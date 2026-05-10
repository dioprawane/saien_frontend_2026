"use client";

import dynamic from "next/dynamic";

const AdhesionForm = dynamic(() => import("@/components/adhesion/AdhesionForm"), {
  ssr: false,
  loading: () => (
    <section className="bg-white pt-5 pb-12 lg:pt-6 lg:pb-14" aria-labelledby="adhesion-form-heading-loading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Chargement du formulaire d'adhesion...
        </div>
      </div>
    </section>
  ),
});

export default function AdhesionFormClient() {
  return <AdhesionForm />;
}
