/**
 * Comando para o jogo Pato e Ganso.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

// Mapa para armazenar o estado do jogo por grupo
const jogosPG = new Map(); // <remoteJid, { participantes: [], ordem: [], pato: userJid, ganso: userJid }>

// Função para embaralhar um array (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  name: "pg",
  description: "Inicia o jogo Pato e Ganso com as pessoas marcadas.",
  commands: ["pg"],
  usage: `${PREFIX}pg @<pessoa1> @<pessoa2> ...`,
  handle: async ({ args, mentions, userJid, remoteJid, socket, sendReply, sendText }) => {
    console.log("[PG] Comando recebido!");
    console.log("[PG] args:", args);
    console.log("[PG] mentions:", mentions);
    console.log("[PG] userJid:", userJid);
    console.log("[PG] remoteJid:", remoteJid);

    if (args.length < 1 || mentions.length < 2) {
      console.log("[PG] Erro: Poucos participantes marcados.");
      await sendReply(`Uso correto: ${PREFIX}pg @<pessoa1> @<pessoa2> ... (Marque pelo menos duas pessoas para jogar).`);
      return;
    }

    if (jogosPG.has(remoteJid)) {
      console.log("[PG] Erro: Jogo já em andamento.");
      await sendReply("Já existe um jogo Pato e Ganso em andamento neste grupo.");
      return;
    }

    const participantes = [userJid, ...mentions];
    console.log("[PG] participantes:", participantes);

    if (new Set(participantes).size !== participantes.length) {
      console.log("[PG] Erro: Participantes duplicados.");
      await sendReply("Por favor, marque participantes únicos.");
      return;
    }

    const ordemSorteada = shuffleArray([...participantes]);
    console.log("[PG] ordemSorteada:", ordemSorteada);
    const gansoSorteado = ordemSorteada[Math.floor(Math.random() * ordemSorteada.length)];
    console.log("[PG] gansoSorteado:", gansoSorteado);
    const patoSorteado = participantes.find(p => p !== gansoSorteado); // Garante que pato e ganso sejam diferentes
    console.log("[PG] patoSorteado:", patoSorteado);

    if (!patoSorteado) {
      console.log("[PG] Erro: Falha ao definir o pato.");
      await sendReply("Houve um erro ao definir o pato. Tente novamente.");
      return;
    }

    jogosPG.set(remoteJid, {
      participantes: [...participantes],
      ordem: ordemSorteada,
      pato: patoSorteado,
      ganso: gansoSorteado,
    });
    console.log("[PG] Estado do jogo salvo.");

    let mensagemInicio = "🦆🦢 Jogo Pato e Ganso iniciado! 🦢🦆\n\nParticipantes:\n";
    participantes.forEach((participante, index) => {
      mensagemInicio += `@${participante.split("@")[0]}\n`;
    });

    mensagemInicio += "\nOrdem de escolha (aleatória):\n";
    ordemSorteada.forEach((jogador, index) => {
      mensagemInicio += `${index + 1}. @${jogador.split("@")[0]}\n`;
    });

    await sendReply(mensagemInicio, { mentions: participantes });
    await sendReply(`🤫 O pato e o ganso foram escolhidos secretamente. Que o jogo comece!`);

    // Mensagem fake de ban para o Ganso (enviada no privado - opcional)
    try {
      await sendText(gansoSorteado, "🚫 [AVISO FALSO DE BANIMENTO] 🚫\nVocê foi aleatoriamente escolhido como o Ganso! Prepare-se para a 'pegadinha'!");
      console.log("[PG] Mensagem fake de ban enviada para:", gansoSorteado);
    } catch (error) {
      console.error("[PG] Erro ao enviar mensagem fake de ban para o ganso:", error);
      // Lidar com erro se a mensagem privada não puder ser enviada
    }
  },
};
