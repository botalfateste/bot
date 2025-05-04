/**
 * Comando para enviar um emoji aleatório.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

// Uma lista de emojis comuns e expressivos
const listaEmojis = [
  "😀", "😂", "🤣", "😊", "😎", "😍", "😘", "😗", "😙", "😋",
  "😜", "🤪", "🤨", "🤔", "🙄", "😒", "😔", "😟", "🙁", "🥺",
  "😲", "😮", "😨", "😰", "😥", "😓", "😭", "🤯", "😇", "😈",
  "💩", "👻", "👽", "👾", "🤖", "👋", "👍", "👎", "👏", "🙌",
  "🙏", "🤝", "💪", "🧠", "❤️", "🧡", "💛", "💚", "💙", "💜",
  "🖤", "🤍", "🤎", "💥", "💫", "⭐", "🌟", "✨", "💯", "🔥",
  "🎉", "🎊", "🎈", "🎁", "🎶", "🎵", "🎧", "🎤", "🎬", "📷",
  "💡", "🔌", "🔋", "💰", "💸", "🛒", "🎁", "🔑", "🔒", "🔓",
  "📌", "📍", "📝", "✏️", "🔍", "🔎", "❤️‍🔥", "🫠", "😶‍🌫️", "🥴",
];

module.exports = {
  name: "emoji",
  description: "Envia um emoji aleatório.",
  commands: ["emoji"],
  usage: `${PREFIX}emoji`,
  handle: async ({ sendReply }) => {
    const emojiAleatorio = listaEmojis[Math.floor(Math.random() * listaEmojis.length)];
    await sendReply(emojiAleatorio);
  },
};
