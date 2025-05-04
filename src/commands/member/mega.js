/**
 * Comando para gerar números aleatórios da Mega Sena e verificar acertos (AJUSTADO).
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

function gerarNumerosMegaSena(quantidade = 6) {
  const numeros = new Set();
  while (numeros.size < quantidade) {
    numeros.add(Math.floor(Math.random() * 60) + 1);
  }
  return Array.from(numeros).sort((a, b) => a - b);
}

module.exports = {
  name: "mega",
  description: "Gera 6 números aleatórios da Mega Sena e verifica acertos com os números fornecidos.",
  commands: ["mega"],
  usage: `${PREFIX}mega <n1> <n2> <n3> <n4> <n5> <n6>`,
  handle: async ({ args, fullMessage, sendReply }) => {
    // Remover o prefixo e o comando da mensagem completa e dividir por espaços
    const numerosEnviadosString = fullMessage.substring(PREFIX.length + "mega".length).trim();
    const numerosUsuario = numerosEnviadosString.split(/\s+/).map(Number).filter(num => num >= 1 && num <= 60);

    if (numerosUsuario.length !== 6 || numerosUsuario.some(isNaN)) {
      await sendReply("Por favor, forneça 6 números válidos entre 1 e 60 separados por espaço.");
      return;
    }

    const numerosSorteados = gerarNumerosMegaSena();
    const acertos = numerosUsuario.filter(num => numerosSorteados.includes(num));

    let resultado = `Mega Sena sorteada: ${numerosSorteados.join(", ")}\n`;
    resultado += `Seus números: ${numerosUsuario.sort((a, b) => a - b).join(", ")}\n`;
    resultado += `Você acertou ${acertos.length} número(s): ${acertos.join(", ")}`;

    await sendReply(resultado);
  },
};
