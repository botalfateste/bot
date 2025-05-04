/**
 * Comando para sortear aleatoriamente uma pessoa do grupo e marcá-la (comando "anateste").
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "anateste",
  description: "Sorteia aleatoriamente uma pessoa do grupo e a marca (comando 'anateste').",
  commands: ["anateste"],
  usage: `${PREFIX}anateste`,
  handle: async ({ socket, remoteJid, sendText }) => {
    try {
      const grupoInfo = await socket.groupMetadata(remoteJid);
      const participantes = grupoInfo.participants.map(p => p.id);

      if (participantes.length === 0) {
        await sendText("Não há participantes neste grupo para sortear.");
        return;
      }

      const indiceSorteado = Math.floor(Math.random() * participantes.length);
      const membroSorteadoId = participantes[indiceSorteado];

      await sendText(`👤 A pessoa escolhida foi: ${membroSorteadoId.split("@")[0]}`, [membroSorteadoId]);
    } catch (error) {
      console.error("Erro ao sortear pessoa (anateste):", error);
      await sendText("Ocorreu um erro ao tentar sortear uma pessoa (anateste).");
    }
  },
};
