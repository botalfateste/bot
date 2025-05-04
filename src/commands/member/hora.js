/**
 * Comando para exibir a data e hora exatas.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "horaexata",
  description: "Exibe a data e hora exatas.",
  commands: ["hora", "tempo"],
  usage: `${PREFIX}hora`,
  handle: async ({ sendReply }) => {
    const agora = new Date();

    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // Meses são de 0 a 11
    const ano = agora.getFullYear();

    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');
    const segundo = agora.getSeconds().toString().padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano}`;
    const horaFormatada = `${hora}:${minuto}:${segundo}`;

    const resposta = `📅 Data: ${dataFormatada}\n⏰ Hora: ${horaFormatada}`;

    await sendReply(resposta);
  },
};
