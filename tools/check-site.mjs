// Static check for the site data. Run: node tools/check-site.mjs
// - every module has the required fields, a unique id, a valid status and existing images
// - when the site lives next to the module folders (inside the work project), it also checks that
//   every module in "Módulos Prontos" / "Em Desenvolvimento" is listed and that versions match module.json
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "data/modules.js"), "utf8"), sandbox);
const site = sandbox.window.SITE;
if (!site?.modules?.length) throw new Error("data/modules.js must define window.SITE with modules");

const STATUS = ["ready", "testing", "dev"];
const ids = new Set();
const fileExists = (rel) => existsSync(join(root, rel));

for (const m of site.modules) {
  const at = `[${m.id ?? "?"}]`;
  for (const f of ["id", "title", "version", "status", "foundry", "tagline", "summary"]) {
    if (!m[f]) fail(`${at} missing "${f}"`);
  }
  if (m.id && !/^[a-z0-9-]+$/.test(m.id)) fail(`${at} id must be lowercase-with-hyphens`);
  if (ids.has(m.id)) fail(`${at} duplicate id`);
  ids.add(m.id);
  if (!STATUS.includes(m.status)) fail(`${at} status must be one of ${STATUS.join(", ")}`);
  if (!Array.isArray(m.features) || !m.features.length) fail(`${at} needs at least one feature`);
  for (const f of m.features ?? []) if (!f.title || !f.text) fail(`${at} feature without title/text`);
  for (const s of m.tutorial ?? []) {
    if (!s.title || !s.text) fail(`${at} tutorial step without title/text`);
    if (s.image && !fileExists(s.image)) fail(`${at} missing image ${s.image}`);
    if (s.image && !s.alt) warnings.push(`${at} image ${s.image} has no "alt"`);
  }
  if (m.cover && !fileExists(m.cover)) fail(`${at} missing cover ${m.cover}`);
  if (m.install?.manifest && !/^https:\/\/.+\.json(\?.*)?$/.test(m.install.manifest)) fail(`${at} install.manifest must be an https URL to a .json`);
  if (m.status === "ready" && !m.install?.manifest) warnings.push(`${at} is ready but has no install.manifest yet`);
}

for (const f of ["index.html", "module.html", "css/site.css", "js/app.js", "assets/logo-dados-criticos.png", "assets/padrao-dados-claro.png", "assets/formas-organicas.svg"]) {
  if (!fileExists(f)) fail(`missing file ${f}`);
}

// Cross-check with the work project (skipped when the site is cloned on its own).
const work = resolve(root, "..");
const folders = { "Módulos Prontos": "ready", "Em Desenvolvimento": "dev" };
for (const [folder, kind] of Object.entries(folders)) {
  const dir = join(work, folder);
  if (!existsSync(dir)) continue;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const manifest = join(dir, entry.name, "module.json");
    if (!existsSync(manifest)) continue;
    const real = JSON.parse(readFileSync(manifest, "utf8"));
    const listed = site.modules.find((m) => m.id === entry.name);
    if (!listed) { fail(`"${folder}/${entry.name}" is not listed in data/modules.js`); continue; }
    if (listed.version !== real.version) fail(`[${entry.name}] version ${listed.version} in the site, ${real.version} in module.json`);
    if (kind === "ready" && listed.status !== "ready") fail(`[${entry.name}] is in "Módulos Prontos" but status is "${listed.status}"`);
    if (kind === "dev" && listed.status === "ready") fail(`[${entry.name}] is in "Em Desenvolvimento" but status is "ready"`);
  }
}

warnings.forEach((w) => console.warn("aviso:", w));
if (errors.length) {
  errors.forEach((e) => console.error("erro:", e));
  process.exit(1);
}
console.log(`✓ site ok: ${site.modules.length} módulo(s): ${site.modules.map((m) => m.id).join(", ")}`);
