# SAIEN — Front-end

Interface web du réseau **SAIEN** (Synergie Africaine pour l'Innovation et l'Excellence Numérique).

Construit avec **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4** et **shadcn/ui**. Servi en production via **Docker + NGINX**.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.4 | Framework React (App Router) |
| React | 19 | UI |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | v4 | Styles utilitaires |
| shadcn/ui | — | Composants accessibles |
| lucide-react | 0.542 | Icônes |
| Docker | — | Conteneurisation multi-stage |
| NGINX | 1.27 | Reverse proxy prod |

---

## Démarrage rapide

### Développement local (Node)

```bash
cd front
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

### Développement avec Docker

```bash
docker compose up web
```

| URL | Service |
|---|---|
| http://localhost:3000 | Dev (Next.js Turbopack) |
| http://localhost:8080 | NGINX → Dev |
| http://localhost:8081 | NGINX → Prod (standalone) |

### Production avec Docker

```bash
docker compose up --build
```

---

## Scripts disponibles

```bash
npm run dev      # Serveur de développement (Turbopack, hostname 0.0.0.0)
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # ESLint
```

---

## Structure des pages

```
app/
├── page.tsx              # Accueil
├── a-propos/page.tsx     # Notre histoire, fondations, pont technologique
├── vision/page.tsx       # Vision & Missions
├── reseau/page.tsx       # Bureau, annuaire des membres, membres d'honneur
├── actualites/page.tsx   # Articles, recherche, newsletter
└── evenements/page.tsx   # Agenda (événements + webinaires), filtres, pagination
```

## Structure des composants

```
components/
├── Navbar.tsx             # Navigation principale
├── Footer.tsx             # Pied de page
├── about/                 # Composants page À propos
├── home/                  # Composants page Accueil
├── reseau/                # Composants page Réseau & Bureau
├── actualites/            # Composants page Actualités
├── evenements/            # Composants page Événements
└── (vision)               # HeroSection, MissionsSection, etc.
```

---

## Variables d'environnement

Copier `.env.example` en `.env.local` :

```bash
cp .env.example .env.local
```

> Aucune variable requise pour le démarrage — le projet fonctionne sans configuration.

---

## Docker — architecture

```
Dockerfile          Multi-stage : base → deps → dev → builder → runner
docker-compose.yml  Services : web (dev), web-prod, nginx
nginx/default.conf  Port 80 → web:3000 (dev) | Port 81 → web-prod:3000 (prod)
```

Le build de production utilise `output: "standalone"` de Next.js.

---

## Contribuer

1. Créer une branche `feature/<nom>` depuis `main`
2. Respecter la convention PascalCase, composants colocalisés dans `components/<page>/`
3. Vérifier `npm run lint` et `npx tsc --noEmit` avant de pousser
4. Ouvrir une Pull Request vers `main`
# saien_front_2026
