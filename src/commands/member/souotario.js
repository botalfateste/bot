/**
 * Comando para responder à pergunta "sou otário?".
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "souotario",
  description: "Responde à pergunta 'sou otário?' com 99% de chance de 'sim' e 1% 'não'.",
  commands: ["souotario", "otario"],
  usage: `${PREFIX}souotario`,
  handle: async ({ sendReply }) => {
    const chanceDeNao = 0.01; // 1% de chance de "não"

    if (Math.random() < chanceDeNao) {
      await sendReply("Não.");
    } else {
      await sendReply("Sim.");
    }
  },
};
