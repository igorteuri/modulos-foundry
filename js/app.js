// Renders the home page (module cards) and the module page from window.SITE (data/modules.js).
// Everything is built with DOM nodes + textContent, never innerHTML, so data text cannot inject markup.
(() => {
  "use strict";

  const SITE = window.SITE;
  const STATUS = { ready: "Pronto", testing: "Em testes", dev: "Em desenvolvimento" };
  const SVG_NS = "http://www.w3.org/2000/svg";

  /** Create an element: h("div", {class: "x"}, child, "text", ...). Falsy children are skipped. */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs ?? {})) {
      if (v === false || v == null) continue;
      el.setAttribute(k, v === true ? "" : v);
    }
    append(el, kids);
    return el;
  }

  function append(el, kids) {
    for (const k of kids.flat()) {
      if (k == null || k === false) continue;
      el.append(k.nodeType ? k : document.createTextNode(String(k)));
    }
  }

  /** Text with `code` segments turned into <code>. */
  function rich(text) {
    const frag = document.createDocumentFragment();
    String(text).split("`").forEach((part, i) => {
      if (!part) return;
      frag.append(i % 2 ? h("code", {}, part) : document.createTextNode(part));
    });
    return frag;
  }

  /** Orange hexagon with a number, same shape as the kit's marcador-hex.svg. */
  function hexNumber(n) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 400 440");
    svg.setAttribute("aria-hidden", "true");
    const poly = (points, fill) => {
      const p = document.createElementNS(SVG_NS, "polygon");
      p.setAttribute("points", points);
      p.setAttribute("fill", fill);
      svg.append(p);
    };
    poly("200,20 373.2,120 373.2,320 200,420 26.8,320 26.8,120", "#061719");
    poly("200,34 361.1,127 361.1,313 200,406 38.9,313 38.9,127", "#FF6D33");
    const t = document.createElementNS(SVG_NS, "text");
    t.setAttribute("x", "200");
    t.setAttribute("y", "298");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-family", "Montserrat, Arial, sans-serif");
    t.setAttribute("font-weight", "900");
    t.setAttribute("font-size", n > 9 ? "170" : "210");
    t.setAttribute("fill", "#FFFFFF");
    t.textContent = String(n);
    svg.append(t);
    return svg;
  }

  function hexIcon(icon) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 400 440");
    svg.setAttribute("aria-hidden", "true");
    for (const [pts, fill] of [
      ["200,20 373.2,120 373.2,320 200,420 26.8,320 26.8,120", "#061719"],
      ["200,34 361.1,127 361.1,313 200,406 38.9,313 38.9,127", "#FF6D33"]
    ]) {
      const p = document.createElementNS(SVG_NS, "polygon");
      p.setAttribute("points", pts);
      p.setAttribute("fill", fill);
      svg.append(p);
    }
    return h("div", { class: "hex" }, svg, h("span", {}, icon));
  }

  const chipStatus = (m) => h("span", { class: `chip ${m.status}` }, STATUS[m.status] ?? m.status);

  function topbar(isHome) {
    return h("header", { class: "topbar" },
      h("div", { class: "wrap" },
        h("a", { class: "brand", href: "index.html" },
          h("img", { src: "assets/logo-dados-criticos.png", alt: "Dados Críticos" }),
          h("span", {}, "Módulos do Teuri")),
        isHome ? null : h("nav", {}, h("a", { href: "index.html" }, "Todos os módulos"))));
  }

  function footer() {
    return h("footer", {},
      h("div", { class: "wrap" },
        h("span", {}, h("img", { src: "assets/logo-dados-criticos.png", alt: "" }), "Feito pelo Teuri · Dados Críticos"),
        h("span", {}, ...(SITE.links ?? []).map((l) => h("a", { href: l.url, rel: "noopener" }, l.label)))));
  }

  /* ---------------- home ---------------- */

  function moduleCard(m) {
    const cover = m.cover
      ? h("img", { src: m.cover, alt: "", loading: "lazy" })
      : [h("div", { class: "blob" }), hexIcon(m.icon ?? "🎲")];
    return h("a", { class: "card mod", href: `module.html?id=${encodeURIComponent(m.id)}` },
      h("div", { class: "cover" }, cover),
      h("div", { class: "body" },
        h("div", { class: "chips" }, chipStatus(m), h("span", { class: "chip light" }, `v${m.version}`), h("span", { class: "chip light" }, `Foundry ${m.foundry}`)),
        h("h3", {}, m.title),
        h("p", {}, m.tagline),
        h("span", { class: "more" }, "Ver detalhes e tutorial →")));
  }

  function renderHome(root) {
    document.title = `${SITE.title} · Dados Críticos`;
    const groups = [
      ["Prontos", SITE.modules.filter((m) => m.status === "ready")],
      ["Em desenvolvimento", SITE.modules.filter((m) => m.status !== "ready")]
    ].filter(([, list]) => list.length);

    root.append(
      topbar(true),
      h("div", { class: "hero" },
        h("div", { class: "wrap" },
          h("img", { class: "hero-logo", src: "assets/logo-dados-criticos.png", alt: "" }),
          h("div", {},
            h("h1", {}, "Módulos Foundry VTT"),
            h("p", {}, SITE.tagline)))),
      h("main", { class: "wrap" },
        ...groups.map(([name, list]) =>
          h("section", {},
            h("h2", { class: "pill" }, name),
            h("div", { class: "grid" }, ...list.map(moduleCard))))),
      footer());
  }

  /* ---------------- module page ---------------- */

  function copyButton(input) {
    const btn = h("button", { class: "btn", type: "button" }, "Copiar");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(input.value);
      } catch {
        input.select();
        document.execCommand?.("copy");
      }
      btn.textContent = "Copiado!";
      setTimeout(() => (btn.textContent = "Copiar"), 1600);
    });
    return btn;
  }

  function installBox(m) {
    const manifest = m.install?.manifest;
    const folder = m.install?.folder ?? m.id;
    const input = manifest ? h("input", { type: "text", readonly: true, value: manifest, "aria-label": "URL do manifest" }) : null;
    return h("div", { class: "card install", id: "instalar" },
      h("h2", {}, "Como instalar"),
      manifest
        ? [
            h("p", {}, "No Foundry, vá em Módulos, Instalar Módulo e cole esta URL no campo \"URL do Manifest\":"),
            h("div", { class: "copyrow" }, input, copyButton(input))
          ]
        : h("p", { class: "soon" }, "O link de instalação direta ainda não existe para este módulo."),
      h("p", {}, "Instalação manual: copie a pasta ", h("code", {}, folder), " para ", h("code", {}, "<Data>/modules/"),
        ", reinicie o servidor se ele estava rodando e ative o módulo no seu mundo."));
  }

  function section(id, title, content) {
    return h("section", { id }, h("h2", { class: "pill" }, title), content);
  }

  function renderModule(root) {
    const id = new URLSearchParams(location.search).get("id");
    const m = SITE.modules.find((x) => x.id === id);
    if (!m) {
      document.title = "Módulo não encontrado · Módulos do Teuri";
      root.append(topbar(false),
        h("main", { class: "wrap" },
          h("section", {}, h("h1", { class: "pill" }, "Módulo não encontrado"),
            h("p", {}, "Esse módulo não existe na lista. ", h("a", { href: "index.html" }, "Voltar para todos os módulos."))))
        , footer());
      return;
    }
    document.title = `${m.title} · Módulos do Teuri`;

    const parts = [];
    parts.push(section("recursos", "O que faz",
      h("div", { class: "features" }, ...m.features.map((f) =>
        h("article", { class: "card feature" },
          h("div", { class: "ico", "aria-hidden": "true" }, f.icon),
          h("h3", {}, f.title),
          h("p", {}, rich(f.text)))))));

    if (m.tutorial?.length) {
      parts.push(section("tutorial", "Como usar",
        h("ol", { class: "steps" }, ...m.tutorial.map((s, i) =>
          h("li", { class: "card step" },
            hexNumber(i + 1),
            h("div", {},
              h("h3", {}, s.title),
              h("p", {}, rich(s.text)),
              s.image ? h("img", { src: s.image, alt: s.alt ?? "", loading: "lazy" }) : null))))));
    }

    if (m.shortcuts?.length) {
      parts.push(section("atalhos", "Atalhos",
        h("div", { class: "card" },
          h("table", { class: "keys" },
            h("tbody", {}, ...m.shortcuts.map((k) =>
              h("tr", {}, h("th", { scope: "row" }, h("kbd", {}, k.key)), h("td", {}, rich(k.action)))))))));
    }

    if (m.limits?.length) {
      parts.push(section("limites", "Bom saber",
        h("ul", { class: "card list" }, ...m.limits.map((t) => h("li", {}, rich(t))))));
    }

    if (m.changelog?.length) {
      parts.push(section("novidades", "Novidades",
        h("div", { class: "card log" }, ...m.changelog.map((c) =>
          h("div", {}, h("h3", {}, `Versão ${c.version}`), h("ul", {}, ...c.items.map((t) => h("li", {}, rich(t)))))))));
    }

    const nav = [["Como instalar", "instalar"], ["O que faz", "recursos"], m.tutorial?.length && ["Como usar", "tutorial"],
      m.shortcuts?.length && ["Atalhos", "atalhos"], m.limits?.length && ["Bom saber", "limites"], m.changelog?.length && ["Novidades", "novidades"]]
      .filter(Boolean);

    root.append(
      topbar(false),
      h("main", { class: "wrap" },
        h("div", { class: "mhead" },
          h("p", { class: "crumb" }, h("a", { href: "index.html" }, "← Todos os módulos")),
          h("h1", {}, m.title),
          h("div", { class: "chips" }, chipStatus(m), h("span", { class: "chip light" }, `v${m.version}`), h("span", { class: "chip light" }, `Foundry ${m.foundry}`)),
          h("p", { class: "lead" }, m.tagline),
          h("p", {}, m.summary),
          h("nav", { class: "subnav", "aria-label": "Nesta página" }, ...nav.map(([label, anchor]) => h("a", { href: `#${anchor}` }, label)))),
        installBox(m),
        h("div", { style: "height:48px" }),
        ...parts),
      footer());
  }

  const root = document.getElementById("app");
  if (root && SITE) (document.body.dataset.page === "module" ? renderModule : renderHome)(root);
})();
