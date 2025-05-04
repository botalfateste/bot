/**
 * Comando para realizar cálculos matemáticos simples.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);
const { evaluate } = require('mathjs'); // Requer a instalação da biblioteca mathjs: npm install mathjs

module.exports = {
  name: "calculadora",
  description: "Realiza cálculos matemáticos simples.",
  commands: ["calculadora", "calc"], // Adicione 'calc' como um alias
  usage: `${PREFIX}calculadora <expressão matemática>`,
  handle: async ({ args, sendReply }) => {
    if (!args.length) {
      await sendReply(`Uso correto: ${PREFIX}calculadora <expressão matemática>. Exemplo: ${PREFIX}calculadora 2 + 2 * 3`);
      return;
    }

    const expressao = args.join(" ");

    try {
      const resultado = evaluate(expressao);
      await sendReply(`Resultado: ${resultado}`);
    } catch (error) {
      console.error("Erro ao calcular:", error);
      await sendReply(`Erro ao calcular a expressão. Verifique a sintaxe.`);
    }
  },
};
