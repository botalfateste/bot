/**
 * Comando para um jogo de Truco simplificado (apenas a primeira rodada).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

// Define as cartas do baralho (simplificado para este exemplo)
const naipes = ["ouros", "copas", "espadas", "paus"];
const valores = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];

function criarBaralho() {
  const baralho = [];
  for (const naipe of naipes) {
    for (const valor of valores) {
      baralho.push({ valor, naipe });
    }
  }
  return baralho;
}

function distribuirCartas(baralho, quantidade = 3) {
  const cartas = [];
  for (let i = 0; i < quantidade; i++) {
    const indice = Math.floor(Math.random() * baralho.length);
    cartas.push(baralho.splice(indice, 1)[0]);
  }
  return cartas;
}

function valorCarta(carta) {
  const ordem = ["4", "5", "6", "7", "Q", "J", "K", "A", "2", "3"];
  return ordem.indexOf(carta.valor);
}

function determinarVencedor(cartaUsuario, cartaBot) {
  const valorUsuario = valorCarta(cartaUsuario);
  const valorBot = valorCarta(cartaBot);

  if (valorUsuario > valorBot) {
    return "Você";
  } else if (valorBot > valorUsuario) {
    return "Bot";
  } else {
    return "Empate";
  }
}

module.exports = {
  name: "truco",
  description: "Jogue uma rodada de Truco simplificado contra o bot.",
  commands: ["truco"],
  usage: `${PREFIX}truco`,
  handle: async ({ userJid, remoteJid, sendReply }) => {
    const chanceGanharUsuario = 0.25;

    const baralho = criarBaralho();
    const cartasUsuario = distribuirCartas(baralho);
    const cartasBot = distribuirCartas(baralho);

    let resultado = `🃏 Suas cartas: ${cartasUsuario.map(c => `${c.valor} de ${c.naipe}`).join(", ")}\n`;
    resultado += `🤖 Cartas do bot: (escondidas)\n\n`;

    // Simula a jogada da primeira carta
    const cartaUsuarioJogada = cartasUsuario[Math.floor(Math.random() * cartasUsuario.length)];
    const indiceUsuarioJogada = cartasUsuario.indexOf(cartaUsuarioJogada);
    cartasUsuario.splice(indiceUsuarioJogada, 1);

    let cartaBotJogada;
    if (Math.random() < chanceGanharUsuario) {
      // 25% de chance do usuário ganhar (bot joga uma carta aleatória)
      cartaBotJogada = cartasBot[Math.floor(Math.random() * cartasBot.length)];
    } else {
      // 75% de chance do bot ter carta melhor
      let melhorCartaBot = null;
      for (const carta of cartasBot) {
        if (melhorCartaBot === null || valorCarta(carta) > valorCarta(cartaUsuarioJogada)) {
          melhorCartaBot = carta;
        }
      }
      cartaBotJogada = melhorCartaBot || cartasBot[Math.floor(Math.random() * cartasBot.length)];
    }
    const indiceBotJogada = cartasBot.indexOf(cartaBotJogada);
    cartasBot.splice(indiceBotJogada, 1);

    const vencedorRodada = determinarVencedor(cartaUsuarioJogada, cartaBotJogada);

    resultado += `🫵 Você jogou: ${cartaUsuarioJogada.valor} de ${cartaUsuarioJogada.naipe}\n`;
    resultado += `🤖 Bot jogou: ${cartaBotJogada.valor} de ${cartaBotJogada.naipe}\n\n`;

    if (vencedorRodada === "Você") {
      resultado += `🏆 Você venceu esta rodada! (Chance de 25%)\n`;
    } else if (vencedorRodada === "Bot") {
      resultado += `🤖 O bot venceu esta rodada. (Chance de 75%)\n`;
    } else {
      resultado += `🤝 Empate!\n`;
    }

    await sendReply(resultado);
  },
};
