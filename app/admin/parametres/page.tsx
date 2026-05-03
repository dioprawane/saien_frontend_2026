"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Database,
  Download,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { type MemberType, useAdminContext } from "@/components/admin/AdminContext";

const typeLabel: Record<MemberType, string> = {
  active: "Actif",
  adherent: "Adherent",
  honor: "Honneur",
  benefactor: "Bienfaiteur",
};

export default function ParametresAdminPage() {
  const {
    settings,
    members,
    registrations,
    events,
    saveSettings,
    resetAdminData,
  } = useAdminContext();

  const [formState, setFormState] = useState(settings);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setFormState(settings);
  }, [settings]);

  const handleSave = () => {
    saveSettings(formState);
    setFeedback("Parametres sauvegardes.");
  };

  const handleResetData = () => {
    if (!window.confirm("Reinitialiser les donnees admin de demonstration ?")) return;
    resetAdminData();
    setFeedback("Donnees admin reinitialisees.");
  };

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      settings: formState,
      members,
      registrations,
      events,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `saien-admin-export-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);

    setFeedback("Export JSON genere.");
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-xl font-bold inline-flex items-center gap-2 text-[#0A2540]">
          <Settings className="text-[#16A34A]" size={20} />
          Parametres de la plateforme
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Configurez les regles d'inscription, les notifications et la verification des cartes.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase text-gray-500">Nom de l'organisation</span>
            <input
              type="text"
              value={formState.organizationName}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, organizationName: event.target.value }))
              }
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase text-gray-500">Email support</span>
            <input
              type="email"
              value={formState.supportEmail}
              onChange={(event) =>
                setFormState((previous) => ({ ...previous, supportEmail: event.target.value }))
              }
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase text-gray-500">Type membre par defaut</span>
            <select
              value={formState.defaultMemberType}
              onChange={(event) =>
                setFormState((previous) => ({
                  ...previous,
                  defaultMemberType: event.target.value as MemberType,
                }))
              }
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm"
            >
              <option value="active">{typeLabel.active}</option>
              <option value="adherent">{typeLabel.adherent}</option>
              <option value="honor">{typeLabel.honor}</option>
              <option value="benefactor">{typeLabel.benefactor}</option>
            </select>
          </label>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#0A2540] inline-flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#16A34A]" />
          Regles et securite
        </h3>

        <ToggleRow
          title="Validation automatique des inscriptions"
          description="Accepte automatiquement les nouvelles demandes qui passent les controles de base."
          checked={formState.autoApproval}
          onChange={(checked) =>
            setFormState((previous) => ({
              ...previous,
              autoApproval: checked,
            }))
          }
        />

        <ToggleRow
          title="Verification manuelle des paiements"
          description="Exige une revue administrative avant activation definitive d'un membre."
          checked={formState.paymentReviewRequired}
          onChange={(checked) =>
            setFormState((previous) => ({
              ...previous,
              paymentReviewRequired: checked,
            }))
          }
        />

        <ToggleRow
          title="Verification de carte membre active"
          description="Active les pages de verification publique accessibles par scan de code barre."
          checked={formState.memberCardVerificationEnabled}
          onChange={(checked) =>
            setFormState((previous) => ({
              ...previous,
              memberCardVerificationEnabled: checked,
            }))
          }
        />
      </section>

      <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#0A2540] inline-flex items-center gap-2">
          <Bell size={18} className="text-[#16A34A]" />
          Notifications admin
        </h3>

        <ToggleRow
          title="Alerte nouvelle inscription"
          description="Envoie une notification a chaque nouvelle demande d'adhesion."
          checked={formState.notifyOnNewRegistration}
          onChange={(checked) =>
            setFormState((previous) => ({
              ...previous,
              notifyOnNewRegistration: checked,
            }))
          }
        />

        <ToggleRow
          title="Alerte capacite evenement"
          description="Declenche une alerte quand un evenement depasse 80% de sa capacite."
          checked={formState.notifyOnEventThreshold}
          onChange={(checked) =>
            setFormState((previous) => ({
              ...previous,
              notifyOnEventThreshold: checked,
            }))
          }
        />
      </section>

      <section className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-3">
        <h3 className="text-lg font-bold text-[#0A2540] inline-flex items-center gap-2">
          <Database size={18} className="text-[#16A34A]" />
          Operations systeme
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white hover:bg-[#12385a]"
          >
            <Save size={15} />
            Sauvegarder
          </button>

          <button
            type="button"
            onClick={() => setFeedback("Test de notification simule avec succes.")}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            <Bell size={15} />
            Tester notification
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            <Download size={15} />
            Export JSON
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            <RotateCcw size={15} />
            Reinitialiser donnees demo
          </button>
        </div>

        {feedback && <p className="text-sm text-[#0A2540]">{feedback}</p>}
      </section>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 self-end items-center rounded-full transition-colors sm:self-auto ${
          checked ? "bg-[#16A34A]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
