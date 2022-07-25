import dotenv from "dotenv";
import { logger } from "./logger.js";
import {
  Client,
  IntentsBitField,
} from "discord.js";

/** Load .env file into process.env */
dotenv.config();

const intents = new IntentsBitField();
/** Privileged intents */
intents.add("GuildMembers");
intents.add("MessageContent");

intents.add("Guilds");
intents.add("GuildMessages");
intents.add("GuildMessageReactions");
intents.add("GuildVoiceStates");

const prefix = "!";

const client = new Client({
  intents,
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: true,
  },
});

client.login(process.env.BOT_TOKEN!);


(async () => {
  logger.info("Starting Discord bot");

  client.on("ready", () => {
    logger.info(`Logged in as ${client.user?.username}!`);
  });

  client.on("messageCreate", (message) => {
    logger.info(`Got message: ${message}`);

    /** Example prefix  */
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const command = String(message).replace('!', "")

    if (command === 'ping') 
      message.channel.send('pong!')
  });

  
})();
