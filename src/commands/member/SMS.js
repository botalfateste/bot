/**
 * Comando para analisar o histórico de mensagens do grupo e mostrar a contagem
 * de mensagens enviadas por cada pessoa.
 *
 * Observação: Este comando pode ser intensivo em recursos, especialmente em
 * grupos grandes com muito histórico. A disponibilidade e o método para acessar
 * o histórico de mensagens podem depender das funcionalidades da sua biblioteca
 * Baileys e das permissões do bot no grupo.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "sms",
  description: "Analisa o histórico de mensagens do grupo e mostra a contagem por usuário.",
  commands: ["sms", "histórico"],
  usage: `${PREFIX}sms`,
  handle: async ({ socket, remoteJid, sendReply }) => {
    if (!remoteJid.endsWith("@g.us")) {
      await sendReply("Este comando só pode ser usado em grupos.");
      return;
    }

    await sendReply("⏳ Analisando o histórico de mensagens do grupo. Isso pode levar um tempo...");

    try {
      const mensagens = await socket.loadMessages(remoteJid, 9999999); // Tenta carregar o máximo de mensagens possível
      const contagemMensagens = new Map();

      for (const msg of mensagens) {
        const senderJid = msg.key.participant || msg.key.remoteJid; // Pega o JID do participante ou do remetente em DM
        contagemMensagens.set(senderJid, (contagemMensagens.get(senderJid) || 0) + 1);
      }

      if (contagemMensagens.size === 0) {
        await sendReply("Nenhuma mensagem encontrada no histórico.");
        return;
      }

      // Ordenar por contagem de mensagens (decrescente)
      const ranking = Array.from(contagemMensagens.entries()).sort(([, countA], [, countB]) => countB - countA);

      let resposta = "📊 Ranking de Mensagens no Grupo (Histórico):\n\n";
      for (const [jid, contagem] of ranking) {
        const nomeUsuario = jid.split("@")[0]; // Tenta obter um nome simples do JID
        resposta += `${nomeUsuario}: ${contagem} mensagens\n`;
      }

      await sendReply(resposta);

    } catch (error) {
      console.error("Erro ao analisar o histórico de mensagens:", error);
      await sendReply("Ocorreu um erro ao tentar analisar o histórico de mensagens.");
    }
  },
};
