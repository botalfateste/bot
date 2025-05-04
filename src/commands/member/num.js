/**
 * Jogo de Adivinhar o Número.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

const jogosNumero = new Map(); // Map<remoteJid, { numeroSecreto: number, tentativas: number }>
const emojiControle = "🎮";

function gerarNumeroAleatorio(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  name: "numero",
  description: "Jogo de adivinhar um número secreto.",
  commands: ["num"],
  usage: `${PREFIX}num [número]`,
  handle: async ({ args, userJid, remoteJid, commandName, sendReply, socket }) => {
    if (commandName === "num") {
      if (!args.length) {
        if (jogosNumero.has(remoteJid)) {
          const jogoAtual = jogosNumero.get(remoteJid);
          await sendReply(`${emojiControle} Jogo em andamento. Tente adivinhar o número! Use: ${PREFIX}num <seu número>`);
        } else {
          const numeroSecreto = gerarNumeroAleatorio();
          jogosNumero.set(remoteJid, { numeroSecreto, tentativas: 0 });
          await sendReply(`${emojiControle} Novo jogo iniciado! Tente adivinhar um número entre 1 e 100. Use: ${PREFIX}num <seu número>`);
        }
        return;
      }

      const palpite = parseInt(args[0]);

      if (isNaN(palpite)) {
        await sendReply(`${emojiControle} Por favor, digite um número válido.`);
        return;
      }

      if (!jogosNumero.has(remoteJid)) {
        await sendReply(`${emojiControle} Nenhum jogo em andamento. Use ${PREFIX}num para começar um novo.`);
        return;
      }

      const jogoAtual = jogosNumero.get(remoteJid);
      jogoAtual.tentativas++;

      if (palpite === jogoAtual.numeroSecreto) {
        await sendReply(`${emojiControle} 🎉 Parabéns! Você acertou em ${jogoAtual.tentativas} tentativas! O número era: ${jogoAtual.numeroSecreto}`);
        jogosNumero.delete(remoteJid);
      } else if (palpite < jogoAtual.numeroSecreto) {
        await sendReply(`${emojiControle} ⬆️ O número secreto é MAIOR que ${palpite}.`);
      } else {
        await sendReply(`${emojiControle} ⬇️ O número secreto é MENOR que ${palpite}.`);
      }

      // Comenta a mensagem do jogo com o emoji de controle
      try {
        await socket.sendMessage(remoteJid, { react: { text: emojiControle, key: message.key } });
      } catch (error) {
        console.error("Erro ao comentar mensagem do jogo:", error);
      }
    }
  },
};
