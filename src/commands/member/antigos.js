/**
 * Comando para mostrar o ranking dos membros mais antigos do grupo.
 *
 * Observação: Este comando depende da disponibilidade da data de entrada
 * dos membros nas informações do grupo fornecidas pela sua biblioteca (Baileys).
 * Nem sempre essa informação está disponível ou é precisa.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "antigos",
  description: "Mostra um ranking dos membros mais antigos do grupo.",
  commands: ["antigos", "old"],
  usage: `${PREFIX}antigos`,
  handle: async ({ socket, remoteJid, sendReply }) => {
    try {
      const grupoMetadata = await socket.groupMetadata(remoteJid);
      const participantes = grupoMetadata?.participants;

      if (!participantes || participantes.length === 0) {
        await sendReply("Não há participantes neste grupo.");
        return;
      }

      // Filtrar participantes que têm a propriedade 'joinedAt'
      const membrosComData = participantes.filter(p => p.joinedAt);

      if (membrosComData.length === 0) {
        await sendReply("Não foi possível obter a data de entrada dos membros.");
        return;
      }

      // Ordenar os membros por data de entrada (mais antigos primeiro)
      membrosComData.sort((a, b) => a.joinedAt - b.joinedAt);

      let rank = "🏆 Ranking dos Membros Mais Antigos 🏆\n\n";
      for (let i = 0; i < membrosComData.length; i++) {
        const membro = membrosComData[i];
        const dataEntrada = new Date(membro.joinedAt * 1000).toLocaleDateString(); // Converter para data local
        rank += `${i + 1}. @${membro.id.split("@")[0]} - Entrou em: ${dataEntrada}\n`;
      }

      await sendReply(rank, { mentions: membrosComData.map(m => m.id) });

    } catch (error) {
      console.error("Erro ao obter ranking de membros antigos:", error);
      await sendReply("Ocorreu um erro ao tentar obter o ranking dos membros mais antigos.");
    }
  },
};
