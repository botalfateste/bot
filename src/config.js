const path = require("path");

exports.PREFIX = "!";


exports.BOT_EMOJI = ">";


exports.BOT_NAME = "Emerson Bot";

exports.BOT_NUMBER = "553598544315";

exports.OWNER_NUMBER = "5516981513520";


exports.COMMANDS_DIR = path.join(__dirname, "commands");


exports.ASSETS_DIR = path.resolve(__dirname, "..", "assets");


exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");


exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";


exports.SPIDER_API_TOKEN = "r2BiqG7IEOTlHzrPMqA3";

// Caso queira responder apenas um grupo específico, coloque o ID dele aqui (ex: 120363023799506419@g.us). Apenas para testes internos!
exports.ONLY_GROUP_ID = "";

// Diretório base do projeto.
exports.BASE_DIR = path.resolve(__dirname);
