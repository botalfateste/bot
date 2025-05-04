/**
 * Comando para sortear aleatoriamente uma pessoa do grupo e marcá-la (comando simplificado).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "pessoa",
  description: "Sorteia aleatoriamente uma pessoa do grupo e a marca (comando simplificado).",
  commands: ["pessoa"],
  usage: `${PREFIX}pessoa`,
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

      await sendText(`👤 A pessoa escolhida foi: /n \n @${membroSorteadoId.split("@")[0]}`, [membroSorteadoId]);
    } catch (error) {
      console.error("Erro ao sortear pessoa:", error);
      await sendText("Ocorreu um erro ao tentar sortear uma pessoa.");
    }
  },
};
