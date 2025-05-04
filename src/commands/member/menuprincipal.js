/**
 * Comando para exibir o menu principal do bot.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "menuprincipal",
  description: "Exibe o menu principal do bot.",
  commands: ["menuprincipal", "menu"],
  usage: `${PREFIX}menuprincipal`,
  handle: async ({ sendReply }) => {
    const menuPrincipal = `🤖 Menu Principal do ${BOT_NAME} 🤖

🚀 PRINCIPAL 🚀
▢ • ${PREFIX}attp <texto>
▢ • ${PREFIX}usuarios
▢ • ${PREFIX}dia
▢ • ${PREFIX}cep <número>
▢ • ${PREFIX}vip
▢ • ${PREFIX}sticker <imagem/vídeo>
▢ • ${PREFIX}to-image <sticker>
▢ • ${PREFIX}ttp <texto>
▢ • ${PREFIX}yt-search <termo>

🎶 ÁUDIO E VÍDEO 🎶
▢ • ${PREFIX}play-audio <termo>
▢ • ${PREFIX}play-video <termo>
▢ • ${PREFIX}tik-tok <url>
▢ • ${PREFIX}yt-mp3 <url>
▢ • ${PREFIX}yt-mp4 <url>

🧠 IA 🧠
▢ • ${PREFIX}gpt-4 <pergunta>
▢ • ${PREFIX}ia-sticker <prompt>
▢ • ${PREFIX}pixart <prompt>

🎨 CANVAS 🎨
▢ • ${PREFIX}cadeia @<usuário>
▢ • ${PREFIX}inverter <imagem>
▢ • ${PREFIX}rip @<usuário>
`;

    await sendReply(menuPrincipal);
  },
};
