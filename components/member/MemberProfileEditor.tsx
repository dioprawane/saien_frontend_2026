"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Briefcase,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Upload,
  User,
} from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import {
  getMemberProfile,
  uploadMemberAvatar,
  updateMemberProfile,
  type MemberProfileResponse,
} from "@/lib/api/member";
import { useUserSession } from "@/components/auth/UserSessionContext";

type MemberProfileEditorProps = {
  variant?: "member" | "admin";
};

type ProfileFormState = {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  phone: string;
  city: string;
  country: string;
  expertise: string;
  avatarUrl: string;
  linkedinUrl: string;
  networkBio: string;
};

type Notice = {
  type: "success" | "error";
  message: string;
};

const EMPTY_FORM_STATE: ProfileFormState = {
  firstName: "",
  lastName: "",
  email: "",
  title: "",
  phone: "",
  city: "",
  country: "",
  expertise: "",
  avatarUrl: "",
  linkedinUrl: "",
  networkBio: "",
};

const MEMBER_TYPE_LABELS: Record<string, string> = {
  ACTIVE: "Membre actif",
  ADHERENT: "Membre adherent",
  HONOR: "Membre d'honneur",
  BENEFACTOR: "Membre bienfaiteur",
};

const MEMBER_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Actif",
  PENDING: "En cours",
  EXPIRED: "Expire",
  SUSPENDED: "Suspendu",
};

const ROLE_LABELS: Record<string, string> = {
  member: "Membre",
  admin: "Administrateur",
  "super-admin": "Super administrateur",
};

function splitFullName(fullName: string) {
  const normalized = fullName.trim();
  if (!normalized) {
    return { firstName: "", lastName: "" };
  }

  const tokens = normalized.split(/\s+/);
  if (tokens.length === 1) {
    return { firstName: tokens[0], lastName: "" };
  }

  return {
    firstName: tokens[0],
    lastName: tokens.slice(1).join(" "),
  };
}

function buildFullName(firstName: string, lastName: string) {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
}

function emptyToNull(value: string) {
  const normalized = value.trim();
  return normalized ? normalized : null;
}

function toFormState(profile: MemberProfileResponse, fallbackEmail: string): ProfileFormState {
  const { firstName, lastName } = splitFullName(profile.fullName ?? "");

  return {
    firstName,
    lastName,
    email: profile.email ?? fallbackEmail,
    title: profile.title ?? "",
    phone: profile.phone ?? "",
    city: profile.city ?? "",
    country: profile.country ?? "",
    expertise: profile.expertise ?? "",
    avatarUrl: profile.avatarUrl ?? "",
    linkedinUrl: profile.linkedinUrl ?? "",
    networkBio: profile.networkBio ?? "",
  };
}

