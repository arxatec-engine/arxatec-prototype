# ARXATEC WEBSITE

**An archived public website for the early Arxatec platform.**

**Technologies:** Astro 5, React 19 and Tailwind CSS 3.

[Repository overview](../README.md) · [The story](../README.md#the-story) · [Testing website](../arxatec-testing/README.md)

## The story

This Astro project preserves a public-facing website from an early stage of Arxatec. It introduced the platform, its intended features and plans, and gave visitors access to blog and support pages. It sits alongside the [platform](../arxatec-platform/README.md) and [service](../arxatec-service/README.md) in this historical archive.

> **Important:** This is an old website snapshot, not the current Arxatec website. Some content is sample content and links or integrations may no longer work.

## What is in the prototype

| Area | Pages and components |
| --- | --- |
| **Home** | Product introduction, features, pricing, questions and blog sections. |
| **Content** | Blog listing and sample article pages. |
| **Support** | Support page and chatbot components. |
| **Legal** | Privacy policy, terms and a 404 page. |
| **Languages** | Spanish, English and Quechua routes and translation files. |

## Project structure

```text
arxatec-site/
├── public/                 Static assets, branding and social images
├── src/
│   ├── components/
│   │   ├── pages/          Page-specific sections
│   │   └── shared/         Shared components, including the chatbot
│   ├── i18n/               Language labels and translation helpers
│   ├── layouts/            Shared Astro layout
│   ├── pages/              Astro routes, including en/ and qu/
│   ├── styles/             Global styles
│   └── utils/              Shared helpers and asset references
├── astro.config.mjs        Integrations, locales and Vercel adapter
└── package.json            Dependencies and scripts
```

Spanish is the default locale and uses unprefixed routes such as `/` and `/pricing`. English uses `/en/` and Quechua uses `/qu/`. These are the routes configured in this snapshot; translated content and connected features may be incomplete.

## Running locally

Use Node.js 22 or newer and npm. The archived lockfile is incomplete for current npm, so the following installation resolves the declared version ranges without modifying it. It was checked with Node.js 24 and npm 11.

```bash
git clone https://github.com/arxatec-engine/arxatec-prototype.git
cd arxatec-prototype/arxatec-site
npm install --no-package-lock
npm run dev
```

Open [http://localhost:4321](http://localhost:4321), or add `/en/` or `/qu/` to explore the other locales. Astro may choose another port if 4321 is already in use.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro development server. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview an existing local build. |
| `npm run astro -- --help` | Show Astro CLI options. |

The archived configuration includes the Vercel adapter and sitemap integration. A local preview does not require deploying the site, but features that call external services may need additional configuration.

## People

The later Arxatec team included **Rafael Martín Aguirre Gonzalo** and **Yhefry Michael Gaspar Almonacid**, with substantial contributions from **Harvey Yerik Vasquez Huaranga** until June. **Yemis Paredez** built the preceding 2024 MVP. See the [repository overview](../README.md#the-people) and Git history for the wider context and contributors.
