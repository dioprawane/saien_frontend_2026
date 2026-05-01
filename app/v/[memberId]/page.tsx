import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldAlert } from "lucide-react";

type VerificationPageProps = {
  params: Promise<{ memberId: string }>;
};

type VerifiedMember = {
  fullName: string;
  memberType: string;
  status: string;
  expiresOn: string;
};

const VERIFIED_MEMBERS: Record<string, VerifiedMember> = {
  "SAIEN-7629428": {
    fullName: "Jean Dupont",
    memberType: "Membre Actif",
    status: "Actif",
    expiresOn: "31 Decembre 2025",
  },
};

const normalizeMemberId = (rawMemberId: string) =>
  decodeURIComponent(rawMemberId).trim().toUpperCase();

const getMemberTypeLabel = (memberType: string) =>
  memberType.replace(/^membre\s+/i, "").trim() || memberType;

export async function generateMetadata({
  params,
}: VerificationPageProps): Promise<Metadata> {
  const { memberId } = await params;
  const normalizedMemberId = normalizeMemberId(memberId);
  const member = VERIFIED_MEMBERS[normalizedMemberId];

  if (member) {
    return {
      title: `Carte vérifiée ${normalizedMemberId} - SAIEN`,
      description: "La carte membre scannée est valide et active.",
    };
  }

  return {
    title: `Carte non reconnue ${normalizedMemberId} - SAIEN`,
    description: "Le code scanné ne correspond pas à une carte membre valide.",
  };
}

export default async function MemberVerificationPage({
  params,
}: VerificationPageProps) {
  const { memberId } = await params;
  const normalizedMemberId = normalizeMemberId(memberId);
  const member = VERIFIED_MEMBERS[normalizedMemberId];

  return (
    <main className="min-h-screen bg-brand-surface px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {member ? (
            <>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green-soft-strong bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green-hover">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Vérifié
              </div>

              <h1 className="mt-4 text-2xl font-extrabold text-[#0a2e4a] sm:text-3xl">
                Carte membre valide
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Cette carte est reconnue par SAIEN et peut être utilisée pour
                accéder aux événements et services membres.
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-500">ID membre</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0a2e4a]">{normalizedMemberId}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Nom</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0a2e4a]">{member.fullName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Type</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0a2e4a]">
                    {getMemberTypeLabel(member.memberType)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Statut</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0a2e4a]">{member.status}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-500">Expiration</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0a2e4a]">{member.expiresOn}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                Non vérifié
              </div>

              <h1 className="mt-4 text-2xl font-extrabold text-[#0a2e4a] sm:text-3xl">
                Carte non reconnue
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Le code scanné ne correspond pas à une carte valide dans le
                registre public SAIEN.
              </p>

              <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-xs text-rose-700">ID scanne</p>
                <p className="mt-1 font-semibold text-rose-800">{normalizedMemberId}</p>
              </div>
            </>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
            >
              Retour à l'accueil
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
            >
              Signaler un problème
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
