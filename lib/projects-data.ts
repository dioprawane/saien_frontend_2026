export type ProjectFooterType = "mentors" | "status" | "partners";

export interface ProjectData {
  slug: string;
  badge: string;
  imageUrl: string;
  title: string;
  description: string;
  fullDescription: string;
  footerType: ProjectFooterType;
  footerValue: string;
  featuredOnVision?: boolean;
  period: string;
  location: string;
  lead: string;
  objectives: string[];
  outcomes: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "bootcamp-ia-dakar-2026",
    badge: "Éducation",
    imageUrl: "/event-3.png",
    title: "Bootcamp IA Dakar 2026",
    description:
      "Un programme intensif de 12 semaines formant 100 jeunes talents sénégalais aux fondamentaux du Machine Learning, encadrés par des experts de la diaspora.",
    fullDescription:
      "Bootcamp IA Dakar 2026 est un parcours immersif pensé pour transformer des profils techniques motivés en praticiens capables de construire, évaluer et déployer des solutions IA sur des cas concrets africains.",
    footerType: "mentors",
    footerValue: "+15 Mentors",
    featuredOnVision: true,
    period: "Janvier 2026 - Avril 2026",
    location: "Dakar, Sénégal",
    lead: "Pôle Formation SAIEN",
    objectives: [
      "Former 100 participants aux bases solides de l'IA appliquée.",
      "Produire des mini-projets orientés santé, finance et éducation.",
      "Favoriser l'insertion professionnelle des apprenants en moins de 12 mois.",
    ],
    outcomes: [
      "12 modules couvrant Python, data engineering, ML et MLOps.",
      "Un réseau de mentors actifs mobilisés depuis la diaspora.",
      "Des projets de fin de parcours évalués par un jury mixte académique-industrie.",
    ],
  },
  {
    slug: "saien-connect-hub",
    badge: "Plateforme",
    imageUrl: "/event-1.png",
    title: "SAIEN Connect Hub",
    description:
      "Lancement de notre plateforme numérique propriétaire facilitant le matching entre porteurs de projets IA locaux et chercheurs de la diaspora internationale.",
    fullDescription:
      "SAIEN Connect Hub centralise les profils experts, les besoins des organisations et les opportunités de collaboration afin d'accélérer le passage de l'idée au prototype dans un cadre structuré.",
    footerType: "status",
    footerValue: "En cours",
    featuredOnVision: true,
    period: "Depuis Octobre 2025",
    location: "Plateforme en ligne (Global)",
    lead: "Pôle Partenariats & Produit",
    objectives: [
      "Réduire le temps de mise en relation expert-projet.",
      "Structurer un pipeline continu d'initiatives IA à impact.",
      "Offrir un espace de collaboration, suivi et documentation projet.",
    ],
    outcomes: [
      "Matching intelligent basé sur compétences et disponibilité.",
      "Tableaux de bord de suivi pour mentors, porteurs et partenaires.",
      "Bibliothèque de ressources méthodologiques partagées.",
    ],
  },
  {
    slug: "agritech-ia-lab",
    badge: "Recherche",
    imageUrl: "/event-2.png",
    title: "AgriTech IA Lab",
    description:
      "Consortium de recherche appliquant la vision par ordinateur pour l'optimisation des rendements agricoles face aux défis climatiques régionaux.",
    fullDescription:
      "AgriTech IA Lab expérimente des modèles de vision et de prévision sur des données terrain pour aider les producteurs à mieux anticiper maladies des cultures, stress hydrique et variations de rendement.",
    footerType: "partners",
    footerValue: "3 Partenaires",
    featuredOnVision: true,
    period: "Mars 2025 - Décembre 2026",
    location: "Sénégal, Côte d'Ivoire",
    lead: "Consortium Recherche SAIEN",
    objectives: [
      "Créer des modèles de détection précoce des maladies des cultures.",
      "Améliorer les rendements via recommandations basées données.",
      "Produire des outils accessibles pour coopératives agricoles.",
    ],
    outcomes: [
      "Jeux de données annotés sur plusieurs régions pilotes.",
      "Prototypes d'aide à la décision pour agronomes et producteurs.",
      "Cadre d'évaluation de l'impact socio-économique des modèles.",
    ],
  },
  {
    slug: "observatoire-ia-afrique",
    badge: "Gouvernance",
    imageUrl: "/event-1.png",
    title: "Observatoire IA Afrique",
    description:
      "Plateforme de veille stratégique sur les politiques publiques, l'adoption sectorielle et les indicateurs de maturité IA dans les écosystèmes africains.",
    fullDescription:
      "L'Observatoire IA Afrique fournit des analyses régulières, des tableaux de bord comparatifs et des notes de recommandation pour orienter la prise de décision des acteurs publics et privés.",
    footerType: "partners",
    footerValue: "5 Institutions",
    period: "Depuis Juin 2025",
    location: "Réseau panafricain",
    lead: "Cellule IA Responsable",
    objectives: [
      "Mesurer la maturité IA par secteur et par pays.",
      "Documenter les bonnes pratiques réglementaires.",
      "Diffuser des recommandations fondées sur les données.",
    ],
    outcomes: [
      "Rapports trimestriels de veille et d'analyse.",
      "Tableaux de bord publics d'indicateurs clés.",
      "Sessions de restitution auprès des décideurs.",
    ],
  },
  {
    slug: "bourses-recherche-ia",
    badge: "Talent",
    imageUrl: "/event-3.png",
    title: "Bourses Recherche IA",
    description:
      "Programme de bourses cofinancées pour soutenir des travaux de recherche appliquée en IA sur des problématiques locales à fort impact.",
    fullDescription:
      "Le programme Bourses Recherche IA soutient des projets universitaires et industriels qui répondent à des défis locaux précis, avec un accompagnement méthodologique et un suivi d'impact.",
    footerType: "mentors",
    footerValue: "+20 Encadrants",
    period: "Cohorte annuelle",
    location: "Afrique francophone",
    lead: "Comité Scientifique SAIEN",
    objectives: [
      "Financer des travaux appliqués orientés impact réel.",
      "Renforcer les liens universités-entreprises.",
      "Valoriser les résultats en prototypes exploitables.",
    ],
    outcomes: [
      "Bourses attribuées sur appel à projets transparent.",
      "Encadrement par chercheurs et praticiens seniors.",
      "Démonstrateurs présentés lors du sommet annuel SAIEN.",
    ],
  },
];
