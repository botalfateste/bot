/**
 * Comando (apenas para administradores) para listar todos os usuários do grupo.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "usuarios",
  description: "Lista todos os usuários do grupo (requer admin).",
  commands: ["usuarios", "listar"],
  usage: `${PREFIX}usuarios`,
  handle: async ({ userJid, remoteJid, socket, sendReply }) => {
    if (!remoteJid.endsWith("@g.us")) {
      await sendReply("Este comando só pode ser usado em grupos.");
      return;
    }

    const isAdmin = async (participantId) => {
      try {
        const grupoMetadata = await socket.groupMetadata(remoteJid);
        const participant = grupoMetadata?.participants?.find(p => p.id === participantId);
        return participant?.admin === "admin" || participant?.admin === "superadmin";
      } catch (error) {
        console.error("Erro ao obter metadados do grupo:", error);
        return false;
      }
    };

    if (!await isAdmin(userJid)) {
      await sendReply("🔒 Apenas administradores podem usar este comando.");
      return;
    }

    try {
      const grupoMetadata = await socket.groupMetadata(remoteJid);
      const participantes = grupoMetadata?.participants;

      if (!participantes || participantes.length === 0) {
        await sendReply("Não há participantes neste grupo.");
        return;
      }

      let listaUsuarios = "👥 Lista de Usuários do Grupo:\n\n";
      for (const participante of participantes) {
        const numero = participante.id.split("@")[0];
        const adminStatus = participante.admin ? ` (Admin: ${participante.admin})` : "";
        listaUsuarios += `- ${numero}${adminStatus}\n`;
      }

      await sendReply(listaUsuarios);

    } catch (error) {
      console.error("Erro ao obter a lista de usuários:", error);
      await sendReply("⚠️ Ocorreu um erro ao tentar obter a lista de usuários.");
    }
  },
};
