"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Loader2, ShieldCheck } from "lucide-react";
import { useUserSession } from "@/components/auth/UserSessionContext";
import { register } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";
import { sendContactMessage } from "@/lib/api/contact";
import { type MembershipSource, submitMembershipApplication } from "@/lib/api/memberships";

const FLOW_STEPS = [
  {
    id: 1,
    title: "Choix du niveau",
    desc: "Sélectionnez le type de membre qui correspond à votre engagement.",
  },
  {
    id: 2,
    title: "Informations",
    desc: "Renseignez vos coordonnées et votre parcours professionnel.",
  },
  {
    id: 3,
    title: "Paiement et validation",
    desc: "Envoyez la cotisation puis soumettez votre demande pour étude.",
  },
] as const;

type JoinMemberType = "active" | "benefactor" | "honor";
type AccountMode = "new" | "existing";
type PaymentMethod = "helloasso" | "bank_transfer" | "mobile_money";
type FlowStep = 1 | 2 | 3;

const CONTACT_REVIEW_EMAIL = "bureau@saien.org";

// const HELLOASSO_PAYMENT_URL =
//   "https://www.helloasso.com/associations/senegalese-artificial-intelligence-excellence-network-saien/paiements/carte-de-membre";
const HELLOASSO_PAYMENT_URL = "https://www.helloasso.com/beta/associations/senegalese-artificial-intelligence-excellence-network-saien/adhesions/carte-de-membre";

const MEMBER_OPTIONS: Array<{
  type: JoinMemberType;
  title: string;
  subtitle: string;
  cta: string;
  annualFeeEur: number;
  notice: string;
  benefits: string[];
}> = [
  {
    type: "active",
    title: "Membre Actif",
    subtitle:
      "Pour les Sénégalais (ou amis du Sénégal) en IA, Data ou Cybersécurité qui veulent contribuer activement.",
    cta: "Devenir membre actif",
    annualFeeEur: 10,
    notice: "Carte de membre : 10 € (diaspora) / 1 000 CFA (Sénégal)",
    benefits: [
      "Participer aux activités et programmes",
      "Voter à l'Assemblée Générale",
      "Accéder à l'annuaire et aux opportunités",
      "Contribuer aux missions de SAIEN",
    ],
  },
  {
    type: "benefactor",
    title: "Membre Bienfaiteur",
    subtitle:
      "Pour les particuliers ou structures souhaitant soutenir financièrement SAIEN au-delà de la cotisation standard.",
    cta: "Devenir bienfaiteur",
    annualFeeEur: 99,
    notice: "Carte de membre : Libre",
    benefits: [
      "Tous les avantages des membres actifs",
      "Reconnaissance publique en tant que soutien",
      "Invitations privilégiées aux événements",
      "Priorité sur certains programmes partenaires",
    ],
  },
  {
    type: "honor",
    title: "Membre d'Honneur",
    subtitle:
      "Personnalités reconnues pour leur contribution exceptionnelle à l'IA et à notre communauté.",
    cta: "Recommander un membre d'honneur",
    annualFeeEur: 0,
    notice: "Sur invitation uniquement - participation symbolique : libre",
    benefits: [
      "Désigné par décision de l'Assemblée Générale",
      "Voix consultative sur les sujets stratégiques",
      "Mise en avant des contributions majeures",
      "Parcours traité en priorité par le comité",
    ],
  },
];

const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  label: string;
  details: string;
  helper: string;
  url?: string;
}> = [
  {
    id: "helloasso",
    label: "HelloAsso (carte bancaire)",
    details: "Paiement sécurisé en ligne",
    helper: "Réglez la carte de membre directement sur HelloAsso, puis revenez confirmer.",
    url: HELLOASSO_PAYMENT_URL,
  },
  {
    id: "bank_transfer",
    label: "Virement bancaire",
    details: "IBAN : FR76 1027 8089 5000 0212 2680 163",
    helper: "Mention: Adhésion + votre nom complet.",
  },
  {
    id: "mobile_money",
    label: "Wave",
    details: "+221 76 0 15 70 73",
    helper: "Wave au nom de SAIEN.",
  },
];

const splitFullName = (fullName: string) => {
  const chunks = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (chunks.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (chunks.length === 1) {
    return { firstName: chunks[0], lastName: "" };
  }

  return {
    firstName: chunks[0],
    lastName: chunks.slice(1).join(" "),
  };
};

const looksLikeEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim());

