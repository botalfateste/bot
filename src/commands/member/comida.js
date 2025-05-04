/**
 * Comando para enviar um nome de comida vegana ou vegetariana aleatória.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

const listaComidasVeganasVegetarianas = [
  "Lentilha com arroz",
  "Curry de grão de bico",
  "Moqueca de palmito pupunha",
  "Estrogonofe de cogumelos",
  "Hambúrguer de lentilha",
  "Pizza de palmito e rúcula",
  "Torta de legumes",
  "Brócolis com molho de castanhas",
  "Nhoque de batata com molho de tomate fresco",
  "Risoto de limão com aspargos",
  "Feijoada vegana",
  "Bobó de cogumelos",
  "Wrap de hummus com vegetais",
  "Salada de quinoa com legumes assados",
  "Sopa de abóbora com gengibre",
  "Tacos de jaca louca",
  "Lasanha de berinjela",
  "Pad thai vegetariano",
  "Esfiha de espinafre com ricota vegana",
  "Cuscuz marroquino com legumes",
  "Chili vegetariano",
  "Burrito de feijão preto com guacamole",
  "Macarrão com pesto de manjericão e tomate cereja",
  "Panquecas veganas com frutas",
  "Tofu mexido com legumes",
  "Cogumelos recheados com quinoa e nozes",
  "Falafel com tahine",
  "Samosas vegetarianas",
  "Dahl de lentilha vermelha",
  "Vindaloo de legumes",
];

module.exports = {
  name: "comida",
  description: "Envia um nome de comida vegana ou vegetariana aleatória.",
  commands: ["comida", "food"],
  usage: `${PREFIX}comida`,
  handle: async ({ sendReply }) => {
    const comidaAleatoria = listaComidasVeganasVegetarianas[Math.floor(Math.random() * listaComidasVeganasVegetarianas.length)];
    await sendReply(`😋 Que tal experimentar: ${comidaAleatoria}?`);
  },
};
