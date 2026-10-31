# Historical development conventions

This guide records conventions used for the service in this repository. The code is an archived prototype; it does not describe the current Arxatec backend. See the [service README](README.md) for setup and known limitations.

## Commits and branches

The project used [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Gitmoji](https://gitmoji.dev/) to describe changes. For example:

```text
feat: ✨ add password reset
fix: 🐛 handle an expired token
```

Branch names used a category and a short kebab-case description, such as `feature/create-new-button-component`.

## Code organization

The service combines domain-oriented modules, layers and some feature-based slices. The archive does not use exactly the same layout everywhere:

```text
src/
├── config/                Environment, database, email, Redis and socket setup
├── docs/                  Swagger configuration
├── infrastructure/        External storage and JWT helpers
├── middlewares/           Authentication and request middleware
├── modules/
│   ├── article/           Example of data, domain and presentation layers
│   ├── auth/features/     Example of feature-based authentication slices
│   ├── case/              Case code; its routes are not currently mounted
│   └── ...                Client, community, lawyer and other modules
├── utils/                 Shared helpers
├── index.ts               Server entry point
└── routes.ts              Central API router
```

Many domain modules use `domain/` for DTOs and entities, `data/` for repositories or external APIs, and `presentation/` for controllers, services and routes. Authentication also groups related code under individual feature folders: `src/modules/auth/features/login/login_with_email/` is one example.

When tracing an endpoint, follow its route to the controller and service, then to any repository or external API it uses. [`src/routes.ts`](src/routes.ts) determines which module routes are actually exposed. The case router is present in the source but commented out in that file.

## Naming

The historical convention was to use English names, descriptive folders and dot-separated roles in filenames, such as `user.controller.ts`. Existing directories contain both camel case and snake case; preserve the spelling already in use when navigating the archive.
