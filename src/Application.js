const DiscordManager = require('./discord/DiscordManager');
const MinecraftManager = require('./minecraft/MinecraftManager');
const config = require('../config.json');

class Application {
  async register() {
    this.config = config;

    if (this.config.discord.useDiscordBot) {
      this.discord = new DiscordManager(this);
    }
    this.minecraft = new MinecraftManager(this);
  }

  async connect() {
    if (this.config.discord.useDiscordBot) {
      this.discord.connect();
    }
    this.minecraft.connect();
  }
}

module.exports = new Application();