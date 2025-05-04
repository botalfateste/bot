/**
 * Comando para exibir o menu de jogos e outras funcionalidades textuais.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "menujogo",
  description: "Exibe o menu de jogos e outras funcionalidades textuais.",
  commands: ["menujogo", "jogos"],
  usage: `${PREFIX}menujogo`,
  handle: async ({ sendReply }) => {
    const menuJogos = `🎮 Menu de Jogos e Textos 🎮

🕹️ JOGOS 🕹️
▢ • ${PREFIX}ping
▢ • ${PREFIX}velha
▢ • ${PREFIX}dado
▢ • ${PREFIX}souotario
▢ • ${PREFIX}possodormir
▢ • ${PREFIX}forca
▢ • ${PREFIX}truco
▢ • ${PREFIX}moeda
▢ • ${PREFIX}mega
▢ • ${PREFIX}test <quantidade> <escolhido>
▢ • ${PREFIX}ppt <pedra|papel|tesoura>
▢ • ${PREFIX}num [palpite]

📜 TEXTOS E OUTROS 📜
▢ • ${PREFIX}lorem
▢ • ${PREFIX}calculadora <expressão>
▢ • ${PREFIX}nomealeatorio
▢ • ${PREFIX}melhortimebr
▢ • ${PREFIX}melhortimeeu
▢ • ${PREFIX}reverso <texto>
▢ • ${PREFIX}emoji
▢ • ${PREFIX}ok
▢ • ${PREFIX}hora
▢ • ${PREFIX}menujogo (este menu)
`;

    await sendReply(menuJogos);
  },
};

