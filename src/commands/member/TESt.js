/**
 * Comando para sortear um número e verificar se é o número escolhido pelo usuário.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

module.exports = {
  name: "testesorteio",
  description: "Sorteia um número dentro de um intervalo e verifica se é o número escolhido.",
  commands: ["testesorteio", "ts"],
  usage: `${PREFIX}testesorteio <quantidade de números> <número escolhido>`,
  handle: async ({ args, sendReply }) => {
    if (args.length !== 2) {
      await sendReply(`Uso correto: ${PREFIX}testesorteio <quantidade de números> <número escolhido>. Exemplo: ${PREFIX}testesorteio 10 5`);
      return;
    }

    const quantidadeNumeros = parseInt(args[0]);
    const numeroEscolhido = parseInt(args[1]);

    if (isNaN(quantidadeNumeros) || quantidadeNumeros < 1) {
      await sendReply("A quantidade de números deve ser um número inteiro maior que 0.");
      return;
    }

    if (isNaN(numeroEscolhido)) {
      await sendReply("O número escolhido deve ser um número inteiro.");
      return;
    }

    if (numeroEscolhido < 1 || numeroEscolhido > quantidadeNumeros) {
      await sendReply(`O número escolhido deve estar entre 1 e ${quantidadeNumeros}.`);
      return;
    }

    const numeroSorteado = Math.floor(Math.random() * quantidadeNumeros) + 1;

    let resultado = `🔢 Sorteando um número entre 1 e ${quantidadeNumeros}...\n`;
    resultado += `O número sorteado foi: ${numeroSorteado}\n`;

    if (numeroSorteado === numeroEscolhido) {
      resultado += `🎉 Parabéns! O número sorteado (${numeroSorteado}) é igual ao seu número escolhido (${numeroEscolhido})!`;
    } else {
      resultado += `😔 Que pena! O número sorteado (${numeroSorteado}) não é o seu número escolhido (${numeroEscolhido}). Tente novamente!`;
    }

    await sendReply(resultado);
  },
};
