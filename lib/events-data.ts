export interface Intervenant {
  name: string;
  role: string;
  initials: string;
  type?: "Intervenant" | "Animateur" | "Coordinateur";
  linkedin?: string;
}

export interface EventTag {
  label: string;
  iconName?: "Video" | "MonitorPlay";
  color: string;
  bgColor: string;
}

export interface AgendaEvent {
  id: number;
  day: string;
  month: string;
  year: string;
  endDay?: string;
  endMonth?: string;
  endYear?: string;
  status?: "draft" | "published" | "completed" | "cancelled";
  tags: EventTag[];
  thematique: string;
  format: string;
  title: string;
  description: string;
  fullDescription?: string;
  time: string;
  location: string;
  seats?: string;
  imageUrl?: string;
  joinLink?: string;
  eventVisibility?: string;
  objectifs?: string[];
  intervenants?: Intervenant[];
  programme?: { time: string; title: string; description?: string }[];
}

export const EVENTS: AgendaEvent[] = [
  {
    id: 1,
    day: "24",
    month: "OCT",
    year: "2024",
    thematique: "Intelligence Artificielle",
    format: "Hybride",
    tags: [
      { label: "Conférence", color: "text-blue-600", bgColor: "bg-blue-50", iconName: "Video" },
      { label: "Hybride", color: "text-brand-green-hover", bgColor: "bg-brand-green-soft", iconName: "MonitorPlay" },
    ],
    title: "Sommet Africain de l'IA 2024",
    description: "Rejoignez les leaders de la tech et décideurs politiques pour discuter de l'avenir de l'intelligence artificielle en Afrique et de son impact sur le développement économique.",
    fullDescription: "Le Sommet Africain de l'IA 2024 est l'événement incontournable qui réunit en un lieu unique les chercheurs, entrepreneurs, décideurs politiques et investisseurs engagés dans le développement de l'intelligence artificielle sur le continent africain. Durant toute une journée, des conférences plénières, des tables rondes et des ateliers pratiques permettront d'explorer les défis et opportunités que présente l'IA pour l'Afrique : agriculture intelligente, santé connectée, éducation personnalisée, fintech et gouvernance numérique.",
    time: "09:00 – 18:00 (GMT)",
    location: "Dakar, Sénégal & En ligne",
    seats: "500+ participants",
    imageUrl: "/event-1.png",
    objectifs: [
      "Comprendre les enjeux stratégiques de l'IA en Afrique",
      "Créer des synergies entre acteurs publics et privés",
      "Élaborer des recommandations de politiques publiques",
      "Favoriser les échanges entre diaspora et continent",
    ],
    intervenants: [
      { name: "Dr. Aissatou Sow", role: "Chercheuse IA — Université de Dakar", initials: "AS", type: "Animateur", linkedin: "https://linkedin.com/in/aissatou-sow" },
      { name: "Marc Dupont", role: "Directeur Tech — AfriTech Ventures", initials: "MD", type: "Intervenant", linkedin: "https://linkedin.com/in/marc-dupont" },
      { name: "Fatou Diagne", role: "Ministre du Numérique — Sénégal", initials: "FD", type: "Coordinateur", linkedin: "https://linkedin.com/in/fatou-diagne" },
    ],
    programme: [
      { time: "09:00", title: "Ouverture & discours d'introduction", description: "Mot de bienvenue des organisateurs et partenaires institutionnels." },
      { time: "10:00", title: "Conférence plénière : L'IA au service du développement", description: "Panorama des cas d'usage IA à fort impact en Afrique subsaharienne." },
      { time: "12:30", title: "Déjeuner networking", description: "Rencontres informelles entre participants." },
      { time: "14:00", title: "Ateliers pratiques (3 pistes)", description: "Ateliers thématiques sur la santé, l'éducation et la fintech." },
      { time: "16:30", title: "Table ronde : Politiques & régulation de l'IA", description: "Débat entre décideurs politiques et experts techniques." },
      { time: "18:00", title: "Clôture & cocktail", description: "Remise de prix et networking final." },
    ],
  },
  {
    id: 2,
    day: "12",
    month: "NOV",
    year: "2024",
    thematique: "Data Science",
    format: "En ligne",
    tags: [
      { label: "Atelier Pratique", color: "text-purple-600", bgColor: "bg-purple-50", iconName: "Video" },
      { label: "En ligne", color: "text-blue-600", bgColor: "bg-blue-50", iconName: "MonitorPlay" },
    ],
    title: "Déployer des modèles LLM en production",
    description: "Un atelier technique intensif pour les ingénieurs data souhaitant maîtriser l'optimisation et le déploiement de modèles de langage à grande échelle.",
    fullDescription: "Cet atelier hautement technique s'adresse aux ingénieurs ML, data scientists et DevOps souhaitant passer de la phase d'expérimentation à la mise en production de grands modèles de langage (LLM). Nous aborderons les stratégies d'optimisation (quantization, distillation, ONNX), les architectures d'inférence (vLLM, TGI, Triton), la gestion des coûts et la supervision en production, via des exercices pratiques sur des cas réels.",
    time: "14:00 – 17:00 (CET)",
    location: "Zoom Meeting",
    seats: "Limité à 50 places",
    imageUrl: "/event-3.png",
    objectifs: [
      "Maîtriser les techniques de quantization et fine-tuning",
      "Déployer un LLM via vLLM ou Text Generation Inference",
      "Optimiser les coûts d'inférence en production",
      "Mettre en place un système de monitoring robuste",
    ],
    intervenants: [
      { name: "Youssef Alaoui", role: "Staff ML Engineer — Scale AI", initials: "YA", linkedin: "https://linkedin.com/in/youssef-alaoui" },
    ],
    programme: [
      { time: "14:00", title: "Introduction & rappels architecturaux LLM" },
      { time: "14:45", title: "Optimisation : quantization 4-bit & GPTQ" },
      { time: "15:30", title: "Démo live : déploiement avec vLLM" },
      { time: "16:15", title: "Monitoring & alertes en production" },
      { time: "16:50", title: "Q&R & cas pratiques" },
    ],
  },
  {
    id: 3,
    day: "05",
    month: "DÉC",
    year: "2024",
    thematique: "Intelligence Artificielle",
    format: "Présentiel",
    tags: [
      { label: "Meetup", color: "text-pink-600", bgColor: "bg-pink-50" },
      { label: "Présentiel", color: "text-slate-600", bgColor: "bg-brand-surface" },
    ],
    title: "Meetup SAIEN Paris — IA et Finance",
    description: "Une soirée de networking autour des applications de l'IA dans le secteur financier, avec des présentations courtes et des tables rondes thématiques.",
    fullDescription: "Rejoignez la communauté SAIEN Paris pour une soirée dédiée à l'intersection entre intelligence artificielle et services financiers. Au programme : trois lightning talks de 10 minutes, suivis d'une table ronde animée et d'un cocktail networking. Que vous soyez professionnel de la finance, data scientist ou entrepreneur, cet événement est l'occasion idéale de rencontrer des pairs, partager des expériences et explorer de nouvelles collaborations.",
    time: "18:30 – 21:30 (CET)",
    location: "Station F, Paris",
    seats: "80 places",
    imageUrl: "/event-2.png",
    objectifs: [
      "Découvrir les use cases IA dans la banque et l'assurance",
      "Networker avec des professionnels de la fintech",
      "Explorer des opportunités de collaboration",
    ],
    intervenants: [
      { name: "Sophie Martin", role: "Analyste Quantitative — BNP Paribas", initials: "SM", linkedin: "https://linkedin.com/in/sophie-martin" },
      { name: "Amadou Diallo", role: "Head of Data Science — Lydia", initials: "AD", linkedin: "https://linkedin.com/in/amadou-diallo" },
      { name: "Lucie Bernard", role: "Investisseur — Partech Africa", initials: "LB", linkedin: "https://linkedin.com/in/lucie-bernard" },
    ],
    programme: [
      { time: "18:30", title: "Accueil & networking" },
      { time: "19:00", title: "Lightning talk 1 : IA et scoring crédit" },
      { time: "19:15", title: "Lightning talk 2 : Détection de fraude par ML" },
      { time: "19:30", title: "Lightning talk 3 : Robo-advisors et gestion de patrimoine" },
      { time: "19:45", title: "Table ronde & questions" },
      { time: "20:30", title: "Cocktail networking" },
    ],
  },
  {
    id: 4,
    day: "20",
    month: "JAN",
    year: "2025",
    thematique: "Innovation Diaspora",
    format: "Présentiel",
    tags: [
      { label: "Conférence", color: "text-orange-600", bgColor: "bg-orange-50" },
      { label: "Présentiel", color: "text-slate-600", bgColor: "bg-brand-surface" },
    ],
    title: "Forum Innovation Diaspora Africaine",
    description: "Trois jours de rencontres, pitchs de startups et ateliers autour des enjeux de l'IA et du transfert technologique vers l'Afrique.",
    fullDescription: "Le Forum Innovation Diaspora Africaine est le rendez-vous annuel qui mobilise la diaspora technologique africaine autour d'un objectif commun : accélérer le transfert de compétences, de technologies et de capitaux vers le continent. Pendant trois jours, des centaines de participants issus de la diaspora africaine — ingénieurs, entrepreneurs, chercheurs, investisseurs — convergent pour partager, débattre et construire ensemble les projets de demain.",
    time: "09:00 – 18:00 (CET)",
    location: "Cité des Sciences, Paris",
    seats: "200 places",
    objectifs: [
      "Favoriser l'investissement de la diaspora en Afrique",
      "Présenter et pitcher des startups africaines innovantes",
      "Créer des ponts entre talents diaspora et continent",
      "Développer des partenariats public-privé",
    ],
    intervenants: [
      { name: "Ibrahima Koné", role: "CEO — AfriStartup Hub", initials: "IK", linkedin: "https://linkedin.com/in/ibrahima-kone" },
      { name: "Mariame Touré", role: "Partner — Orange Ventures", initials: "MT", linkedin: "https://linkedin.com/in/mariame-toure" },
    ],
    programme: [
      { time: "Jour 1", title: "Conférences d'ouverture & panels thématiques" },
      { time: "Jour 2", title: "Pitchs de startups & ateliers d'investissement" },
      { time: "Jour 3", title: "Ateliers pratiques & networking de clôture" },
    ],
  },
  {
    id: 5,
    day: "15",
    month: "FÉV",
    year: "2025",
    thematique: "Réseaux & Sécurité",
    format: "En ligne",
    tags: [
      { label: "Webinaire", color: "text-brand-green-hover", bgColor: "bg-brand-green-soft" },
      { label: "En ligne", color: "text-blue-600", bgColor: "bg-blue-50" },
    ],
    title: "Cybersécurité à l'ère de l'IA générative",
    description: "Analysez les nouvelles menaces posées par les deepfakes et les IA génératives, et comment s'en prémunir efficacement dans les entreprises.",
    fullDescription: "La démocratisation des modèles génératifs (GPT, Stable Diffusion, etc.) a introduit de nouvelles surfaces d'attaque pour les entreprises : phishing hyper-personnalisé, deepfakes audio/vidéo, génération automatique de malwares. Ce webinaire réunit deux experts en cybersécurité pour analyser ces menaces et proposer des contre-mesures concrètes adaptées aux équipes de sécurité.",
    time: "10:00 – 12:00 (GMT)",
    location: "Microsoft Teams",
    seats: "Accès illimité",
    objectifs: [
      "Identifier les nouvelles menaces liées à l'IA générative",
      "Comprendre le fonctionnement des deepfakes audio et vidéo",
      "Mettre en place des garde-fous organisationnels et techniques",
      "Anticiper les évolutions réglementaires (EU AI Act)",
    ],
    intervenants: [
      { name: "Karim El Fassi", role: "RSSI — Groupe Société Générale", initials: "KE", linkedin: "https://linkedin.com/in/karim-el-fassi" },
      { name: "Nadia Okonkwo", role: "Researcher — CrowdStrike", initials: "NO", linkedin: "https://linkedin.com/in/nadia-okonkwo" },
    ],
    programme: [
      { time: "10:00", title: "Introduction : panorama des menaces IA 2024-2025" },
      { time: "10:30", title: "Deepfakes : démonstration & détection" },
      { time: "11:00", title: "Phishing génératif & ingénierie sociale augmentée" },
      { time: "11:30", title: "Stratégies de défense & politique d'entreprise" },
      { time: "11:50", title: "Q&R" },
    ],
  },
];
