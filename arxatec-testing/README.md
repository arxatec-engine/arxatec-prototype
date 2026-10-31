# ARXATEC TESTING

**A separate experimental snapshot of the Arxatec website.**

**Technologies:** Astro 5, React 19 and Tailwind CSS 3.

[Repository overview](../README.md) · [The story](../README.md#the-story) · [Public website snapshot](../arxatec-site/README.md)

## The story

Despite its name, `arxatec-testing` is an Astro website project, not a test suite. It preserves a separate version of the public site, with its own pages, components and locale routing. Compare it with [arxatec-site](../arxatec-site/README.md) to explore the two website snapshots.

> **Important:** This is an archived experiment, not the current Arxatec website. Content, external links and integrations may be incomplete or outdated.

## What is in the prototype

| Area | Pages and components |
| --- | --- |
| **Home** | Product, features, pricing and frequently asked questions. |
| **Content** | Blog listing and sample articles. |
| **Support** | Support page and chatbot components. |
| **Legal** | Privacy policy, terms and a 404 page. |
| **Languages** | Spanish, English and Quechua, each with a route prefix. |

## Project structure

```text
arxatec-testing/
├── public/                 Static assets and branding
├── src/
│   ├── components/
│   │   ├── pages/          Page-specific sections
│   │   └── shared/         Shared components, including the chatbot
│   ├── i18n/               Language labels and translation helpers
│   ├── layouts/            Shared Astro layout
│   ├── pages/              Routes under es/, en/ and qu/
│   ├── styles/             Global styles
│   └── utils/              Shared helpers and asset references
├── astro.config.mjs        Integrations, locales and Vercel adapter
├── vercel.json             Historical Vercel configuration
└── package.json            Dependencies and scripts
```

Unlike `arxatec-site`, this version configures a prefix for the default Spanish locale: `/es/`, `/en/` and `/qu/`. Its root page contains an attempted redirect to `/es/`, but the built root page can be blank; open a localized route directly.

## Running locally

Use Node.js 22 or newer and npm. The archived lockfile is incomplete for current npm, so the following installation resolves the declared version ranges without modifying it. It was checked with Node.js 24 and npm 11.

```bash
git clone https://github.com/arxatec-engine/arxatec-prototype.git
cd arxatec-prototype/arxatec-testing
npm install --no-package-lock
npm run dev
```

Open [http://localhost:4321/es/](http://localhost:4321/es/), or replace `es` with `en` or `qu`. Astro may choose another port if 4321 is already in use.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro development server. |
| `npm run build` | Build the static site into `dist/`. |
| `npm run preview` | Preview an existing local build. |
| `npm run astro -- --help` | Show Astro CLI options. |

This project does not define an automated test script in `package.json`. Its Vercel adapter and configuration are preserved for historical context.

## People

The later Arxatec team included **Rafael Martín Aguirre Gonzalo** and **Yhefry Michael Gaspar Almonacid**, with substantial contributions from **Harvey Yerik Vasquez Huaranga** until June. **Yemis Paredez** built the preceding 2024 MVP. See the [repository overview](../README.md#the-people) and Git history for the wider context and contributors.
