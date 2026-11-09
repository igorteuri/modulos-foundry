// Single source of truth for the site. To add or update a module, edit ONLY this file
// (plus images in assets/modules/<id>/). Run `node tools/check-site.mjs` afterwards.
// Plain script (not an ES module / fetch) so index.html also works when opened from disk.
//
// status: "ready" (folder "Módulos Prontos") | "testing" | "dev" (folder "Em Desenvolvimento")
// install.manifest: manifest URL of the release; leave null until the module has a release.
// cover: optional image path ("assets/modules/<id>/cover.png"); without it a placeholder is shown.
// In any text, `backticks` render as code.

window.SITE = {
  title: "Módulos Foundry do Teuri",
  tagline: "Ferramentas para Foundry VTT feitas pelo Teuri, do Dados Críticos.",
  links: [
    // { label: "itch.io", url: "https://..." }
  ],
  modules: [
    {
      id: "teuri-table-signals",
      title: "Teuri's Table Signals",
      icon: "🙂",
      version: "0.7.0",
      status: "ready",
      foundry: "v14",
      tagline: "Os gestos da mesa presencial, na mesa online: apontar, rabiscar, levantar a mão e mais.",
      summary:
        "Tudo o que você faria ou diria numa mesa de verdade, como apontar para o mapa, pedir a vez de falar, reagir a uma piada ou avisar que foi ao banheiro. O módulo não troca nem reconfigura a interface do Foundry: acrescenta alguns botões nos controles da cena, um botão pequeno perto da hotbar e uma janela flutuante opcional, e usa a lista de jogadores, as notificações e o chat que você já tem.",
      cover: null,
      install: {
        manifest: null,
        folder: "teuri-table-signals"
      },
      features: [
        { icon: "🙂", title: "Reações e status", text: "Um botão acima da hotbar abre reações (👍 👎 ❓ 🐢 😂 👏) e status (🚻 ⌨️ 📞 🍽️). Um clique reage ou muda o seu status. A reação sobe flutuando na tela de todos, com o nome de quem enviou." },
        { icon: "👆", title: "Apontar e ping", text: "Segure `V` e uma mãozinha segue o seu mouse na tela de todos. Com ela aparecendo, o clique esquerdo é um ping. O clique direito (ou `Shift`+clique) puxa a visão de todos, se você for o Mestre, ou faz um chamado longo de \"olhe aqui\", se for jogador. Setas na borda da tela mostram para onde olhar quando o ponto está fora do que você vê." },
        { icon: "✏️", title: "Rabiscar", text: "Segure `B` e mexa o mouse para desenhar uma linha temporária que some sozinha depois de alguns segundos." },
        { icon: "✋", title: "Levantar a mão", text: "Aperte `H`. Um selo ✋N (N é a posição na fila) aparece ao lado do seu nome na lista de jogadores, e fica até você ou o Mestre baixarem, ou até o tempo de baixar automático que o Mestre configurar." },
        { icon: "📍", title: "Marcadores de mapa", text: "Uma janela \"Novo marcador\" deixa escolher o tipo (pino, bandeira, X, seta), a cor, o tamanho e uma legenda, com prévia. Depois é só clicar no mapa. Os marcadores não são tokens: ficam nos dados do usuário, então sobrevivem a recarregar a página e quem entra depois também vê. São até 12 por jogador." },
        { icon: "⏸️", title: "Pedir pausa", text: "Um aviso para a mesa, no estilo X-card, anônimo por padrão." },
        { icon: "👉", title: "Cutucar", text: "Clique com o botão direito em outro jogador na lista e escolha \"Cutucar\". Só ele recebe uma mensagem discreta e um som suave. Limite de uma vez a cada 10 segundos por pessoa." },
        { icon: "⏱️", title: "Cronômetro (Mestre)", text: "1, 2, 5, 10 ou 15 minutos, ou um tempo personalizado (\"7\", \"7,5\", \"7:30\" ou \"90s\"), com rótulo opcional. Todos veem a contagem. O Mestre pode pausar, retomar ou cancelar." },
        { icon: "🗳️", title: "Votação (Mestre)", text: "Uma pergunta e as respostas. Todos clicam em uma. O Mestre fecha a votação e vê quem votou em quê; os jogadores veem só as contagens." },
        { icon: "🪟", title: "Janela \"Na mesa\"", text: "Uma janelinha que só existe quando há algo para mostrar: o cronômetro, a votação em andamento, as mãos levantadas em ordem (Jogador (Personagem)) e quem saiu da mesa. Dá para arrastar pela barra de título." },
        { icon: "💡", title: "Destaque de interface", text: "Com `J`, você clica em qualquer parte da interface e ela pulsa na tela de todos por alguns segundos. Ótimo para ensinar onde fica cada botão." },
        { icon: "✉️", title: "Mensagem privada e título do Mestre", text: "Sussurre para pessoas escolhidas ou, de forma anônima, para o Mestre. O Mestre também pode trocar o texto dele na lista de jogadores (por exemplo \"Narrador\")." }
      ],
      tutorial: [
        { title: "Instale e ative", text: "Copie a pasta `teuri-table-signals` para `<Data>/modules/`, reinicie o servidor do Foundry se ele estava rodando e ative o módulo no seu mundo." },
        { title: "Reaja e mude o status", text: "Passe o mouse no botão 🙂 acima da hotbar (ou toque nele, em telas de toque). Clique em uma reação para ela subir flutuando na tela de todos, ou em um status para avisar que você saiu." },
        { title: "Aponte e dê ping", text: "Segure `V`: a mãozinha segue o mouse na tela de todos. Clique com o botão esquerdo para fazer um ping naquele ponto. Solte o `V` para voltar a interagir normalmente com os tokens." },
        { title: "Peça a vez de falar", text: "Aperte `H` para levantar a mão. Você entra na fila e o selo ✋N aparece ao lado do seu nome. Aperte `H` de novo, ou clique no selo, para baixar." },
        { title: "Marque um lugar no mapa", text: "Abra o botão de marcador nos controles da cena, escolha o tipo, a cor e uma legenda, confira a prévia e aperte **Criar**. Depois clique no mapa. Clique no marcador para selecioná-lo e mover, redimensionar ou editar." },
        { title: "Mestre: cronômetro e votação", text: "Cada um tem o seu botão nos controles da cena. Escolha o tempo ou escreva a pergunta, e todos acompanham pela janela \"Na mesa\"." },
        { title: "Ajuste do seu jeito", text: "Em Configurações do módulo você escolhe quem pode usar cada recurso, quanto tempo os rabiscos ficam, como as pessoas são avisadas (notificação, som, chat) e o estilo do ponteiro. Na primeira vez de cada pessoa, o módulo abre um tutorial interno." }
      ],
      shortcuts: [
        { key: "V", action: "Apontar (mãozinha) e ping" },
        { key: "B", action: "Rabiscar" },
        { key: "H", action: "Levantar ou baixar a mão" },
        { key: "J", action: "Destacar uma parte da interface" },
        { key: "Outros", action: "Cada reação, status e ferramenta tem um atalho sem tecla definida em Configurar Controles. O módulo também mantém um compêndio de macros com um macro por sinal." }
      ],
      limits: [
        "Ainda não foi verificado em um servidor Foundry real; a lista do que falta conferir está no `CLAUDE.md` do módulo.",
        "A ordem das mãos, o cronômetro e a votação usam o relógio de cada computador; diferenças grandes de relógio aparecem como alguns segundos de diferença.",
        "Quem usa um cliente modificado poderia se passar por outro jogador. Pedidos de pausa \"anônimos\" são anônimos só na interface.",
        "Ponteiro, pings e rabiscos aparecem só na cena em que quem enviou está olhando.",
        "Com a mãozinha aparecendo, os cliques no mapa viram pings e não selecionam tokens. Solte o `V` para interagir normalmente."
      ],
      changelog: [
        { version: "0.7.0", items: [
          "Janela \"Na mesa\" ligada para todos por padrão.",
          "Atalhos e macros para cada sinal, com compêndio de macros mantido pelo Mestre.",
          "Marcadores: janela com prévia, cor personalizada e seleção com moldura.",
          "Destaque de interface com `J` e mensagem privada melhorados."
        ] },
        { version: "0.6.0", items: [
          "Tutorial interno na primeira vez que cada pessoa usa o módulo.",
          "Sorteio com janela para desmarcar contas que não são jogadores.",
          "Barra de ferramentas compacta por padrão."
        ] }
      ]
    },
    {
      id: "teuri-journal-blocks",
      title: "Teuri's Journal Blocks",
      icon: "📝",
      version: "0.1.0",
      status: "dev",
      foundry: "v14",
      tagline: "Diários no estilo Notion: edite no lugar, com prévia ao vivo, e mova blocos de texto arrastando.",
      summary:
        "Os diários abrem já em modo de edição, na mesma janela, com prévia ao vivo. Um lápis no canto da página alterna entre editar e ler. As páginas novas são salvas em Markdown, então o texto continua simples se você desativar o módulo ou levá-lo para outro lugar.",
      cover: null,
      install: {
        manifest: null,
        folder: "teuri-journal-blocks"
      },
      features: [
        { icon: "✍️", title: "Edição no próprio diário", text: "Sem abrir outra janela. O lápis no canto da página alterna entre editar e ler. As mudanças são salvas sozinhas, cerca de 0,8 segundo depois que você para de digitar." },
        { icon: "↕️", title: "Mover blocos", text: "Passe o mouse sobre um bloco (parágrafo, título, lista, citação...) e arraste a alça à esquerda. `Alt`+`↑` e `Alt`+`↓` movem o bloco sob o cursor pelo teclado." },
        { icon: "➗", title: "Menu de blocos com `/`", text: "Digite `/` num parágrafo vazio para escolher texto, títulos, listas, lista de tarefas, citação, código, divisor ou bloco recolhível. Continue digitando para filtrar." },
        { icon: "☑️", title: "Lista de tarefas", text: "Digite `[] ` no começo de um item ou escolha no menu. Clique na caixa para marcar. Fica salvo como `- [ ]` e `- [x]`." },
        { icon: "📄", title: "Markdown de verdade", text: "As páginas novas usam o formato Markdown do Foundry. Os atalhos de digitação funcionam como no Notion: `## ` título, `- ` lista, `1. ` lista numerada, `> ` citação. Páginas HTML antigas continuam sendo salvas como HTML, sem conversão escondida." },
        { icon: "📚", title: "Lateral recolhida", text: "Os diários abrem com a lista de páginas à esquerda já recolhida, para sobrar mais espaço ao texto." },
        { icon: "🔎", title: "Tamanho do texto", text: "Um ajuste de 70% a 220% para o texto do diário, na leitura e na edição." }
      ],
      tutorial: [
        { title: "Instale e ative", text: "Copie a pasta `teuri-journal-blocks` para `<Data>/modules/` e ative o módulo no seu mundo." },
        { title: "Abra um diário", text: "O diário já abre em modo de edição. Se ele não tinha páginas, ganha uma primeira página em branco." },
        { title: "Escolha um bloco com `/`", text: "Num parágrafo vazio, digite `/`, filtre digitando e confirme com `Enter`. `Esc` fecha o menu." },
        { title: "Reorganize arrastando", text: "Passe o mouse sobre um bloco e arraste a alça da esquerda, ou use `Alt`+`↑` e `Alt`+`↓`." },
        { title: "Alterne entre ler e editar", text: "Use o lápis no canto superior direito da página. Ao sair da edição, tudo já foi salvo." }
      ],
      shortcuts: [
        { key: "/", action: "Abre o menu de blocos num parágrafo vazio" },
        { key: "Alt + ↑ / ↓", action: "Move o bloco sob o cursor" },
        { key: "Enter / Esc", action: "Confirma ou fecha o menu de blocos" },
        { key: "Shift + Enter", action: "Sai de um bloco de código" }
      ],
      limits: [
        "Em desenvolvimento: parte do que o módulo assume sobre o Foundry v14 ainda precisa ser conferida num servidor real.",
        "Salvar em Markdown perde o que o Markdown não consegue dizer: cores, tamanhos de fonte, alinhamento, segredos e linhas vazias. Se precisar disso, use uma página HTML.",
        "Uma lista ou tabela se move como um bloco só; os itens ainda não se movem separadamente.",
        "Durante a edição, referências como `@UUID[...]` aparecem como texto cru e só voltam a ficar bonitas na leitura."
      ],
      changelog: [
        { version: "0.1.0", items: [
          "Primeira versão: edição no lugar, blocos móveis, menu `/`, lista de tarefas e blocos recolhíveis."
        ] }
      ]
    },
    {
      id: "teuri-drawing-tools",
      title: "Teuri's Drawing Tools",
      icon: "✏️",
      version: "0.4.0",
      status: "ready",
      foundry: "v14",
      tagline: "Uma barra de desenho rápida para rabiscar no mapa: mão livre, formas e texto digitado direto na cena.",
      summary:
        "Uma barra flutuante que aparece junto com os controles de desenho e deixa esboçar no mapa sem burocracia. Ela compartilha cores, espessura, preenchimento e fonte com as ferramentas de desenho nativas do Foundry, então nada fica duplicado.",
      cover: null,
      install: { manifest: null, folder: "teuri-drawing-tools" },
      features: [
        { icon: "🧰", title: "Barra flutuante", text: "Aparece com os controles de desenho. Um botão de fixar mantém a barra visível em qualquer camada." },
        { icon: "✏️", title: "Sete ferramentas", text: "Selecionar, mão livre, linha, retângulo, elipse, polígono e texto." },
        { icon: "🔤", title: "Texto direto no mapa", text: "Digite na própria cena e veja a prévia ao vivo. `Enter` confirma, `Shift`+`Enter` cria nova linha e `Esc` cancela." },
        { icon: "🎨", title: "Mesma paleta do Foundry", text: "Cores, espessura, preenchimento e fonte são os mesmos das ferramentas de desenho nativas." },
        { icon: "📐", title: "Precisão quando precisa", text: "`Shift` restringe as formas (linha reta, quadrado, círculo) e `Alt` desliga o encaixe na grade." },
        { icon: "🌎", title: "Português e inglês", text: "A interface acompanha o idioma escolhido no Foundry." }
      ],
      tutorial: [
        { title: "Instale e ative", text: "Copie a pasta `teuri-drawing-tools` para `<Data>/modules/` e ative o módulo no seu mundo." },
        { title: "Abra os controles de desenho", text: "A barra flutuante aparece junto com eles. Use o botão de fixar se quiser a barra visível em qualquer camada." },
        { title: "Escolha a ferramenta", text: "Clique no ícone ou use a tecla de atalho. Ajuste cor, espessura e preenchimento: valem também para as ferramentas nativas." },
        { title: "Desenhe", text: "Arraste no mapa. Segure `Shift` para restringir a forma e `Alt` para ignorar a grade." },
        { title: "Escreva", text: "Escolha a ferramenta de texto, clique no mapa e digite. `Enter` confirma." }
      ],
      shortcuts: [
        { key: "V", action: "Selecionar" },
        { key: "F", action: "Mão livre" },
        { key: "L", action: "Linha" },
        { key: "R", action: "Retângulo" },
        { key: "E", action: "Elipse" },
        { key: "P", action: "Polígono" },
        { key: "T", action: "Texto" },
        { key: "Shift / Alt", action: "`Shift` restringe a forma; `Alt` desliga o encaixe na grade" }
      ],
      limits: [
        "Feito para o Foundry v14.",
        "Os desenhos são desenhos nativos do Foundry: valem as mesmas permissões e a mesma camada."
      ],
      changelog: []
    },
    {
      id: "teuri-stream-portraits",
      title: "Teuri's Stream Portraits",
      icon: "🎥",
      version: "1.3.0",
      status: "ready",
      foundry: "v14",
      tagline: "Overlay de portraits para o OBS, em tempo real, com os dados que você escolher da ficha.",
      summary:
        "Mostra os personagens (avatar, nome, HP, raça, classe, o que você quiser) num overlay com fundo transparente, atualizado na hora conforme os jogadores editam as fichas. Funciona com qualquer sistema: você escolhe, por mundo, quais dados aparecem.",
      cover: null,
      install: { manifest: null, folder: "teuri-stream-portraits" },
      features: [
        { icon: "📺", title: "Overlay para o OBS", text: "O Foundry não deixa módulos criarem páginas próprias no servidor, então o overlay roda dentro do próprio Foundry, num usuário dedicado chamado \"Portraits\". Esse usuário não vê a interface: sobram só os portraits, com fundo transparente." },
        { icon: "🧩", title: "Funciona em qualquer sistema", text: "Cada campo aponta para um dado da ficha (`name`, `system.attributes.hp.value`...), com sugestões enquanto você digita e o valor lido de um personagem de exemplo." },
        { icon: "🔍", title: "Explorar ficha", text: "Para sistemas sem preset: uma janela lista todos os dados de um personagem, com busca por valor. Digite o HP e descubra o caminho." },
        { icon: "📋", title: "Presets de sistemas", text: "D&D 5e, Pathfinder 2e, Ordem Paranormal e Mausritter testados com os dados do sistema; Shadowdark, Cosmere e Fractal RPG parcialmente conferidos; outros tentam adivinhar." },
        { icon: "❤️", title: "Barras e símbolos", text: "Mostre vida e recursos como barras ou como corações, estrelas, gotas, raios e losangos." },
        { icon: "🖼️", title: "Portraits sob medida", text: "Escolha uma imagem só para o stream, enquadre arrastando, remova o fundo automaticamente (para fundo liso) ou apague à mão, com varinha e pincéis." },
        { icon: "🪞", title: "Molduras e visual", text: "Treze molduras de avatar (ouro, prata, madeira, pedra, neon, arcano, gelo...), estilos, cores, fontes (inclusive Google Fonts) e efeitos no título." }
      ],
      tutorial: [
        { title: "Instale e ative", text: "Extraia a pasta `teuri-stream-portraits` em `<Data>/modules/`, reinicie o Foundry e ative o módulo no mundo." },
        { title: "Crie o usuário Portraits", text: "Em Configurações, Módulos, Teuri's Stream Portraits, **Configurar overlay**, aba **Stream / OBS**: clique em **Criar usuário \"Portraits\"**, depois em **Dar acesso de Observador** e em **Salvar**." },
        { title: "Adicione a fonte no OBS", text: "Crie uma fonte **Navegador** com o endereço de login do seu Foundry (`/join`), clique em **Interagir** e entre como Portraits. O OBS guarda o login." },
        { title: "Escolha personagens e campos", text: "Na aba **Personagens**, marque quem aparece. Na aba **Campos**, aplique o preset do seu sistema ou monte os campos. A prévia atualiza enquanto você edita." },
        { title: "Salve", text: "Só o botão **Salvar** aplica no overlay. Enquanto houver mudanças pendentes, o rodapé mostra \"Alterações não salvas\"." }
      ],
      shortcuts: [
        { key: "?portraits", action: "Modo avançado: qualquer sessão aberta com `?portraits` na URL vira overlay (por exemplo `/game?portraits`). Útil para dois overlays diferentes ao mesmo tempo." },
        { key: "dir, anchor, scale", action: "Parâmetros da URL: direção (`row` ou `column`), âncora (`top-left`, `bottom-center`...) e escala (`0.8`, `1.2`...)" },
        { key: "style, actors", action: "Parâmetros da URL: estilo (`glass`, `solid`, `minimal`, `cutout`) e lista de personagens" }
      ],
      limits: [
        "Foi testado com simulação (lógica, textos, remoção de fundo), mas ainda não dentro de um Foundry real. Se algo falhar ao abrir, o erro do console (F12) mostra onde.",
        "Esconder o usuário da lista de jogadores e a ordem dele na tela de login não foram confirmados num Foundry v14 real.",
        "Tokens não vinculados (cópias de NPC com dados próprios) não são acompanhados: o overlay lê o ator.",
        "Mudar o usuário do overlay exige recarregar a fonte no OBS.",
        "As imagens precisam estar hospedadas no próprio Foundry; imagens de outros sites são bloqueadas pelo navegador."
      ],
      changelog: []
    },
    {
      id: "vdo-ninja-foundry",
      title: "VDO.Ninja Video Hub",
      icon: "📹",
      version: "2.5.0",
      status: "dev",
      foundry: "v13 a v14",
      tagline: "Vídeo e áudio da mesa pelo VDO.Ninja, dentro da barra de câmeras do próprio Foundry, com links prontos para o OBS.",
      summary:
        "Um cliente de A/V nativo: as câmeras aparecem na barra de câmeras do Foundry (silenciar, ocultar vídeo, push-to-talk, escolha de dispositivos) e o transporte de mídia usa o VDO.Ninja, por WebRTC ponto a ponto. O Mestre copia os links do OBS direto na janela Configurar A/V.",
      cover: null,
      install: { manifest: null, folder: "vdo-ninja-foundry" },
      features: [
        { icon: "🎥", title: "Câmeras na barra nativa", text: "Usa o AVClient do Foundry, então mutar, ocultar vídeo, push-to-talk e a escolha de câmera e microfone funcionam como já funcionam." },
        { icon: "🎚️", title: "Qualidade em dois níveis", text: "Câmeras dentro do Foundry em 360p e links do OBS em qualidade maior. A câmera é capturada uma vez e cada conexão recebe a qualidade certa, o que poupa o envio de cada jogador." },
        { icon: "🔗", title: "Links do OBS", text: "Por jogador, o link para ver no OBS e o de transmissão, com ID editável, mais sala inteira, Diretor e convidado externo." },
        { icon: "📶", title: "Estabilidade", text: "Reconexão automática, recuperação de vídeo travado, indicador de sinal de três barrinhas em cada câmera e suporte a servidor TURN para redes difíceis." },
        { icon: "⚙️", title: "Qualidade automática", text: "A qualidade desce só para a conexão ruim e sobe de volta quando melhora. No pior caso, só áudio, com a imagem do personagem no lugar do vídeo." },
        { icon: "📊", title: "Painel de conexões (Mestre)", text: "Um quadro por jogador, em verde, amarelo ou vermelho, com histórico das últimas horas e um relatório para copiar." },
        { icon: "🧙", title: "Retrato quando a câmera está desligada", text: "O tile sem câmera mostra o retrato do personagem do usuário, em vez da imagem padrão do Foundry." },
        { icon: "🧪", title: "Modo Meshcast (experimental)", text: "Opção para cada jogador enviar um único stream a um servidor, em vez de vídeo para cada colega. Exige HTTPS e tem limitações, listadas abaixo." }
      ],
      tutorial: [
        { title: "Instale e ative", text: "Copie a pasta `vdo-ninja-foundry` para `<Data>/modules/`, reinicie o Foundry e ative o módulo no mundo." },
        { title: "Ligue o vídeo", text: "Em Configurações, Configurar A/V, escolha **Áudio/Vídeo** em **Modo de A/V**. Salve e recarregue a página." },
        { title: "Ajuste o VDO.Ninja (Mestre)", text: "Na mesma janela, a seção VDO.Ninja tem a configuração geral (senha, sala, qualidade, rede) e os **Links do OBS**." },
        { title: "Coloque no OBS", text: "Copie o link de cada jogador (ou o da sala inteira) para uma fonte de Navegador do OBS. 640×360 já basta." },
        { title: "Se algo não conectar", text: "Cada pessoa abre **Diagnóstico**, copia o relatório (sem senha nem credenciais) e cola no chat." }
      ],
      shortcuts: [],
      limits: [
        "Em desenvolvimento. O navegador só libera câmera e microfone em HTTPS ou em `localhost`. Com o Foundry em HTTP na rede local, cada jogador precisa liberar a origem no navegador ou o servidor precisa ter HTTPS.",
        "Todos os jogadores precisam estar em contexto seguro para se verem dentro do Foundry.",
        "O SDK do VDO.Ninja é carregado de um CDN por padrão; dá para hospedar o arquivo e trocar a URL.",
        "No modo Meshcast, a qualidade automática, o modo só áudio e o relatório de conexões não se aplicam, a latência é maior e os servidores gratuitos podem ficar lentos em horário de pico.",
        "A senha vai embutida nos links; use-a para evitar que estranhos assistam."
      ],
      changelog: [
        { version: "2.5.0", items: ["Modo Meshcast experimental, via página do VDO.Ninja."] },
        { version: "2.4.0", items: [
          "Qualidade automática por conexão e modo só áudio.",
          "Painel de conexões dos jogadores para o Mestre.",
          "Links do OBS mais leves por padrão (540p, 30 fps)."
        ] },
        { version: "2.3.0", items: ["Retrato do personagem quando a câmera está desligada."] }
      ]
    }
  ]
};
