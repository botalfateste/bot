/**
 * Comando para exibir o menu de comandos de dono (modo simples).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "menudono",
  description: "Exibe o menu de comandos de dono (modo simples).",
  commands: ["menudono", "dono"],
  usage: `${PREFIX}menudono`,
  handle: async ({ sendReply }) => {
    const menuDonoSimples = `👑 Menu de Comandos de Dono 👑

▢ • ${PREFIX}off
▢ • ${PREFIX}on
`;

    await sendReply(menuDonoSimples);
  },
};
