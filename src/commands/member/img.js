/**
 * Comando (apenas para administradores) para obter e enviar a imagem de perfil de um usuário marcado.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "imgperfil",
  description: "Obtém e envia a imagem de perfil de um usuário marcado (requer admin).",
  commands: ["img", "perfil"],
  usage: `${PREFIX}img @<usuário>`,
  handle: async ({ args, mentions, userJid, remoteJid, socket, sendReply }) => {
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

    if (!mentions || mentions.length !== 1) {
      await sendReply(`Uso correto: ${PREFIX}img @<usuário> (marque apenas um usuário).`);
      return;
    }

    const usuarioAlvo = mentions[0];

    try {
      const buffer = await socket.profilePictureUrl(usuarioAlvo, 'image');
      if (buffer) {
        await socket.sendMessage(
          remoteJid,
          { image: { url: buffer }, caption: `🖼️ Imagem de perfil de @${usuarioAlvo.split('@')[0]}` },
          { quoted: message } // Opcional: responder à mensagem do comando
        );
      } else {
        await sendReply("⚠️ Não foi possível obter a imagem de perfil deste usuário ou ele não possui uma.");
      }
    } catch (error) {
      console.error("Erro ao obter a imagem de perfil:", error);
      await sendReply("⚠️ Ocorreu um erro ao tentar obter a imagem de perfil.");
    }
  },
};
