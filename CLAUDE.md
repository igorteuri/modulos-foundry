# Site "Módulos Foundry do Teuri" (GitHub Pages)

Vitrine + tutorial dos módulos Foundry do Teuri. Site estático, sem build, hospedado no GitHub Pages. Responda ao Teuri em português (pt-BR). Textos do site em pt-BR; código e README em inglês.

Esta pasta é um repositório git PRÓPRIO (aninhado na pasta de trabalho dos módulos, que não é repositório). Trabalhe só aqui; não leia os módulos inteiros, só o `README.md`/`module.json` do módulo que está sendo listado.

## Estrutura

```
index.html            home: cards dos módulos, agrupados em "Prontos" e "Em desenvolvimento"
module.html           página de um módulo (module.html?id=<id>): o que faz, como usar, atalhos, limites, novidades
data/modules.js       FONTE ÚNICA dos dados (window.SITE). Para adicionar/editar um módulo, mexa só aqui
js/app.js             monta as páginas a partir dos dados (DOM + textContent, nunca innerHTML)
css/site.css          visual (identidade Dados Críticos, tema claro)
assets/               logo, padrão de dados, formas orgânicas; imagens dos módulos em assets/modules/<id>/
tools/check-site.mjs  checagem: `node tools/check-site.mjs`
```

## Fluxo: adicionar ou atualizar um módulo

1. Edite `data/modules.js`: uma entrada por módulo (campos documentados no topo do arquivo). `status`: `ready` (pasta "Módulos Prontos"), `testing` ou `dev` ("Em Desenvolvimento"). `version` = a do `module.json`.
2. Imagens/GIFs: salve em `assets/modules/<id>/` e aponte em `cover` e `tutorial[].image` (com `alt`). Sem `cover`, o card mostra um hexágono com o `icon`.
3. Rode `node tools/check-site.mjs`. Quando o site está dentro da pasta de trabalho, ele confere se TODO módulo de "Módulos Prontos" e "Em Desenvolvimento" está listado e se a versão bate com o `module.json`. Falhou = falta atualizar o site.
4. Veja localmente abrindo `index.html` (funciona do disco, sem servidor) e então `git commit` + `git push`; o Pages publica sozinho.
5. Quando um módulo tiver release no GitHub, preencha `install.manifest` (URL https do `module.json` da release) e o botão "Copiar" aparece.

## Identidade visual (não inventar)

Kit: `H:\Arquivo Geral\D\Dados Críticos\01 Identidade Visual Dados Críticos\Kit 2026` (o guia `.md` está lá; leia só se for mexer no visual). Regras já aplicadas: tema claro `#D1F1FE`, texto `#061719`, cartões `#FBFEFF` com borda 3px escura e sombra ciano deslocada SEM desfoque, títulos Montserrat 900 em caixa alta inclinados -2,5° com contorno creme, texto corrido em Lato, títulos de seção em pílula com hexágono laranja, padrão de dados em tamanho original (reduzido fica borrado). Nunca ciano/laranja como cor de texto corrido.

## Decisões

- Sem build e sem dependências: dados em script clássico (`window.SITE`), não JSON via `fetch`, para abrir do disco.
- Caminhos sempre relativos (o site mora em `https://<usuario>.github.io/<repo>/`).
- Não publicar e-mails nem dados pessoais dos READMEs dos módulos.
- Os textos dos módulos são resumos dos READMEs; se o README mudar, atualize a entrada. Não afirme que funciona no Foundry real o que o README diz não ter sido testado (isso entra em `limits`).
- A regra `teuri-` no id vale para módulos novos; o `vdo-ninja-foundry` é anterior a ela, por isso o check aceita qualquer id em minúsculas com hífens.
