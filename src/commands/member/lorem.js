/**
 * Comando para gerar texto Lorem Ipsum com uma quantidade específica de palavras.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

const loremIpsumBase = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const palavrasBase = loremIpsumBase.split(/\s+/);

function gerarLoremIpsum(quantidade) {
  if (quantidade <= 0) {
    return "";
  }

  let resultado = [];
  let palavrasUsadas = 0;

  while (palavrasUsadas < quantidade && palavrasBase.length > 0) {
    const indice = Math.floor(Math.random() * palavrasBase.length);
    resultado.push(palavrasBase[indice]);
    palavrasUsadas++;
    // Opcional: remover a palavra usada para evitar repetição excessiva em textos curtos
    // palavrasBase.splice(indice, 1);
  }

  // Se a quantidade for maior que as palavras base, recicla as palavras
  while (palavrasUsadas < quantidade) {
    const indice = Math.floor(Math.random() * palavrasBase.length);
    resultado.push(palavrasBase[indice]);
    palavrasUsadas++;
  }

  return resultado.join(" ");
}

module.exports = {
  name: "lorem",
  description: "Gera texto Lorem Ipsum com a quantidade de palavras especificada.",
  commands: ["lorem"],
  usage: `${PREFIX}lorem <quantidade>`,
  handle: async ({ args, sendReply }) => {
    const quantidade = parseInt(args[0]);

    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
      await sendReply(`Uso correto: ${PREFIX}lorem <quantidade de palavras (maior que 0)>`);
      return;
    }

    const textoLorem = gerarLoremIpsum(quantidade);
    await sendReply(textoLorem);
  },
};
