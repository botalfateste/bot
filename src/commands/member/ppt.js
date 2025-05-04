/**
 * Jogo de Pedra, Papel e Tesoura (PPT) com chance de vitória do bot de 90%.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

const opcoesPPT = ["pedra", "papel", "tesoura"];
const emojiControle = "✊"; // Emoji para comentar as mensagens

function determinarVencedor(escolhaUsuario, escolhaBot) {
  if (escolhaUsuario === escolhaBot) {
    return "Empate";
  } else if (
    (escolhaUsuario === "pedra" && escolhaBot === "tesoura") ||
    (escolhaUsuario === "papel" && escolhaBot === "pedra") ||
    (escolhaUsuario === "tesoura" && escolhaBot === "papel")
  ) {
    return "Você";
  } else {
    return "Bot";
  }
}

module.exports = {
  name: "ppt",
  description: "Joga Pedra, Papel e Tesoura contra o bot (bot ganha 90% das vezes).",
  commands: ["ppt"],
  usage: `${PREFIX}ppt <pedra|papel|tesoura>`,
  handle: async ({ args, userJid, remoteJid, commandName, sendReply, socket, message }) => {
    if (commandName === "ppt") {
      if (!args[0]) {
        await sendReply(`Uso correto: ${PREFIX}ppt <pedra|papel|tesoura>`);
        return;
      }

      const escolhaUsuario = args[0].toLowerCase();

      if (!opcoesPPT.includes(escolhaUsuario)) {
        await sendReply(`Opção inválida. Escolha entre: pedra, papel ou tesoura.`);
        return;
      }

      // Lógica para o bot ganhar 90% das vezes
      let escolhaBot;
      if (Math.random() < 0.9) {
        // Bot tenta escolher uma opção que ganhe
        if (escolhaUsuario === "pedra") {
          escolhaBot = "papel";
        } else if (escolhaUsuario === "papel") {
          escolhaBot = "tesoura";
        } else { // escolhaUsuario === "tesoura"
          escolhaBot = "pedra";
        }
      } else {
        // 10% de chance do bot escolher aleatoriamente
        escolhaBot = opcoesPPT[Math.floor(Math.random() * opcoesPPT.length)];
      }

      const resultado = determinarVencedor(escolhaUsuario, escolhaBot);

      let mensagem = `Você escolheu: ${escolhaUsuario}\n`;
      mensagem += `Bot escolheu: ${escolhaBot}\n\n`;

      if (resultado === "Você") {
        mensagem += "🎉 Você ganhou!";
      } else if (resultado === "Bot") {
        mensagem += "🤖 Eu ganhei! 😉";
      } else {
        mensagem += "🤝 Empate!";
      }

      await sendReply(mensagem);

      // Comenta a mensagem do usuário com o emoji de controle
      try {
        await socket.sendMessage(remoteJid, { react: { text: emojiControle, key: message.key } });
      } catch (error) {
        console.error("Erro ao comentar mensagem do PPT:", error);
      }
    }
  },
};
