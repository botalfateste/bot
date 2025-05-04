/**
 * Comando para exibir o menu de comandos de administrador.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "menuadm",
  description: "Exibe o menu de comandos de administrador.",
  commands: ["menuadm", "adm"],
  usage: `${PREFIX}menuadm`,
  handle: async ({ sendReply }) => {
    const menuAdmin = `👮‍♂️ Menu de Comandos de Administrador 👮‍♀️

▢ • ${PREFIX}anti-link (1/0)
▢ • ${PREFIX}auto-responder (1/0)
▢ • ${PREFIX}ban @<usuário>
▢ • ${PREFIX}exit (1/0)
▢ • ${PREFIX}hidetag <mensagem>
▢ • ${PREFIX}welcome (1/0)
▢ • ${PREFIX}usuarios
▢ • ${PREFIX}pessoa

`;

    await sendReply(menuAdmin);
  },
};
