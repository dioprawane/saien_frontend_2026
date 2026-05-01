export type MissionIconName =
  | "GraduationCap"
  | "Network"
  | "Handshake"
  | "ShieldCheck";

export interface MissionData {
  slug: string;
  title: string;
  iconName: MissionIconName;
  shortDescription: string;
  intro: string;
  strategicAxes: string[];
  flagshipPrograms: string[];
  impactTargets: string[];
}

export const MISSIONS: MissionData[] = [
  {
    slug: "formation",
    title: "Formation",
    iconName: "GraduationCap",
    shortDescription:
      "Développer les compétences locales à travers des programmes d'excellence en data science, machine learning et ingénierie IA.",
    intro:
      "La mission Formation vise à renforcer durablement les capacités techniques locales en intelligence artificielle, du niveau introductif au niveau expert.",
    strategicAxes: [
      "Créer des parcours pédagogiques progressifs et certifiants.",
      "Former des formateurs pour diffuser les compétences dans plusieurs pays.",
      "Aligner les contenus sur les besoins réels des entreprises et des administrations.",
    ],
    flagshipPrograms: [
      "Bootcamp IA Dakar 2026 (12 semaines intensives).",
      "Académie MLOps pour ingénieurs en activité.",
      "Cycle d'ateliers IA pour universités partenaires.",
    ],
    impactTargets: [
      "100 talents formés par cohorte annuelle.",
      "70% de taux d'insertion sur des rôles data/IA en moins de 12 mois.",
      "Un réseau actif de mentors techniques de la diaspora.",
    ],
  },
  {
    slug: "reseau-diaspora",
    title: "Réseau Diaspora",
    iconName: "Network",
    shortDescription:
      "Connecter les talents africains de la diaspora mondiale pour faciliter le transfert de connaissances et le mentorat.",
    intro:
      "La mission Réseau Diaspora construit un pont opérationnel entre experts internationaux et talents locaux pour accélérer l'exécution des projets IA.",
    strategicAxes: [
      "Structurer un annuaire qualifié d'experts et de mentors.",
      "Faciliter le mentorat croisé entre juniors et seniors.",
      "Activer des communautés locales dans les villes clés.",
    ],
    flagshipPrograms: [
      "Programme de mentorat trimestriel orienté projet.",
      "Rencontres mensuelles diaspora x continent.",
      "Canal d'entraide technique pour membres SAIEN.",
    ],
    impactTargets: [
      "200 binomes de mentorat actifs par an.",
      "Montée en compétence accélérée sur des cas d'usage concrets.",
      "Création d'opportunités professionnelles transfrontalières.",
    ],
  },
  {
    slug: "partenariats",
    title: "Partenariats",
    iconName: "Handshake",
    shortDescription:
      "Créer des synergies entre universités, entreprises tech et institutions publiques pour financer et soutenir l'innovation.",
    intro:
      "La mission Partenariats aligne les acteurs publics, privés et académiques pour transformer des idées IA en initiatives viables et mesurables.",
    strategicAxes: [
      "Monter des partenariats académiques et industriels structurants.",
      "Co-financer des projets pilotes à impact local.",
      "Outiller les institutions avec des feuilles de route IA réalistes.",
    ],
    flagshipPrograms: [
      "SAIEN Connect Hub pour le matching projet-expertise.",
      "Consortium AgriTech IA Lab.",
      "Programme Bourses de recherche appliquée IA.",
    ],
    impactTargets: [
      "10 projets pilotes lancés avec partenaires chaque année.",
      "Accélération de l'adoption IA dans secteurs prioritaires.",
      "Mobilisation de financement mixte public-prive.",
    ],
  },
  {
    slug: "ia-responsable",
    title: "IA Responsable",
    iconName: "ShieldCheck",
    shortDescription:
      "Promouvoir une intelligence artificielle éthique, non biaisée et adaptée aux contextes culturels et économiques locaux.",
    intro:
      "La mission IA Responsable garantit que les solutions déployées respectent les principes d'équité, de transparence, de sécurité et d'utilité sociale.",
    strategicAxes: [
      "Définir des standards de gouvernance des données et des modèles.",
      "Évaluer les biais et risques avant passage en production.",
      "Accompagner les organisations sur les bonnes pratiques IA.",
    ],
    flagshipPrograms: [
      "Cadre SAIEN d'évaluation éthique des projets IA.",
      "Ateliers conformité et protection des données.",
      "Cellule de revue d'impact social des use cases.",
    ],
    impactTargets: [
      "100% des projets accompagnés avec checklist éthique.",
      "Réduction des risques de biais et de dérives d'usage.",
      "Renforcement de la confiance des institutions et citoyens.",
    ],
  },
];
