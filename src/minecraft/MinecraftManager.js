const mineflayer = require('mineflayer');
const StateHandler = require('./handlers/StateHandler');
const ChatHandler = require('./handlers/ChatHandler');
const WindowHandler = require('./handlers/WindowHandler');

class MinecraftManager {
  constructor(app) {
    this.app = app;

    this.stateHandler = new StateHandler(this);
    this.chatHandler = new ChatHandler(this);
    this.windowHandler = new WindowHandler(this);
  }

  connect() {
    this.bot = this.createBotConnection();

    this.stateHandler.registerEvents(this.bot);
    this.chatHandler.registerEvents(this.bot);
    this.windowHandler.registerEvents(this.bot);
  }

  createBotConnection() {
    return mineflayer.createBot({
      host: 'www.hypixel.net',
      port: 25565,
      version: '1.8.9',
      auth: this.app.config.minecraft.auth,
      username: this.app.config.minecraft.username,
      password: this.app.config.minecraft.password
    });
  }
}

module.exports = MinecraftManager;