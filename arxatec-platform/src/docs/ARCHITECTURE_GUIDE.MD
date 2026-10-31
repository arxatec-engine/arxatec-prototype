# Architecture of the archived platform

This guide describes the source in this repository, not the current Arxatec platform. The team adapted ideas from clean architecture and vertical slices to organize the prototype by role and feature. The code is a historical snapshot, so its structure is not uniform and some workflows are incomplete.

## Application layout

- `src/main.tsx` mounts the application, the shared `Core` layout and the router.
- `src/routes/` defines public, authentication, client and lawyer routes.
- `src/components/` contains shared UI elements, layouts and access guards.
- `src/modules/` groups screens and feature-specific code by role and domain.
- `src/interceptors/` configures the shared Axios client; `src/config/env/` reads Vite environment variables.
- `src/store/`, `src/hooks/`, `src/models/` and `src/utilities/` contain shared state and helpers.
- `src/assets/lang/` holds translations; `src/lang/` holds generated keys.

## Feature organization

A feature can keep its pages, UI components, services, hooks and types close together. For example, `src/modules/laywer/cases/features/view_cases/` contains a case dashboard's components, services and types. The `laywer` spelling reflects the actual directory name in this archived source.

Shared features such as authentication, community, articles and calendar live under `src/modules/shared/`; client features live under `src/modules/client/`. Components that serve multiple areas live in `src/components/`. Different modules do not all use the same internal layout.

## API and configuration

The frontend uses the separately archived [Arxatec service](../../../arxatec-service/README.md). Its Axios client uses `VITE_API_BASE_URL`; some older calls use hard-coded URLs instead. Google sign-in and maps have separate public frontend configuration. See the [platform README](../../README.md) for local setup and known build limitations.

For translation key generation, see the [language guide](LANG_GUIDE.MD).
