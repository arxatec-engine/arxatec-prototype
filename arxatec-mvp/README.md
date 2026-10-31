<div align="center">

<img src="web/img/ARXATEC.png" alt="ARXATEC logo" width="110">

# ARXATEC MVP

**Online legal advice: the 2024 MVP where ARXATEC started.**

[![Run the browser demo](https://img.shields.io/badge/Browser_demo-Run_locally-3f3ab8?style=for-the-badge&logo=googlechrome&logoColor=white)](#-browser-based-demo)

![PHP 8](https://img.shields.io/badge/PHP-8-777BB4?logo=php&logoColor=white) ![MySQL / MariaDB](https://img.shields.io/badge/MySQL-MariaDB-003545?logo=mariadb&logoColor=white) ![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black) ![SQLite demo](https://img.shields.io/badge/Demo-SQLite_in_the_browser-003B57?logo=sqlite&logoColor=white) ![Archived MVP](https://img.shields.io/badge/Status-Archived_MVP-8a8f98) [![MIT License](https://img.shields.io/badge/License-MIT-2ea44f)](LICENSE)

</div>

<br>

![Login page of the browser demo, with the demo panel open](docs/screenshots/login.webp)

## 📖 The story

ARXATEC started in 2024 as this MVP: a platform where people could get legal advice online, book a video consultation with a lawyer or ask a question by message. It is preserved as a record of the project's first steps, with assets optimized to reduce its size.

Yemis Paredez designed and built this first version. Later came an institute project presented at SENATI in June 2025, followed by another rebuild beginning in October. Read the [full history and meet the wider team](../README.md#-the-story). This MVP is an archived prototype, not the current Arxatec platform.

## ✨ What it does

| | Role | Features |
| :---: | --- | --- |
| 🌐 | **Visitor** | Public website with services, plans, testimonials and team. Sign-up as a client. |
| 🙋 | **Client** | Requests video or message consultations, tracks their status and reviews past consultations. |
| ⚖️ | **Lawyer** | Screens for public and private consultations, meetings and incidents (designed, not yet connected to the database). |
| 🛡️ | **Admin** | Registers admins and lawyers, lists every user and manages their profile: photo, password and personal data. |

> [!NOTE]
> The interface is in Spanish, as it was for its users in Peru.

## 🖼️ Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/public-website.webp" alt="Public website"><p align="center"><sub>Public website</sub></p></td>
    <td width="50%"><img src="docs/screenshots/admin-dashboard.webp" alt="Admin dashboard"><p align="center"><sub>Admin dashboard</sub></p></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/client-video-calls.webp" alt="Client video consultations"><p align="center"><sub>Client · video consultations</sub></p></td>
    <td width="50%"><img src="docs/screenshots/client-messages.webp" alt="Client message consultations"><p align="center"><sub>Client · message consultations</sub></p></td>
  </tr>
</table>

## 🚀 Browser-based demo

The demo's application logic runs in the browser, with no backend or shared database. A local static server delivers its files.

To build and serve it locally, use Node.js 20 or newer and run these commands from `arxatec-mvp/`:

```bash
node demo/build.mjs
node demo/serve.mjs
```

Open [http://localhost:8095](http://localhost:8095). The build recreates `demo/dist/`. The previously advertised GitHub Pages address returned 404 when checked, so use the local demo in this archive.

| | |
| :---: | --- |
| 🧩 | **Same interface.** Every page is the HTML rendered by the original PHP app, with its own CSS, JavaScript and images. |
| 🗄️ | **SQLite in the browser.** A small runtime replaces the PHP backend and runs the same queries on [sql.js](https://sql.js.org). |
| 🔒 | **Private by design.** Data is saved in each visitor's browser (IndexedDB) and never leaves it. **Reset demo data** restores the initial state. |

**Demo accounts.** The **Demo** tab on the right edge of every page signs in with one click.

| Role | Email | Password |
| --- | --- | --- |
| 🛡️ Admin | `admin@gmail.com` | `admin` |
| 🙋 Client | `cliente@gmail.com` | `cliente` |
| ⚖️ Lawyer | `abogado@gmail.com` | `abogado` |

<details>
<summary><b>Differences from the original app</b></summary>

<br>

- The client's status and history pages include sample consultations so they are not empty.
- *Create plan* and the admin's *personal data* form save their changes; in the original app their handlers were never finished.
- Forms that post to scripts missing from the original app, such as the support form, show a notice instead of an error page.
- The build reports one missing image referenced by the original public site: `web/img/model 2.png`.

</details>

## 🗂️ Project structure

```text
arxatec-mvp/
├── auth/          Login, registration and password recovery
├── projects/
│   ├── admin/     Admin panel
│   ├── customer/  Client panel
│   ├── lawyer/    Lawyer panel
│   └── shared/    Shared assets and profile images
├── web/           Public website
├── database/      mysqli connection and schema with seed data (sql.txt)
├── demo/          Static browser demo: compressed page captures, SQLite runtime and build scripts
└── docker/        PHP + MariaDB environment used to capture the demo
```

> [!WARNING]
> This code is not meant for production: passwords are stored in plain text, some queries concatenate user input and a few forms point to scripts that were never written.

<details>
<summary><b>🛠️ Rebuilding the demo</b></summary>

<br>

Only needed after changing the PHP views. Requires Docker and Node.js 20+.
The captured HTML is stored in `demo/pages.json.br`; the build reads it directly
and `capture.mjs` regenerates it when the PHP views change. The bundled SQLite
files are also stored compressed and restored automatically when the demo is built.
The build creates `demo/dist/`, which can be deleted after previewing.

The shared template's editable source files are stored in
`projects/shared/template-sources.tar.gz`. To edit them, extract the archive from
`projects/shared/` with `tar -xzf template-sources.tar.gz`; the application uses
the compiled assets in `assets/vendor/`.

The included Boxicons, Font Awesome and Elegant Icons fonts and stylesheets
contain only icons used by the current interface. Restore the full upstream
font and stylesheet when adding other icons from that library.

```bash
# 1. Capture the pages from a temporary copy of the app with a fresh database
cd docker
WEB_PORT=8092 DB_PORT=3308 docker compose -p arxatec-capture up -d --build db web
cd ..
node demo/capture.mjs http://localhost:8092
docker compose -f docker/docker-compose.yml -p arxatec-capture down -v

# 2. Build and preview at http://localhost:8095
node demo/build.mjs
node demo/serve.mjs
```

The included `.github/workflows/demo-pages.yml` was written for the standalone MVP repository. In this archive it is nested inside `arxatec-mvp/`, so GitHub Actions will not discover it at the repository root, and its paths would need to be adapted before publishing.

</details>

## 👤 Author

<table>
  <tr>
    <td><img src="https://github.com/yemisparedez.png?size=160" alt="Yemis Paredez" width="72"></td>
    <td><b>Yemis Paredez</b><br>Designed and built ARXATEC MVP.<br>🔗 <a href="https://linktr.ee/yemis_paredez">linktr.ee/yemis_paredez</a></td>
  </tr>
</table>

## 📄 License

[MIT](LICENSE) © 2024 Yemis Paredez. The demo bundles [sql.js](https://github.com/sql-js/sql.js) (MIT); UI templates and images belong to their respective authors.
