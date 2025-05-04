/**
 * Comando para simular o lançamento de uma moeda (cara ou coroa).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "moeda",
  description: "Simula o lançamento de uma moeda, retornando cara ou coroa.",
  commands: ["moeda"],
  usage: `${PREFIX}moeda`,
  handle: async ({ sendReply }) => {
    const resultado = Math.random() < 0.5 ? "Cara" : "Coroa";
    await sendReply(`🪙 A moeda caiu em: ${resultado}`);
  },
};
