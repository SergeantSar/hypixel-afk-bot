const { Client, Intents } = require('discord.js');
const EventHandler = require('./handlers/StateHandler');
const CommandHandler = require('./handlers/CommandHandler');

class DiscordManager {
  constructor(app) {
    this.app = app;

    this.eventHandler = new EventHandler(this);
    this.commandHandler = new CommandHandler(this);
  }

  connect() {
    this.client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INTEGRATIONS ] });

    this.client.on('ready', () => this.eventHandler.ready());
    this.client.on('interactionCreate', interaction => this.commandHandler.handle(interaction));

    this.client.login(this.app.config.discord.token).catch(err => {
      console.error(err);

      process.exit(1);
    });
    
    process.on('SIGINT', () => this.eventHandler.close());
  }

  sendMessage(msg) {
    this.client.channels.fetch(this.app.config.discord.channelId).then(channel => {
      channel.send(msg);
    });
  }
}

module.exports = DiscordManager;