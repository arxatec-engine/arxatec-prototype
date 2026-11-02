// Builds the static demo into demo/dist.
//
// - Copies the optimized assets (CSS, JS, images, fonts).
// - Takes the pages captured from the PHP app (demo/pages.json.br) and the static
//   pages of the public website, rewrites their links from .php to .html and
//   loads the demo runtime first in <head>.
//
// Usage: node demo/build.mjs

import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliDecompressSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const DIST = join(HERE, 'dist');
const PAGES = join(HERE, 'pages.json.br');

const ASSETS = [
  'auth/assets',
  'projects/shared/assets',
  'projects/shared/uploads',
  'web/css',
  'web/fonts',
  'web/img',
  'web/js',
];

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)).split(sep).join('/'));
}

const captured = JSON.parse(brotliDecompressSync(await readFile(PAGES)).toString('utf8'));
const capturedPages = Object.keys(captured).filter((file) => file.endsWith('.html'));

// Pages each panel has, to send unknown ?page= values to the dashboard like the PHP router does.
const panelPages = {};
for (const file of capturedPages) {
  const match = file.match(/^projects\/(\w+)\/(\w+)\.html$/);
  if (match) (panelPages[match[1]] ??= new Set()).add(match[2]);
}

function rewriteUrl(url, page) {
  if (EXTERNAL.test(url)) return url;

  const route = url.match(/^(?:index\.php)?\?page=([\w-]+)(.*)$/);
  if (route) {
    const [, name, rest] = route;
    let file = 'index';
    if (page.startsWith('auth/')) file = name === 'login' ? 'index' : name;
    const panel = page.match(/^projects\/(\w+)\//)?.[1];
    if (panel && panelPages[panel].has(name)) file = name;
    return `${file}.html?page=${name}${rest}`;
  }

  return url.replace(/^([^?#]*)\.php(?=$|[?#])/, '$1.html');
}

function transform(html, file) {
  const page = file.replace(/\.html$/, '');
  const root = '../'.repeat(file.split('/').length - 1) || './';
  const runtime = `<script src="${root}_demo/demo.js" data-root="${root}" data-page="${page}"></script>`;

  // The archived website's live-chat widget points to an external account.
  // Keep the browser demo from connecting visitors to that real service.
  const withoutLiveChat = html.replace(/<script\b[^>]*\bsrc=["'](?:https?:)?\/\/code\.tidio\.co\/[^"']+["'][^>]*>\s*<\/script>/gi, '');
  const rewritten = withoutLiveChat.replace(
    /\b(href|action|src)=(["'])(.*?)\2/g,
    (match, attr, quote, url) => `${attr}=${quote}${rewriteUrl(url, page)}${quote}`,
  );
  // Some pages of the original site are HTML fragments without <head>.
  const head = rewritten.match(/<head(?:\s[^>]*)?>/i);
  if (!head) return `${runtime}\n${rewritten}`;
  return rewritten.replace(head[0], `${head[0]}\n    ${runtime}`);
}

async function writePage(file, html) {
  const target = join(DIST, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
}

await rm(DIST, { recursive: true, force: true });

for (const asset of ASSETS) {
  await cp(join(REPO, asset), join(DIST, asset), { recursive: true });
}
await cp(join(HERE, 'runtime'), join(DIST, '_demo'), { recursive: true });

// Keep the bundled SQLite files compressed in the source tree. The published
// demo receives the normal files expected by sql.js and a static web server.
for (const file of ['sql-wasm.js', 'sql-wasm.wasm']) {
  const target = join(DIST, '_demo/vendor/sql.js', file);
  await writeFile(target, brotliDecompressSync(await readFile(`${target}.br`)));
  await rm(`${target}.br`);
}

for (const file of capturedPages) {
  await writePage(file, transform(captured[file], file));
}

// The public website's static pages are served as they are in the repository.
for (const name of await readdir(join(REPO, 'web'))) {
  if (name.endsWith('.html')) {
    const file = `web/${name}`;
    await writePage(file, transform(await readFile(join(REPO, file), 'utf8'), file));
  }
}

// index.php redirects to auth/.
await writePage('index.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ARXATEC MVP · Demo</title>
  <meta http-equiv="refresh" content="0; url=auth/">
  <script>location.replace('auth/');</script>
</head>
<body><a href="auth/">Open the ARXATEC MVP demo</a></body>
</html>
`);

// auth/middleware/logout.php: the runtime clears the session and redirects.
await writePage('auth/middleware/logout.html', transform(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ArxaTEC</title>
</head>
<body></body>
</html>
`, 'auth/middleware/logout.html'));

await writeFile(join(DIST, '.nojekyll'), '');

// Report local links that point to files missing from the build.
const missing = new Set();
for (const file of (await listFiles(DIST)).filter((f) => f.endsWith('.html'))) {
  const html = await readFile(join(DIST, file), 'utf8');
  for (const [, url] of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    if (EXTERNAL.test(url) || url.startsWith('${')) continue;
    const path = decodeURI(url.split(/[?#]/)[0]);
    if (!path) continue;
    const target = posix.normalize(posix.join(posix.dirname(file), path));
    const candidate = join(DIST, ...target.split('/'), ...(path.endsWith('/') ? ['index.html'] : []));
    try { await access(candidate); } catch { missing.add(`${file} -> ${url}`); }
  }
}

console.log(`Demo built in ${relative(REPO, DIST)} (${capturedPages.length} captured pages).`);
if (missing.size) {
  console.log(`\nLinks to files that do not exist (also broken in the original app):\n  ${[...missing].join('\n  ')}`);
}
