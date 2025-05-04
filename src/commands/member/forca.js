/**
 * Comando de Jogo da Forca.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

const palavrasPossiveis = [
  "CHOCOLATE",
  "FEIJOADA",
  "PIZZA",
  "MACARRONADA",
  "BISCOITO",
  "TEMPERO",
  "SALGADO",
  "CARBONARA",
  "CHURRASCO",
  "PANQUECA",
  "ABACAXI",
  "MORANGO",
  "CACHORROQUENTE",
  "LASANHA",
  "HAMBURGUER",
  "SOPADELEGUMES",
  "FRANGOASSADO",
  "ESCONDIDINHO",
  "STROGONOFF",
  "MOUSSEMARACUJA",
  "BRIGADEIRO",
  "COXINHA",
  "PASTEL",
  "TORTADEFRANGO",
  "BOLODEFUBA",
  "RISOTODECOGUMELOS",
  "PICANHA",
  "FEIJAOTROPEIRO",
  "ESPETINHO",
  "CANJICA",
  "ACAI",
  "TAPIOCA",
  "CUSCUZ",
  "VATAPA",
  "PAMONHA",
  "BOLINHODECHUVA",
  "CALABRESA",
  "FAROFA",
  "QUIBE",
  "ROMEUEJULIETA"
];


// Mapa para armazenar o estado do jogo para cada grupo
const jogosForcaPorGrupo = new Map();

// Função para escolher uma palavra aleatória
function escolherPalavra() {
  return palavrasPossiveis[Math.floor(Math.random() * palavrasPossiveis.length)].toUpperCase();
}

// Função para criar a representação da palavra com letras escondidas
function criarPalavraEscondida(palavra, letrasAcertadas) {
  return palavra
    .split("")
    .map(letra => (letrasAcertadas.includes(letra) ? letra : "_"))
    .join(" ");
}

// Função para atualizar o contador de vidas
function atualizarVidas(vidasRestantes) {
  return "V: " + "|".repeat(Math.max(0, vidasRestantes));
}

module.exports = {
  name: "forca",
  description: "Inicia ou joga uma rodada do jogo da forca (separado por grupo).",
  commands: ["forca"],
  usage: `${PREFIX}forca <letra>`,
  handle: async ({ args, userJid, remoteJid, sendReply }) => {
    const letraEscolhida = args[0] ? args[0].toUpperCase() : "";

    if (!jogosForcaPorGrupo.has(remoteJid)) {
      if (!letraEscolhida) {
        const palavraSecreta = escolherPalavra();
        const estadoInicial = {
          palavra: palavraSecreta,
          letrasAcertadas: [],
          letrasErradas: [],
          vidas: 5,
        };
        jogosForcaPorGrupo.set(remoteJid, estadoInicial);
        await sendReply(
          `Jogo da forca iniciado!\nPalavra: ${criarPalavraEscondida(
            palavraSecreta,
            []
          )}\n${atualizarVidas(5)}\nTente adivinhar uma letra usando: ${PREFIX}forca <letra>`
        );
        return;
      } else {
        await sendReply(
          `Nenhum jogo em andamento neste grupo. Para começar, envie: ${PREFIX}forca`
        );
        return;
      }
    }

    const estadoJogo = jogosForcaPorGrupo.get(remoteJid);
    const { palavra, letrasAcertadas, letrasErradas, vidas } = estadoJogo;

    if (!letraEscolhida || letraEscolhida.length !== 1 || !/^[A-Z]$/.test(letraEscolhida)) {
      await sendReply(
        `Jogo em andamento:\nPalavra: ${criarPalavraEscondida(
          palavra,
          letrasAcertadas
        )}\nLetras erradas: ${letrasErradas.join(", ")}\n${atualizarVidas(
          vidas
        )}\nDigite uma única letra válida para tentar.`
      );
      return;
    }

    if (letrasAcertadas.includes(letraEscolhida) || letrasErradas.includes(letraEscolhida)) {
      await sendReply("Você já tentou essa letra. Tente outra.");
      return;
    }

    if (palavra.includes(letraEscolhida)) {
      letrasAcertadas.push(letraEscolhida);
      estadoJogo.letrasAcertadas = letrasAcertadas;
      jogosForcaPorGrupo.set(remoteJid, estadoJogo);

      const palavraAtualizada = criarPalavraEscondida(palavra, letrasAcertadas);
      await sendReply(
        `Você acertou a letra!\nPalavra: ${palavraAtualizada}\nLetras erradas: ${letrasErradas.join(", ")}\n${atualizarVidas(
          vidas
        )}`
      );

      if (!palavraAtualizada.includes("_")) {
        await sendReply(`Parabéns! Você ganhou! A palavra era: ${palavra}`);
        jogosForcaPorGrupo.delete(remoteJid); // Reseta o jogo ao ganhar
      }
    } else {
      estadoJogo.vidas--;
      letrasErradas.push(letraEscolhida);
      estadoJogo.letrasErradas = letrasErradas;
      jogosForcaPorGrupo.set(remoteJid, estadoJogo);

      await sendReply(
        `Você errou!\nPalavra: ${criarPalavraEscondida(
          palavra,
          letrasAcertadas
        )}\nLetras erradas: ${letrasErradas.join(", ")}\n${atualizarVidas(
          estadoJogo.vidas
        )}`
      );

      if (estadoJogo.vidas === 0) {
        await sendReply(`Você perdeu! A palavra era: ${palavra}`);
        jogosForcaPorGrupo.delete(remoteJid); // Reseta o jogo ao perder
      }
    }
  },
};
