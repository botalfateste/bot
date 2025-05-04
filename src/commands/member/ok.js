/**
 * Comando para o bot comentar a mensagem do usuário com um emoji de confere (✅).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "ok",
  description: "Faz o bot comentar a mensagem com um emoji de confere.",
  commands: ["ok"],
  usage: `${PREFIX}ok`,
  handle: async ({ remoteJid, socket, message }) => {
    const emojiConfere = "✅";

    try {
      await socket.sendMessage(
        remoteJid,
        { react: { text: emojiConfere, key: message.key } }
      );
    } catch (error) {
      console.error("Erro ao comentar a mensagem com ✅:", error);
    }
  },
};
