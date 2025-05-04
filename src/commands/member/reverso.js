/**
 * Comando para inverter o texto fornecido pelo usuário.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "reverso",
  description: "Inverte o texto fornecido pelo usuário.",
  commands: ["reverso", "rev"],
  usage: `${PREFIX}reverso <texto>`,
  handle: async ({ args, sendReply }) => {
    if (!args.length) {
      await sendReply(`Uso correto: ${PREFIX}reverso <texto a ser invertido>. Exemplo: ${PREFIX}reverso Olá Mundo!`);
      return;
    }

    const textoOriginal = args.join(" ");
    const textoRevertido = textoOriginal.split("").reverse().join("");

    await sendReply(`🔄 Texto invertido:\n${textoRevertido}`);
  },
};
