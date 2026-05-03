export type ProjectFooterType = "mentors" | "partners" | "registrations";

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
    slug: "saien-talks",
    badge: "Communaute",
    imageUrl: "/saien_vision_hero_illustration.svg",
    title: "SAIEN Talks",
    description: "Cycle de webinaires mensuels avec des experts.",
    fullDescription:
      "SAIEN Talks est une serie de webinaires mensuels qui connecte la diaspora et les talents locaux autour de retours d'experience concrets en IA, Data et Cybersecurite. Chaque session alterne partage technique, cas d'usage et temps d'echange avec les participants.",
    footerType: "registrations",
    footerValue: "1 250 inscrits",
    featuredOnVision: true,
    period: "Cycle mensuel",
    location: "En ligne (Sénégal et diaspora)",
    lead: "Pôle Réseau & Communauté",
    objectives: [
      "Partager des bonnes pratiques terrain avec la communauté.",
      "Donner de la visibilité aux experts sénégalais de la diaspora.",
      "Créer un rendez-vous régulier de montée en compétence.",
    ],
    outcomes: [
      "Calendrier mensuel de sessions thématiques.",
      "Replays et synthèses accessibles à la communauté.",
      "Mise en relation entre intervenants et membres intéressés.",
    ],
  },
  {
    slug: "saien-mentorat",
    badge: "Mentorat",
    imageUrl: "/event-3.png",
    title: "SAIEN Mentorat",
    description:
      "Programme 1:1 entre diaspora et étudiants au Sénégal.",
    fullDescription:
      "SAIEN Mentorat met en relation des profils de la diaspora avec des étudiants et jeunes professionnels au Sénégal via un suivi 1:1. Le programme couvre orientation, revues de projet, conseils de carrière et accompagnement vers l'insertion.",
    footerType: "registrations",
    footerValue: "420 inscrits",
    featuredOnVision: true,
    period: "Cohortes trimestrielles",
    location: "Hybride (en ligne + rencontres locales)",
    lead: "Pôle Formation & Talents",
    objectives: [
      "Structurer un mentorat régulier et mesurable.",
      "Renforcer l'employabilité des mentorés.",
      "Créer des ponts durables entre générations de talents.",
    ],
    outcomes: [
      "Binômes mentor-mentoré suivis sur un parcours défini.",
      "Plan de progression individuel par participant.",
      "Réseau actif de mentors techniques de la diaspora.",
    ],
  },
  {
    slug: "saien-vulgarisation",
    badge: "Media",
    imageUrl: "/event-1.png",
    title: "SAIEN Vulgarisation",
    description: "Contenus YouTube/podcast en français/wolof.",
    fullDescription:
      "SAIEN Vulgarisation produit des contenus accessibles pour expliquer l'IA au plus grand nombre en français et progressivement en wolof. Le format combine videos courtes, podcasts et ressources pédagogiques orientées cas d'usage locaux.",
    footerType: "registrations",
    footerValue: "1 900 inscrits",
    featuredOnVision: true,
    period: "Publication continue",
    location: "Plateformes numériques",
    lead: "Pôle Communication & Pédagogie",
    objectives: [
      "Démystifier l'IA auprès du grand public.",
      "Susciter des vocations chez les jeunes.",
      "Rendre les notions techniques compréhensibles sans jargon.",
    ],
    outcomes: [
      "Capsules vidéo et épisodes podcast thématiques.",
      "Glossaire évolutif des concepts essentiels.",
      "Diffusion de contenus adaptés aux réalités locales.",
    ],
  },
  {
    slug: "saien-annuaire",
    badge: "Réseau",
    imageUrl: "/saien_hero_illustration_monde_v2.svg",
    title: "SAIEN Annuaire",
    description: "Cartographie des talents sénégalais en IA.",
    fullDescription:
      "SAIEN Annuaire est une cartographie structurée des talents sénégalais en IA, Data et Cybersécurité à travers le monde. L'objectif est de faciliter les collaborations, l'identification d'expertises et le partage d'opportunités.",
    footerType: "registrations",
    footerValue: "780 inscrits",
    featuredOnVision: true,
    period: "Mise à jour continue",
    location: "France, Sénégal, diaspora internationale",
    lead: "Pôle Réseau Diaspora",
    objectives: [
      "Rendre visibles les expertises sénégalaises à l'international.",
      "Faciliter le matching entre besoins et compétences.",
      "Structurer une communauté professionnelle active.",
    ],
    outcomes: [
      "Base de profils qualifiés et catégorisés.",
      "Meilleure circulation des opportunités académiques et pro.",
      "Accélération des collaborations entre membres.",
    ],
  },
  {
    slug: "bootcamp-ia-dakar",
    badge: "Formation",
    imageUrl: "/event-3.png",
    title: "Bootcamp IA Dakar",
    description: "Présentiel intensif.",
    fullDescription:
      "Bootcamp IA Dakar est un format intensif en présentiel conçu pour accélérer la montée en compétence sur des bases solides en IA appliquée. Le programme est prioritaire, mais nécessite encore des moyens logistiques et budgétaires pour un déploiement complet.",
    footerType: "registrations",
    footerValue: "260 inscrits",
    featuredOnVision: true,
    period: "En préparation",
    location: "Dakar, Sénégal",
    lead: "Pôle Formation SAIEN",
    objectives: [
      "Former une cohorte pilote sur des cas d'usage réels.",
      "Mettre en place un format intensif orienté pratique.",
      "Créer un vivier local de talents opérationnels.",
    ],
    outcomes: [
      "Programme pédagogique structuré par modules.",
      "Partenariats académiques et techniques en cours.",
      "Plan de lancement conditionné aux ressources mobilisées.",
    ],
  },
  {
    slug: "agritech-ia-lab",
    badge: "Recherche",
    imageUrl: "/event-2.png",
    title: "AgriTech IA Lab",
    description: "Consortium de recherche.",
    fullDescription:
      "AgriTech IA Lab vise à fédérer chercheurs, ingénieurs et acteurs terrain autour de projets de recherche appliquée en agriculture. Le chantier est stratégique mais requiert des partenariats institutionnels et industriels lourds pour passer à l'échelle.",
    footerType: "registrations",
    footerValue: "145 inscrits",
    featuredOnVision: true,
    period: "Préfiguration",
    location: "Sénégal et Afrique de l'Ouest",
    lead: "Consortium Recherche SAIEN",
    objectives: [
      "Co-construire des cas d'usage IA pour l'agriculture locale.",
      "Développer une gouvernance multi-acteurs du programme.",
      "Établir un cadre de financement et de déploiement durable.",
    ],
    outcomes: [
      "Cadrage scientifique et opérationnel du consortium.",
      "Feuille de route partenariale en cours de négociation.",
      "Base de projets pilotes priorisés pour le lancement.",
    ],
  },
];
