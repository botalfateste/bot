/**
 * Comando para gerar um nome aleatório.
 */
const { PREFIX } = require(`${BASE_DIR}/config`);

const listaNomes = [
  "Alice", "Benjamin", "Chloe", "Daniel", "Eleanor", "Finn", "Grace", "Henry", "Ivy", "Jack",
  "Katherine", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Ryan", "Sophia", "Thomas",
  "Ursula", "Victor", "Willow", "Xavier", "Yara", "Zachary", "Adeline", "Caleb", "Daisy", "Ethan",
  "Felicity", "Gabriel", "Hazel", "Isaac", "Jasmine", "Kevin", "Luna", "Owen", "Penelope", "Samuel",
  "Violet", "Wyatt", "Zara", "Aaron", "Bella", "Connor", "Ella", "Frederick", "Gemma", "Hugo",
  "Isabelle", "Jasper", "Lily", "Mason", "Nora", "Oscar", "Poppy", "Sebastian", "Thea", "Uriel",
  "Vivian", "Wesley", "Xena", "Yvette", "Zane",
];

module.exports = {
  name: "nomealeatorio",
  description: "Gera um nome aleatório.",
  commands: ["nomealeatorio", "nome"],
  usage: `${PREFIX}nomealeatorio`,
  handle: async ({ sendReply }) => {
    const nomeAleatorio = listaNomes[Math.floor(Math.random() * listaNomes.length)];
    await sendReply(`👤 Nome aleatório: ${nomeAleatorio}`);
  },
};