export default function MemberProfileEditor({
  variant = "member",
}: MemberProfileEditorProps) {
  const { isHydrated, session, updateSession } = useUserSession();
  const [form, setForm] = useState<ProfileFormState>(EMPTY_FORM_STATE);
  const [profile, setProfile] = useState<MemberProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isHydrated || !session?.email) return;

    const sessionEmail = session.email;

    let cancelled = false;

    setIsLoading(true);
    setNotice(null);
    setForm((previous) => ({
      ...previous,
      ...toFormState(
        {
          id: session.id,
          fullName: session.fullName,
          email: sessionEmail,
          title: null,
          phone: null,
          city: null,
          country: null,
          expertise: null,
          linkedinUrl: null,
          networkBio: null,
          memberType: "",
          memberStatus: "",
          avatarUrl: session.avatarUrl,
          joinedAt: null,
        },
        sessionEmail,
      ),
    }));

    async function loadProfile() {
      try {
        const remoteProfile = await getMemberProfile(sessionEmail);
        if (cancelled) return;

        setProfile(remoteProfile);
        setForm(toFormState(remoteProfile, sessionEmail));
      } catch (error) {
        if (cancelled) return;

        const message =
          error instanceof ApiClientError
            ? error.message
            : "Impossible de charger le profil distant pour le moment.";

        setNotice({ type: "error", message });
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [isHydrated, session?.email]);

  const joinedAtLabel = useMemo(() => {
    if (!profile?.joinedAt) return "Non renseigne";

    try {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(profile.joinedAt));
    } catch {
      return "Non renseigne";
    }
  }, [profile?.joinedAt]);

  const memberTypeLabel =
    (profile?.memberType && MEMBER_TYPE_LABELS[profile.memberType]) ||
    profile?.memberType ||
    "Membre";

  const memberStatusLabel =
    (profile?.memberStatus && MEMBER_STATUS_LABELS[profile.memberStatus]) ||
    profile?.memberStatus ||
    "Actif";

  const roleLabel =
    (session?.role && ROLE_LABELS[session.role]) ||
    session?.role ||
    "Non renseigne";

  const publicId = profile?.id?.trim() ? profile.id : "Non renseigne";
  const memberLabel = session?.memberLabel?.trim() ? session.memberLabel : memberTypeLabel;

  const pageTitle = variant === "admin" ? "Profil administrateur" : "Mon profil";
  const pageDescription =
    variant === "admin"
      ? "Consultez et mettez a jour vos informations de compte administrateur."
      : "Gerez vos informations personnelles et professionnelles.";

  const handleFieldChange =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((previous) => ({ ...previous, [field]: value }));
    };

  const handleAvatarFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session?.email) {
      return;
    }

    setIsUploadingAvatar(true);
    setNotice(null);

    try {
      const updatedProfile = await uploadMemberAvatar(session.email, file);
      setProfile(updatedProfile);
      setForm(toFormState(updatedProfile, session.email));

      updateSession({
        ...session,
        fullName: updatedProfile.fullName,
        email: updatedProfile.email,
        avatarUrl: updatedProfile.avatarUrl ?? session.avatarUrl,
      });

      setNotice({
        type: "success",
        message: "Photo de profil mise a jour avec succes.",
      });
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Echec du televersement de la photo. Veuillez reessayer.";

      setNotice({ type: "error", message });
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session?.email) {
      setNotice({
        type: "error",
        message: "Session invalide. Reconnectez-vous pour modifier votre profil.",
      });
      return;
    }

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();

    if (!firstName || !lastName) {
      setNotice({
        type: "error",
        message: "Le prenom et le nom sont obligatoires.",
      });
      return;
    }

    setIsSaving(true);
    setNotice(null);

    try {
      const updatedProfile = await updateMemberProfile(session.email, {
        fullName: buildFullName(firstName, lastName),
        title: emptyToNull(form.title),
        phone: emptyToNull(form.phone),
        city: emptyToNull(form.city),
        country: emptyToNull(form.country),
        expertise: emptyToNull(form.expertise),
        avatarUrl: emptyToNull(form.avatarUrl),
        linkedinUrl: emptyToNull(form.linkedinUrl),
        networkBio: emptyToNull(form.networkBio),
      });

      setProfile(updatedProfile);
      setForm(toFormState(updatedProfile, session.email));

      updateSession({
        ...session,
        fullName: updatedProfile.fullName,
        email: updatedProfile.email,
        avatarUrl: updatedProfile.avatarUrl ?? session.avatarUrl,
      });

      setNotice({
        type: "success",
        message: "Profil mis a jour avec succes.",
      });
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Echec de la mise a jour du profil. Veuillez reessayer.";

      setNotice({ type: "error", message });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isHydrated || !session) {
    return (
      <section className="py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Chargement de votre profil...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">{pageTitle}</h1>
          <p className="mt-2 text-slate-500">{pageDescription}</p>
        </div>

        {notice ? (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {notice.message}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5"
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                Informations du compte (lecture seule)
              </h2>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Public ID</span>
                  <input
                    type="text"
                    value={publicId}
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Role</span>
                  <input
                    type="text"
                    value={roleLabel}
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  />
                </label>

                <label className="space-y-1 md:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Membre</span>
                  <input
                    type="text"
                    value={memberLabel}
                    readOnly
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  />
                </label>
              </div>

              <p className="text-xs text-slate-500">
                Ces informations sont gerees par les regles de compte et ne sont pas modifiables ici.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-[#0A3458]">Informations personnelles</h2>
              {isLoading ? (
                <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  Synchronisation...
                </span>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Photo de profil</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-white">
                    {form.avatarUrl.trim() ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.avatarUrl}
                        alt="Photo de profil"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
                        {form.firstName.slice(0, 1)}{form.lastName.slice(0, 1)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={handleAvatarFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isUploadingAvatar ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Upload className="h-4 w-4" aria-hidden="true" />
                      )}
                      {isUploadingAvatar ? "Televersement..." : "Choisir une image"}
                    </button>
                    <p className="text-xs text-slate-500">
                      Formats: JPG, PNG, WEBP, GIF. Taille max recommandee: 5 Mo.
                    </p>
                  </div>
                </div>
              </div>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prenom</span>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleFieldChange("firstName")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  autoComplete="given-name"
                  required
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nom</span>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={handleFieldChange("lastName")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  autoComplete="family-name"
                  required
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</span>
                <input
                  type="email"
                  value={form.email}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
                  autoComplete="email"
                />
                <p className="text-xs text-slate-500">
                  L'email est visible mais ne peut pas encore etre modifie depuis cet ecran.
                </p>
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Telephone</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleFieldChange("phone")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  autoComplete="tel"
                  placeholder="+221 77 000 00 00"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Titre</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={handleFieldChange("title")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Data Scientist"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ville</span>
                <input
                  type="text"
                  value={form.city}
                  onChange={handleFieldChange("city")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  autoComplete="address-level2"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pays</span>
                <input
                  type="text"
                  value={form.country}
                  onChange={handleFieldChange("country")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  autoComplete="country-name"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Expertise</span>
                <textarea
                  value={form.expertise}
                  onChange={handleFieldChange("expertise")}
                  className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="IA generative, Data Engineering, Product..."
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">URL LinkedIn</span>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={handleFieldChange("linkedinUrl")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="https://www.linkedin.com/in/votre-profil"
                />
              </label>

              <label className="space-y-1 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description publique</span>
                <textarea
                  value={form.networkBio}
                  onChange={handleFieldChange("networkBio")}
                  className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Quelques lignes sur votre parcours et vos contributions..."
                />
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </form>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0A3458]">Resume du compte</h2>

            <div className="space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Membre: {memberLabel}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Role: {roleLabel}
              </p>
              <p className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Public ID: {publicId}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Statut: {memberStatusLabel}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {form.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {form.phone.trim() || "Telephone non renseigne"}
              </p>
              <p className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {form.title.trim() || "Titre non renseigne"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {form.city.trim() || form.country.trim()
                  ? [form.city.trim(), form.country.trim()].filter(Boolean).join(", ")
                  : "Localisation non renseignee"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <p>
                Membre depuis: <span className="font-semibold text-slate-700">{joinedAtLabel}</span>
              </p>
              <p className="mt-1">
                Email verifie: <span className="font-semibold text-slate-700">{session.emailVerified ? "Oui" : "Non"}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
