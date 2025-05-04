/**
 * Comando para responder à pergunta "posso dormir?".
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "possodormir",
  description: "Responde à pergunta 'posso dormir?' com 99% de chance de 'não' e 1% 'sim'.",
  commands: ["possodormir", "dormir"],
  usage: `${PREFIX}possodormir`,
  handle: async ({ sendReply }) => {
    const chanceDeSim = 0.01; // 1% de chance de "sim"

    if (Math.random() < chanceDeSim) {
      await sendReply("Sim, pode ir.");
    } else {
      await sendReply("Não, ainda não.");
    }
  },
};
