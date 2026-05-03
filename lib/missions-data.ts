export type MissionIconName =
  | "GraduationCap"
  | "Globe2"
  | "BookOpen"
  | "Handshake"
  | "Rocket"
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
  contributeActions: string[];
}

export const MISSIONS: MissionData[] = [
  {
    slug: "formation-mentorat",
    title: "Formation & Mentorat",
    iconName: "GraduationCap",
    shortDescription:
      "Développer les compétences locales par des programmes d'excellence en IA, Data Science, ML et Cybersécurité, avec un mentorat assuré par la diaspora.",
    intro:
      "La mission Formation vise à renforcer durablement les capacités techniques sénégalaises en Intelligence Artificielle, Data et Cybersécurité, du niveau introductif au niveau expert. Elle s'appuie sur l'expertise de la diaspora pour transmettre, encadrer et accompagner la nouvelle génération de talents.",
    strategicAxes: [
      "Concevoir des parcours pédagogiques progressifs, alignés sur les standards internationaux et les réalités du marché sénégalais.",
      "Mettre en place un programme de mentorat structuré entre la diaspora et les étudiants, jeunes diplômés et professionnels en reconversion.",
      "Former des formateurs locaux pour démultiplier l'impact sur le territoire.",
      "Aligner les contenus sur les besoins concrets des entreprises et institutions sénégalaises.",
    ],
    flagshipPrograms: [
      "Bootcamp IA Dakar - Programme intensif en cours de conception.",
      "SAIEN Mentorat - Mise en relation diaspora et étudiants au Sénégal.",
      "Cycle d'ateliers universitaires - En partenariat avec les facs sénégalaises.",
      "Académie MLOps - Pour ingénieurs en activité (à venir).",
    ],
    impactTargets: [
      "Bâtir un réseau de mentors techniques actifs au sein de la diaspora.",
      "Former chaque année une cohorte de jeunes talents en IA, Data et Cybersécurité.",
      "Faciliter l'insertion professionnelle des bénéficiaires sur des rôles tech.",
      "Renforcer le tissu de formateurs locaux capables de relayer les programmes.",
    ],
    contributeActions: [
      "Devenir mentor",
      "Proposer un atelier",
      "Soutenir un programme",
    ],
  },
  {
    slug: "reseau-diaspora",
    title: "Réseau Diaspora",
    iconName: "Globe2",
    shortDescription:
      "Fédérer les talents sénégalais répartis dans le monde pour faciliter le transfert de connaissances et créer des opportunités professionnelles.",
    intro:
      "Le Réseau Diaspora rassemble les talents sénégalais répartis sur tous les continents, étudiants, chercheurs, ingénieurs, entrepreneurs, pour créer une communauté active d'échanges, d'entraide et de collaboration. Notre ambition: transformer la dispersion géographique en force collective.",
    strategicAxes: [
      "Cartographier les talents sénégalais en IA, Data et Cybersécurité dans le monde via un annuaire de référence.",
      "Animer la communauté à travers des rencontres en ligne et présentielles régulières (afterworks, meet-ups, conférences).",
      "Faciliter le partage d'opportunités professionnelles, académiques et entrepreneuriales entre membres.",
      "Créer des cercles thématiques (NLP, Computer Vision, Cybersécurité, etc.) pour des échanges techniques pointus.",
    ],
    flagshipPrograms: [
      "SAIEN Annuaire - Cartographie des talents sénégalais en IA dans le monde.",
      "SAIEN Talks - Rencontres mensuelles thématiques en ligne.",
      "Hubs locaux - Antennes en France, au Sénégal et dans les pays de la diaspora.",
      "SAIEN Awards - Reconnaissance annuelle des contributions remarquables.",
    ],
    impactTargets: [
      "Constituer une communauté visible et active de Sénégalais experts en IA.",
      "Multiplier les connexions professionnelles et collaborations entre membres.",
      "Donner à la diaspora un cadre fédérateur pour contribuer collectivement au développement du Sénégal.",
    ],
    contributeActions: [
      "Rejoindre le réseau",
      "Animer un cercle thématique",
      "Organiser un événement local",
    ],
  },
  {
    slug: "vulgarisation",
    title: "Vulgarisation",
    iconName: "BookOpen",
    shortDescription:
      "Rendre l'IA accessible au grand public, aux jeunes et aux étudiants à travers des contenus pédagogiques, ateliers et événements de sensibilisation.",
    intro:
      "La Vulgarisation rend l'Intelligence Artificielle accessible au plus grand nombre, sans jargon, sans barrière, sans élitisme. Notre conviction: pour que le Sénégal s'approprie l'IA, il faut d'abord la démystifier auprès des jeunes, des étudiants, des professionnels en reconversion et du grand public.",
    strategicAxes: [
      "Produire du contenu pédagogique en français (et progressivement en wolof) expliquant les concepts clés de l'IA et leurs enjeux.",
      "Organiser des sessions de découverte pour les lycéens, étudiants et publics non techniques.",
      "Sensibiliser aux opportunités, mais aussi aux risques de l'IA (biais, vie privée, désinformation).",
      "Mettre en lumière des cas d'usage concrets adaptés au contexte sénégalais.",
    ],
    flagshipPrograms: [
      "SAIEN Decode - Articles et vidéos pour expliquer l'IA simplement.",
      "IA & Lycéens - Sessions de découverte dans les établissements.",
      "SAIEN Podcast - Conversations accessibles avec des experts sénégalais.",
      "Glossaire IA en wolof - Premier lexique adapté à la langue locale.",
    ],
    impactTargets: [
      "Toucher un large public francophone et sénégalais non spécialiste.",
      "Susciter des vocations chez les jeunes pour les métiers de la tech et de l'IA.",
      "Contribuer à un débat public éclairé sur les enjeux de l'IA au Sénégal.",
    ],
    contributeActions: [
      "Créer du contenu",
      "Animer une session",
      "Suggérer un sujet",
    ],
  },
  {
    slug: "partenariats",
    title: "Partenariats",
    iconName: "Handshake",
    shortDescription:
      "Créer des synergies entre universités, entreprises tech, institutions publiques en France, au Sénégal et à l'international.",
    intro:
      "La mission Partenariats tisse les alliances stratégiques qui démultiplient notre impact. Nous bâtissons des ponts entre universités, entreprises tech, institutions publiques et acteurs de la société civile en France, au Sénégal et à l'international pour créer un écosystème où l'expertise sénégalaise en IA peut s'épanouir et rayonner.",
    strategicAxes: [
      "Nouer des accords de collaboration avec les universités sénégalaises et françaises pour la recherche, la formation et l'insertion.",
      "Développer des partenariats avec des entreprises tech pour ouvrir des opportunités de stage, d'emploi et de mentorat.",
      "Représenter la communauté auprès des institutions publiques sénégalaises, françaises, africaines et internationales.",
      "Co-construire des programmes avec d'autres associations et fédérations partageant nos valeurs.",
    ],
    flagshipPrograms: [
      "Convention universités - Partenariats académiques France et Sénégal.",
      "Programme entreprises partenaires - Recrutement, mentorat, projets communs.",
      "Représentation institutionnelle - Auprès des autorités sénégalaises et françaises.",
      "Affiliations internationales - Réseaux IA panafricains et francophones.",
    ],
    impactTargets: [
      "Devenir un interlocuteur reconnu sur les enjeux de l'IA sénégalaise.",
      "Multiplier les opportunités professionnelles et académiques pour nos membres.",
      "Contribuer aux politiques publiques en matière de souveraineté numérique.",
    ],
    contributeActions: [
      "Devenir partenaire",
      "Proposer une collaboration",
      "Recommander un acteur",
    ],
  },
  {
    slug: "entrepreneuriat",
    title: "Entrepreneuriat",
    iconName: "Rocket",
    shortDescription:
      "Accompagner les projets entrepreneuriaux, scientifiques et sociaux portés par des Sénégalais autour de l'IA.",
    intro:
      "L'Entrepreneuriat accompagne celles et ceux qui veulent transformer leur expertise en projets concrets, startups, projets de recherche, initiatives sociales. Notre ambition: que la prochaine génération de solutions tech pour le Sénégal soit conçue, portée et déployée par des Sénégalais, avec le soutien de la diaspora.",
    strategicAxes: [
      "Identifier et accompagner les projets entrepreneuriaux portés par des Sénégalais autour de l'IA, de la Data et de la Cybersécurité.",
      "Mettre les porteurs de projets en relation avec des mentors, experts techniques et investisseurs de la diaspora.",
      "Faciliter l'accès aux ressources: financement, infrastructure cloud, données, espaces de travail.",
      "Soutenir les projets sociaux et de recherche à fort impact, même non marchands.",
    ],
    flagshipPrograms: [
      "SAIEN Connect Hub - Plateforme de mise en relation porteurs et mentors.",
      "Sessions Pitch - Présentation de projets à un panel d'experts.",
      "Programme d'incubation - Accompagnement structuré sur 6 mois (à venir).",
      "Fonds de soutien - Microsubventions pour projets à impact (à étudier).",
    ],
    impactTargets: [
      "Faire émerger des projets sénégalais de qualité dans l'écosystème IA.",
      "Créer un pipeline d'entrepreneurs accompagnés par des pairs expérimentés.",
      "Encourager l'émergence de solutions adaptées aux réalités locales.",
    ],
    contributeActions: [
      "Présenter un projet",
      "Devenir mentor business",
      "Soutenir financièrement",
    ],
  },
  {
    slug: "ia-responsable",
    title: "IA Responsable",
    iconName: "ShieldCheck",
    shortDescription:
      "Promouvoir une intelligence artificielle éthique, non biaisée et adaptée aux contextes culturels et économiques sénégalais et ouest-africains.",
    intro:
      "L'IA Responsable est un engagement transversal: nous voulons une intelligence artificielle qui serve les Sénégalais et les Africains de l'Ouest sans les discriminer, qui respecte leurs langues, leurs cultures et leurs contextes économiques. Une IA développée avec le Sénégal, pas seulement pour lui.",
    strategicAxes: [
      "Sensibiliser aux enjeux éthiques de l'IA: biais algorithmiques, protection des données personnelles, souveraineté numérique.",
      "Promouvoir le développement de jeux de données et modèles adaptés aux langues et contextes ouest-africains.",
      "Accompagner les acteurs publics et privés sur les bonnes pratiques d'une IA responsable.",
      "Documenter et publier des recommandations adaptées au cadre sénégalais.",
    ],
    flagshipPrograms: [
      "Charte SAIEN de l'IA Responsable - Cadre d'engagement pour nos membres.",
      "Veille éthique - Rapport annuel sur l'IA et les enjeux sénégalais.",
      "Datasets locaux - Soutien à la création de corpus en langues ouest-africaines.",
      "Conférences thématiques - Débats publics sur les enjeux de l'IA.",
    ],
    impactTargets: [
      "Faire de l'éthique un réflexe au sein de la communauté tech sénégalaise.",
      "Contribuer à l'émergence d'une IA respectueuse des spécificités locales.",
      "Influencer les politiques publiques et les pratiques industrielles.",
    ],
    contributeActions: [
      "Rejoindre le groupe IA Responsable",
      "Proposer une thématique",
      "Co-rédiger un document",
    ],
  },
];
