const path = require("path");

// Prefixo dos comandos.
exports.PREFIX = "!";

// Emoji do bot (mude se preferir).
exports.BOT_EMOJI = ">";

// Nome do bot (mude se preferir).
exports.BOT_NAME = "Emerson";

// Número do bot. Coloque o número do bot
// (apenas números, exatamente como está no WhatsApp).
// Se o seu DDD não for de SP ou do Rio, não coloque o 9 antes do número.
exports.BOT_NUMBER = "5516981513520";

// Número do dono do bot. Coloque o número do dono do bot
// (apenas números, exatamente como está no WhatsApp).
// Se o seu DDD não for de SP ou do Rio, não coloque o 9 antes do número.
exports.OWNER_NUMBER = "553598544315";

// Diretório dos comandos
exports.COMMANDS_DIR = path.join(__dirname, "commands");

// Diretório de arquivos de mídia.
exports.ASSETS_DIR = path.resolve(__dirname, "..", "assets");

// Diretório de arquivos temporários.
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

// Timeout em milissegundos por evento (evita banimento).
exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

// Plataforma de API's
exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Obtenha seu token, criando uma conta em: https://api.spiderx.com.br.
exports.SPIDER_API_TOKEN = "zqsJkBjNuFz8i2YDGkv8";

// Caso queira responder apenas um grupo específico, coloque o ID dele aqui (ex: 120363023799506419@g.us). Apenas para testes internos!
exports.ONLY_GROUP_ID = "";

// Diretório base do projeto.
exports.BASE_DIR = path.resolve(__dirname);
