/**
 * Comando de Jogo da Velha contra o bot (o bot nunca perde).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

// Mapa para armazenar o estado do jogo para cada usuário
const jogosEmAndamento = new Map();

// Função para inicializar um novo jogo da velha
function criarNovoJogo() {
  return [" ", " ", " ", " ", " ", " ", " ", " ", " "];
}

// Função para exibir o tabuleiro do jogo da velha
function exibirTabuleiro(tabuleiro) {
  return `
${tabuleiro[0]} | ${tabuleiro[1]} | ${tabuleiro[2]}
--+---+--
${tabuleiro[3]} | ${tabuleiro[4]} | ${tabuleiro[5]}
--+---+--
${tabuleiro[6]} | ${tabuleiro[7]} | ${tabuleiro[8]}
`;
}

// Função para verificar se alguém ganhou
function verificarVitoria(tabuleiro, jogador) {
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6],             // Diagonais
  ];

  return linhas.some(linha =>
    linha.every(i => tabuleiro[i] === jogador)
  );
}

// Função para verificar se o tabuleiro está cheio (velha)
function verificarVelha(tabuleiro) {
  return tabuleiro.every(casa => casa !== " ");
}

// Função para o bot fazer sua jogada de forma inteligente (nunca perder)
function jogadaDoBot(tabuleiro) {
  // 1. Verificar se o bot pode ganhar na próxima jogada
  for (let i = 0; i < 9; i++) {
    if (tabuleiro[i] === " ") {
      const tempTabuleiro = [...tabuleiro];
      tempTabuleiro[i] = "O";
      if (verificarVitoria(tempTabuleiro, "O")) {
        return i;
      }
    }
  }

  // 2. Verificar se o jogador pode ganhar na próxima jogada e bloquear
  for (let i = 0; i < 9; i++) {
    if (tabuleiro[i] === " ") {
      const tempTabuleiro = [...tabuleiro];
      tempTabuleiro[i] = "X";
      if (verificarVitoria(tempTabuleiro, "X")) {
        return i;
      }
    }
  }

  // 3. Tentar pegar o centro se estiver livre
  if (tabuleiro[4] === " ") {
    return 4;
  }

  // 4. Tentar pegar um dos cantos se estiverem livres
  const cantosLivres = [0, 2, 6, 8].filter(i => tabuleiro[i] === " ");
  if (cantosLivres.length > 0) {
    return cantosLivres[Math.floor(Math.random() * cantosLivres.length)];
  }

  // 5. Se não houver movimentos estratégicos, pegar qualquer casa livre
  const casasLivres = tabuleiro.reduce((acc, casa, index) => {
    if (casa === " ") {
      acc.push(index);
    }
    return acc;
  }, []);
  return casasLivres[Math.floor(Math.random() * casasLivres.length)];
}

module.exports = {
  name: "velha",
  description: "Inicia ou joga uma rodada de Jogo da Velha contra o bot.",
  commands: ["velha"],
  usage: `${PREFIX}velha <posição (1-9)>`,
  handle: async ({ args, userJid, sendReply }) => {
    const posicao = parseInt(args[0]);

    if (!jogosEmAndamento.has(userJid)) {
      if (!posicao || posicao < 1 || posicao > 9) {
        await sendReply(`Para começar um novo jogo da velha, use: ${PREFIX}velha <posição de 1 a 9 para colocar o X>`);
        return;
      }

      const novoJogo = criarNovoJogo();
      if (novoJogo[posicao - 1] !== " ") {
        await sendReply("Essa posição já está ocupada. Tente outra.");
        return;
      }
      novoJogo[posicao - 1] = "X";

      // Jogada do bot para o primeiro lance (evitar perder)
      let jogadaBotInicial;
      if (novoJogo[4] === " ") {
        jogadaBotInicial = 4;
      } else {
        const cantos = [0, 2, 6, 8].filter(i => novoJogo[i] === " ");
        jogadaBotInicial = cantos[Math.floor(Math.random() * cantos.length)];
      }
      if (jogadaBotInicial !== undefined) {
        novoJogo[jogadaBotInicial] = "O";
      }

      jogosEmAndamento.set(userJid, novoJogo);
      await sendReply(`Tabuleiro atual:\n${exibirTabuleiro(novoJogo)}Sua vez! Use ${PREFIX}velha <posição> para jogar.`);
      return;
    }

    const tabuleiroAtual = jogosEmAndamento.get(userJid);

    if (!posicao || posicao < 1 || posicao > 9) {
      await sendReply(`Tabuleiro atual:\n${exibirTabuleiro(tabuleiroAtual)}Sua vez! Use ${PREFIX}velha <posição de 1 a 9 para colocar o X>.`);
      return;
    }

    if (tabuleiroAtual[posicao - 1] !== " ") {
      await sendReply("Essa posição já está ocupada. Escolha outra casa.");
      return;
    }

    tabuleiroAtual[posicao - 1] = "X";

    if (verificarVitoria(tabuleiroAtual, "X")) {
      await sendReply(`Tabuleiro final:\n${exibirTabuleiro(tabuleiroAtual)}\nVocê ganhou! Parabéns!`);
      jogosEmAndamento.delete(userJid);
      return;
    }

    if (verificarVelha(tabuleiroAtual)) {
      await sendReply(`Tabuleiro final:\n${exibirTabuleiro(tabuleiroAtual)}\nDeu velha!`);
      jogosEmAndamento.delete(userJid);
      return;
    }

    const posicaoBot = jogadaDoBot(tabuleiroAtual);
    tabuleiroAtual[posicaoBot] = "O";

    if (verificarVitoria(tabuleiroAtual, "O")) {
      await sendReply(`Tabuleiro final:\n${exibirTabuleiro(tabuleiroAtual)}\nEu ganhei! 😉`);
      jogosEmAndamento.delete(userJid);
      return;
    }

    if (verificarVelha(tabuleiroAtual)) {
      await sendReply(`Tabuleiro final:\n${exibirTabuleiro(tabuleiroAtual)}\nDeu velha!`);
      jogosEmAndamento.delete(userJid);
      return;
    }

    await sendReply(`Tabuleiro atual:\n${exibirTabuleiro(tabuleiroAtual)}Sua vez! Use ${PREFIX}velha <posição> para jogar.`);
  },
};
