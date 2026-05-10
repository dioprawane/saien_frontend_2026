export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArticleVideo {
  youtubeId: string;
  title: string;
  caption?: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  images?: ArticleImage[];
  videos?: ArticleVideo[];
}

export type ArticleStatus = "draft" | "published" | "withdrawn";

export interface Article {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  status?: ArticleStatus;
  tags: string[];
  sections: ArticleSection[];
}

export const ARTICLE_CATEGORIES = [
  "Toutes",
  "Intelligence Artificielle",
  "Data Science",
  "Réseau & Communauté",
  "Innovation",
  "Tutoriel",
] as const;

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "ia-generative-developpement-africain",
    category: "Intelligence Artificielle",
    categoryColor: "bg-blue-50 text-blue-600",
    title: "L'IA générative au service du développement africain",
    excerpt:
      "Comment les modèles de langage à grande échelle transforment les secteurs de la santé, de l'agriculture et de l'éducation sur le continent.",
    author: "Amadou Diallo",
    date: "15 oct. 2024",
    readTime: "8 min",
    coverImage: "/event-1.png",
    featured: true,
    tags: ["IA générative", "Afrique", "Innovation"],
    sections: [
      {
        heading: "Pourquoi l'IA générative change la donne",
        paragraphs: [
          "L'IA générative est devenue un levier stratégique pour accélérer la création de solutions locales. Dans plusieurs pays d'Afrique francophone, des équipes mixtes combinent expertise métier et modèles de langage pour construire des services utiles aux citoyens.",
          "Cette dynamique permet de produire des assistants spécialisés, des outils d'aide à la décision et des interfaces multilingues plus accessibles. L'enjeu majeur reste la qualité des données locales et la gouvernance des usages.",
        ],
        images: [
          {
            src: "/event-1.png",
            alt: "Atelier collaboratif autour de l'IA générative",
            caption: "Atelier SAIEN sur les cas d'usage prioritaires.",
          },
          {
            src: "/event-2.png",
            alt: "Conférence sur la transformation numérique",
            caption: "Présentation d'initiatives régionales portées par la diaspora.",
          },
        ],
      },
      {
        heading: "Des cas d'usage concrets sur le terrain",
        paragraphs: [
          "Dans la santé, des assistants de tri clinique aident à structurer la prise en charge. Dans l'agriculture, des agents conversationnels guident les producteurs selon les conditions locales. Dans l'éducation, des tuteurs intelligents renforcent l'accompagnement personnalisé.",
          "Pour assurer un impact durable, les solutions doivent être co-construites avec les institutions, les universités et les communautés. Le transfert de compétences est aussi important que la technologie elle-même.",
        ],
        videos: [
          {
            youtubeId: "aircAruvnKk",
            title: "Comprendre les fondements de l'IA moderne",
            caption: "Vidéo de contexte pour vulgariser les concepts clés.",
          },
          {
            youtubeId: "JMUxmLyrhSk",
            title: "Applications responsables de l'IA",
            caption: "Retour d'expérience sur les usages à fort impact social.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "sommet-africain-ia-2024",
    category: "Réseau & Communauté",
    categoryColor: "bg-brand-green-soft text-brand-green-hover",
    title: "Retour sur le Sommet Africain de l'IA 2024",
    excerpt:
      "Plus de 500 participants réunis à Dakar pour trois jours d'échanges intenses. Découvrez les temps forts et les engagements pris.",
    author: "Fatou Sow",
    date: "10 oct. 2024",
    readTime: "5 min",
    coverImage: "/event-2.png",
    tags: ["Sommet", "Communauté", "Partenariats"],
    sections: [
      {
        heading: "Temps forts du sommet",
        paragraphs: [
          "Le sommet a réuni chercheurs, décideurs publics, startups et grands groupes autour d'une ambition commune: structurer une trajectoire africaine de l'IA à la fois performante et responsable.",
          "Les discussions ont mis en avant l'importance des infrastructures de données, de la formation continue et de cadres de gouvernance adaptés aux réalités locales.",
        ],
        images: [
          {
            src: "/event-2.png",
            alt: "Participants au sommet africain de l'IA",
            caption: "Plus de 500 participants ont pris part aux sessions plénières.",
          },
          {
            src: "/event-3.png",
            alt: "Session de networking pendant le sommet",
            caption: "Rencontres entre experts du réseau et partenaires institutionnels.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "benchmark-llm-langues-africaines",
    category: "Data Science",
    categoryColor: "bg-purple-50 text-purple-600",
    title: "Benchmark des LLMs open-source pour les langues africaines",
    excerpt:
      "Une étude comparative approfondie sur les performances des principaux modèles open-source appliqués au wolof, swahili et amharique.",
    author: "Jean-Marc Kone",
    date: "02 oct. 2024",
    readTime: "12 min",
    coverImage: "/event-3.png",
    tags: ["LLM", "Open Source", "NLP"],
    sections: [
      {
        heading: "Méthodologie et résultats",
        paragraphs: [
          "L'étude compare plusieurs modèles open-source sur des jeux de tests multilingues, avec des métriques de précision, robustesse et coût d'inférence.",
          "Les résultats montrent des écarts significatifs selon la qualité des corpus et la stratégie de fine-tuning. Les modèles compacts bien adaptés peuvent surpasser des architectures plus lourdes sur des tâches ciblées.",
        ],
        images: [
          {
            src: "/event-3.png",
            alt: "Visualisation comparative des performances de modèles",
            caption: "Comparaison des scores sur des tâches de compréhension et génération.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "programme-mentorat-2025",
    category: "Innovation",
    categoryColor: "bg-orange-50 text-orange-600",
    title: "SAIEN lance son programme de mentorat 2025",
    excerpt:
      "Vingt experts seniors accompagneront les talents de la diaspora sur des projets concrets en machine learning et MLOps.",
    author: "Awa Ndiaye",
    date: "25 sept. 2024",
    readTime: "4 min",
    coverImage: "/event-1.png",
    tags: ["Mentorat", "Talents", "MLOps"],
    sections: [
      {
        heading: "Objectifs du programme",
        paragraphs: [
          "Le programme vise à accélérer la montée en compétences de jeunes profils techniques et produits grâce à un accompagnement structuré sur 6 mois.",
          "Les participants bénéficieront d'ateliers pratiques, de revues de projet et d'un accès privilégié aux opportunités du réseau.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "regulation-ia-afrique-2024",
    category: "Intelligence Artificielle",
    categoryColor: "bg-blue-50 text-blue-600",
    title: "Régulation de l'IA en Afrique : état des lieux 2024",
    excerpt:
      "Tour d'horizon des initiatives législatives en cours au Sénégal, Rwanda, Kenya et Côte d'Ivoire pour encadrer l'essor de l'IA.",
    author: "Prof. Marie Desroches",
    date: "18 sept. 2024",
    readTime: "10 min",
    coverImage: "/event-2.png",
    tags: ["Régulation", "Éthique", "Politiques publiques"],
    sections: [
      {
        heading: "Tendances réglementaires",
        paragraphs: [
          "Les autorités explorent des approches progressives: obligations de transparence, évaluations d'impact et exigences de sécurité pour les systèmes à haut risque.",
          "La coopération régionale est essentielle pour éviter des cadres fragmentés et renforcer la souveraineté numérique des États.",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "fine-tuning-llm-francais-guide",
    category: "Tutoriel",
    categoryColor: "bg-brand-green-soft text-brand-green-hover",
    title: "Fine-tuner un LLM avec des données en français : guide pratique",
    excerpt:
      "De la préparation du dataset au déploiement sur Hugging Face, un guide pas-à-pas pour adapter un modèle à votre domaine.",
    author: "Thomas Laurent",
    date: "10 sept. 2024",
    readTime: "15 min",
    coverImage: "/event-3.png",
    tags: ["Tutoriel", "Fine-tuning", "Déploiement"],
    sections: [
      {
        heading: "Étapes clés",
        paragraphs: [
          "Le guide détaille la collecte de données, le nettoyage, la stratégie d'évaluation et la mise en production avec monitoring de la dérive.",
          "Une attention particulière est portée aux coûts, à la latence et à la gestion des versions des modèles en environnement réel.",
        ],
        videos: [
          {
            youtubeId: "kCc8FmEb1nY",
            title: "Rappels sur les architectures de modèles",
            caption: "Ressource complémentaire pour contextualiser le fine-tuning.",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    slug: "temoignage-carriere-saien",
    category: "Réseau & Communauté",
    categoryColor: "bg-brand-green-soft text-brand-green-hover",
    title: "Témoignage : comment SAIEN a changé ma carrière",
    excerpt:
      "Sarah Benali revient sur son parcours au sein du réseau, de membre junior à directrice innovation dans une scale-up genevoise.",
    author: "Sarah Benali",
    date: "01 sept. 2024",
    readTime: "6 min",
    coverImage: "/event-1.png",
    tags: ["Parcours", "Réseau", "Carrière"],
    sections: [
      {
        heading: "Un parcours accéléré par la communauté",
        paragraphs: [
          "Le réseau m'a permis de trouver des mentors, de présenter mes projets dans des cercles internationaux et de gagner en confiance sur des sujets de leadership.",
          "L'entraide entre membres est un vrai facteur différenciant: conseils techniques, retours sur CV et mise en relation ciblée ont joué un rôle décisif.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