export default function AdhesionForm() {
  const { isHydrated, isAuthenticated, session } = useUserSession();

  const [step, setStep] = useState<FlowStep>(1);
  const [memberType, setMemberType] = useState<JoinMemberType>("active");
  const [accountMode, setAccountMode] = useState<AccountMode>("new");
  const [source, setSource] = useState<MembershipSource>("website");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [expertise, setExpertise] = useState("");
  const [professionalBackground, setProfessionalBackground] = useState("");
  const [imageConsent, setImageConsent] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("helloasso");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [hasSentPayment, setHasSentPayment] = useState(false);
  const [acceptReview, setAcceptReview] = useState(false);
  const [acceptStatuts, setAcceptStatuts] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [submittedRegistrationId, setSubmittedRegistrationId] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated || !session) return;

    const names = splitFullName(session.fullName);

    setAccountMode("existing");
    setFirstName((previous) => previous || names.firstName);
    setLastName((previous) => previous || names.lastName);
    setEmail((previous) => previous || session.email);
  }, [isHydrated, isAuthenticated, session]);

  const selectedOption = useMemo(
    () => MEMBER_OPTIONS.find((option) => option.type === memberType) ?? MEMBER_OPTIONS[0],
    [memberType],
  );

  const progressPercent = Math.round((step / FLOW_STEPS.length) * 100);
  const isLastStep = step === FLOW_STEPS.length;

  const fullName = useMemo(() => {
    const composed = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (composed) return composed;
    return session?.fullName?.trim() ?? "";
  }, [firstName, lastName, session?.fullName]);

  const normalizedEmail = email.trim().toLowerCase();

  const getStepError = (targetStep: FlowStep): string | null => {
    if (targetStep === 1) return null;

    if (targetStep === 2) {
      if (!firstName.trim() || !lastName.trim()) {
        return "Veuillez renseigner votre prénom et nom.";
      }

      if (!looksLikeEmail(email)) {
        return "Veuillez renseigner une adresse email valide.";
      }

      if (accountMode === "new") {
        if (password.length < 8) {
          return "Le mot de passe doit contenir au moins 8 caractères.";
        }

        if (password !== confirmPassword) {
          return "Les mots de passe ne correspondent pas.";
        }
      }

      if (!phone.trim() || !city.trim() || !country.trim()) {
        return "Merci de compléter vos coordonnées (téléphone, ville et pays).";
      }

      if (!jobTitle.trim()) {
        return "Merci de renseigner votre fonction actuelle.";
      }

      if (!expertise.trim()) {
        return "Merci de préciser votre domaine d'expertise.";
      }

      if (!professionalBackground.trim()) {
        return "Merci de décrire votre parcours professionnel.";
      }

      return null;
    }

    if (paymentMethod !== "helloasso") {
      if (!paymentReference.trim()) {
        return "Renseignez la référence de paiement (transaction, reçu ou virement).";
      }

      if (!paymentDate) {
        return "Veuillez indiquer la date d'envoi du paiement.";
      }
    }

    if (!hasSentPayment) {
      return "Confirmez avoir effectué le paiement avant de soumettre.";
    }

    if (!acceptReview) {
      return "Vous devez accepter l'étude et la validation de votre dossier par l'équipe SAIEN.";
    }

    if (!acceptStatuts) {
      return "Veuillez confirmer avoir pris connaissance des statuts et du règlement intérieur de l'association.";
    }

    return null;
  };

  const buildReviewMessage = () => {
    const paymentLabel = PAYMENT_METHODS.find((method) => method.id === paymentMethod)?.label ?? paymentMethod;

    const lines = [
      "Demande d'adhésion via parcours Rejoindre",
      `Type souhaité: ${selectedOption.title}`,
      `Cotisation annoncée: ${selectedOption.annualFeeEur} €`,
      `Source: ${source}`,
      `Mode de compte: ${accountMode === "new" ? "Création automatique" : "Compte existant"}`,
      `Nom complet: ${fullName}`,
      `Email: ${normalizedEmail}`,
      `Téléphone: ${phone.trim()}`,
      `Fonction: ${jobTitle.trim()}`,
      `Ville: ${city.trim()}`,
      `Pays: ${country.trim()}`,
      `Expertise: ${expertise.trim()}`,
      `Consentement image réseaux: ${imageConsent ? "Oui" : "Non"}`,
      "Parcours professionnel:",
      professionalBackground.trim(),
      `Paiement: ${paymentLabel}`,
      `Référence: ${paymentReference.trim()}`,
      `Date de paiement: ${paymentDate}`,
    ];

    return lines.join("\n").slice(0, 2900);
  };

  const goNext = () => {
    const stepError = getStepError(step);
    if (stepError) {
      setErrorMessage(stepError);
      return;
    }

    setErrorMessage(null);
    setStep((previous) => (previous < 3 ? ((previous + 1) as FlowStep) : previous));
  };

  const goBack = () => {
    setErrorMessage(null);
    setStep((previous) => (previous > 1 ? ((previous - 1) as FlowStep) : previous));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLastStep) {
      goNext();
      return;
    }

    const stepError = getStepError(3);
    if (stepError) {
      setErrorMessage(stepError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setWarningMessage(null);

    try {
      if (accountMode === "new") {
        await register({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: normalizedEmail,
          password,
        });
        setAccountCreated(true);
      } else {
        setAccountCreated(false);
      }

      const registration = await submitMembershipApplication({
        fullName,
        email: normalizedEmail,
        type: memberType,
        source,
        title: jobTitle.trim(),
        phone: phone.trim(),
        city: city.trim(),
        country: country.trim(),
        expertise: expertise.trim(),
        professionalBackground: professionalBackground.trim(),
        accountMode,
        imageConsent,
        paymentMethod,
        paymentReference: paymentReference.trim(),
        paymentDate,
      });

      try {
        await sendContactMessage({
          fullName,
          email: normalizedEmail,
          subject: "Adhésion",
          message: buildReviewMessage(),
        });
      } catch {
        setWarningMessage(
          "Votre candidature est enregistrée, mais le détail n'a pas pu être transmis automatiquement. Merci d'envoyer vos informations à bureau@saien.org.",
        );
      }

      setSubmittedRegistrationId(registration.id);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Impossible d'envoyer la candidature pour le moment."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white pt-5 pb-12 lg:pt-6 lg:pb-14" aria-labelledby="adhesion-form-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-8 items-start">
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 id="adhesion-form-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              Rejoindre la communauté
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Trois façons de faire partie de SAIEN selon votre profil et votre engagement (Article 5 des statuts).
            </p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Progression</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-brand-green transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <ol className="mt-6 space-y-4">
              {FLOW_STEPS.map((item) => {
                const isDone = step > item.id;
                const isCurrent = step === item.id;

                return (
                  <li key={item.id} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        isDone || isCurrent
                          ? "bg-brand-green text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {item.id}
                    </span>
                    <div>
                      <p className={`text-sm font-semibold ${isCurrent ? "text-slate-900" : "text-slate-700"}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 rounded-xl border border-brand-green-soft-strong bg-brand-green-soft/50 p-4">
              <p className="text-xs uppercase tracking-wide text-brand-green-hover font-semibold">
                Type sélectionné
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">{selectedOption.title}</p>
              <p className="text-xs text-slate-600 mt-1">{selectedOption.notice}</p>
            </div>
          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 lg:p-8">
            {submittedRegistrationId ? (
              <div className="space-y-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Demande envoyée avec succès</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Votre dossier <span className="font-semibold text-slate-800">{submittedRegistrationId}</span> est bien enregistré.
                    Dès réception du paiement, l&apos;équipe étudiera et validera votre adhésion.
                  </p>
                </div>

                {accountCreated && (
                  <div className="rounded-xl border border-brand-green-soft-strong bg-brand-green-soft/50 p-4 text-sm text-slate-700">
                    Votre compte de suivi a été créé automatiquement. Vérifiez votre email pour activer le compte,
                    puis connectez-vous pour suivre l&apos;avancement de votre dossier.
                  </div>
                )}

                {warningMessage && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    {warningMessage}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/connexion"
                    className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
                  >
                    Se connecter
                  </Link>
                  <a
                    href={`mailto:${CONTACT_REVIEW_EMAIL}`}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Contacter l&apos;équipe
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Choisissez votre type de membre</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Selon votre profil et votre engagement, sélectionnez le niveau le plus adapté.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {MEMBER_OPTIONS.map((option) => {
                        const selected = memberType === option.type;

                        return (
                          <button
                            key={option.type}
                            type="button"
                            onClick={() => setMemberType(option.type)}
                            className={`rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? "border-brand-green bg-brand-green-soft/40 shadow-sm"
                                : "border-slate-200 bg-white hover:border-brand-green-soft-strong"
                            }`}
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-base font-bold text-slate-900">{option.title}</p>
                                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{option.subtitle}</p>
                              </div>
                              <div className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
                                {option.annualFeeEur} €
                              </div>
                            </div>

                            <ul className="mt-3 space-y-1.5">
                              {option.benefits.map((benefit) => (
                                <li key={benefit} className="text-sm text-slate-700 leading-relaxed">
                                  • {benefit}
                                </li>
                              ))}
                            </ul>

                            <p className="mt-3 text-xs font-semibold text-brand-green-hover">{option.notice}</p>
                            <p className="mt-1 text-xs text-slate-500">{option.cta}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Informations personnelles</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Si vous n&apos;avez pas de compte, il sera créé automatiquement pour le suivi de votre demande.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAccountMode("new")}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                          accountMode === "new"
                            ? "border-brand-green bg-brand-green-soft text-brand-green-hover"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        Je n&apos;ai pas de compte
                      </button>
                      <button
                        type="button"
                        onClick={() => setAccountMode("existing")}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                          accountMode === "existing"
                            ? "border-brand-green bg-brand-green-soft text-brand-green-hover"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        J&apos;ai déjà un compte
                      </button>
                    </div>

                    {accountMode === "existing" && !isAuthenticated && (
                      <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        Déjà inscrit ? Vous pouvez aussi vous connecter pour préremplir automatiquement vos informations. {" "}
                        <Link href="/connexion?next=/rejoindre" className="font-semibold underline">
                          Se connecter
                        </Link>
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="text-sm font-medium text-slate-700">
                        Prénom
                        <input
                          type="text"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          required
                        />
                      </label>

                      <label className="text-sm font-medium text-slate-700">
                        Nom
                        <input
                          type="text"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          required
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="text-sm font-medium text-slate-700">
                        Email
                        <input
                          type="email"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </label>

                      <label className="text-sm font-medium text-slate-700">
                        Téléphone
                        <input
                          type="tel"
                          placeholder="+221 ..."
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          required
                        />
                      </label>
                    </div>

                    <label className="text-sm font-medium text-slate-700 block">
                      Fonction actuelle
                      <input
                        type="text"
                        placeholder="Ex: Data Scientist, RSSI, Ingénieur IA..."
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                        value={jobTitle}
                        onChange={(event) => setJobTitle(event.target.value)}
                        required
                      />
                    </label>

                    {accountMode === "new" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="text-sm font-medium text-slate-700">
                          Mot de passe
                          <input
                            type="password"
                            minLength={8}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                          />
                        </label>

                        <label className="text-sm font-medium text-slate-700">
                          Confirmer le mot de passe
                          <input
                            type="password"
                            minLength={8}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                          />
                        </label>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label className="text-sm font-medium text-slate-700">
                        Ville
                        <input
                          type="text"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          required
                        />
                      </label>

                      <label className="text-sm font-medium text-slate-700">
                        Pays
                        <input
                          type="text"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                          required
                        />
                      </label>

                      <label className="text-sm font-medium text-slate-700">
                        Domaine principal
                        <input
                          type="text"
                          placeholder="IA, Data, Cybersécurité..."
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                          value={expertise}
                          onChange={(event) => setExpertise(event.target.value)}
                          required
                        />
                      </label>
                    </div>

                    <label className="text-sm font-medium text-slate-700 block">
                      Parcours professionnel
                      <textarea
                        rows={5}
                        placeholder="Présentez brièvement vos expériences, missions, formations ou projets pertinents."
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                        value={professionalBackground}
                        onChange={(event) => setProfessionalBackground(event.target.value)}
                        required
                      />
                    </label>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">
                        Visibilité sur nos réseaux (RGPD)
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Acceptez-vous que votre image soit utilisée sur nos réseaux sociaux et supports de communication ?
                      </p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setImageConsent(true)}
                          className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                            imageConsent
                              ? "border-brand-green bg-brand-green-soft text-brand-green-hover"
                              : "border-slate-200 text-slate-600"
                          }`}
                        >
                          Oui, j&apos;accepte
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageConsent(false)}
                          className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                            !imageConsent
                              ? "border-brand-green bg-brand-green-soft text-brand-green-hover"
                              : "border-slate-200 text-slate-600"
                          }`}
                        >
                          Non, je refuse
                        </button>
                      </div>
                    </div>

                    <label className="text-sm font-medium text-slate-700 block">
                      Comment nous avez-vous connus ?
                      <select
                        value={source}
                        onChange={(event) => setSource(event.target.value as MembershipSource)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green bg-white"
                      >
                        <option value="website">Site web</option>
                        <option value="event">Événement</option>
                        <option value="referral">Recommandation / Parrainage</option>
                      </select>
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Paiement et finalisation</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Une fois le paiement reçu, l&apos;équipe SAIEN étudiera et validera votre adhésion.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm text-slate-700">
                        Montant à envoyer pour <span className="font-semibold">{selectedOption.title}</span> :{" "}
                        <span className="font-bold text-slate-900">
                          {paymentMethod === "mobile_money" && memberType === "active"
                            ? "1 000 F CFA"
                            : `${selectedOption.annualFeeEur} €`}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={`block rounded-xl border p-3 cursor-pointer transition-colors ${
                            paymentMethod === method.id
                              ? "border-brand-green bg-brand-green-soft/40"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === method.id}
                              onChange={() => setPaymentMethod(method.id)}
                              className="mt-1"
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{method.label}</p>
                              <p className="text-xs text-slate-600 mt-0.5">{method.details}</p>
                              <p className="text-xs text-slate-500 mt-1">{method.helper}</p>
                              {method.url && paymentMethod === method.id && (
                                <a
                                  href={method.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-green-hover"
                                >
                                  Payer la carte de membre sur HelloAsso
                                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                </a>
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {paymentMethod !== "helloasso" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="text-sm font-medium text-slate-700">
                          Référence de paiement
                          <input
                            type="text"
                            placeholder="Ex: VIR-2026-... / Wave-..."
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            value={paymentReference}
                            onChange={(event) => setPaymentReference(event.target.value)}
                          />
                        </label>

                        <label className="text-sm font-medium text-slate-700">
                          Date d'envoi du paiement
                          <input
                            type="date"
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            value={paymentDate}
                            onChange={(event) => setPaymentDate(event.target.value)}
                          />
                        </label>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="flex items-start gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={hasSentPayment}
                          onChange={(event) => setHasSentPayment(event.target.checked)}
                          className="mt-0.5"
                        />
                        <span>Je confirme avoir effectué le paiement via la méthode choisie.</span>
                      </label>

                      <label className="flex items-start gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={acceptReview}
                          onChange={(event) => setAcceptReview(event.target.checked)}
                          className="mt-0.5"
                        />
                        <span>
                          J&apos;accepte que l&apos;équipe SAIEN étudie ce dossier et valide l&apos;adhésion après vérification du paiement.
                        </span>
                      </label>

                      <label className="flex items-start gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={acceptStatuts}
                          onChange={(event) => setAcceptStatuts(event.target.checked)}
                          className="mt-0.5"
                        />
                        <span>
                          J&apos;ai pris connaissance et j&apos;accepte les{" "}
                          <a
                            href="/documents/statuts_saien.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline hover:text-slate-900"
                          >
                            statuts
                          </a>{" "}
                          et le{" "}
                          <a
                            href="/documents/reglement_interieur_saien.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline hover:text-slate-900"
                          >
                            règlement intérieur
                          </a>{" "}
                          de l&apos;association SAIEN.
                        </span>
                      </label>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
                      Besoin d&apos;assistance ? Écrivez à {" "}
                      <a href={`mailto:${CONTACT_REVIEW_EMAIL}`} className="font-semibold underline">
                        {CONTACT_REVIEW_EMAIL}
                      </a>
                      .
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errorMessage}
                  </p>
                )}

                {warningMessage && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    {warningMessage}
                  </p>
                )}

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 1 || isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Précédent
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Envoi en cours...
                      </>
                    ) : isLastStep ? (
                      <>
                        Soumettre ma demande
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        Continuer
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Vos données sont traitées conformément à notre {" "}
                  <Link href="/confidentialite" className="underline hover:text-slate-700">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-brand-green-soft-strong bg-brand-green-soft/60 p-4 text-xs text-brand-green-hover flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            Le parcours est en 3 étapes avec progression: choix du type, informations, puis paiement et validation du dossier par l&apos;équipe SAIEN.
          </p>
        </div>
      </div>
    </section>
  );
}


