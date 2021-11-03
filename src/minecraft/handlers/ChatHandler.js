class ChatHandler {
  constructor(minecraft) {
    this.minecraft = minecraft;
  }

  registerEvents(bot) {
    this.bot = bot;

    this.bot.on('message', (...args) => this.onMessage(...args));
  }

  onMessage(event) {
    let message = event.toString().trim();

    if (this.isLobbyJoinMessage(message)) {
      this.bot.chat('/play sb');

      console.log('Joined SkyBlock.');
      if (this.minecraft.app.config.discord.useDiscordBot) {
        this.minecraft.app.discord.sendMessage({
          embeds: [{
            description: 'Joined SkyBlock.',
            color: "#57AD48"
          }]
        });
      }
    }

    if (this.isJoinedSbMessage(message)) {
      this.visitIsland();
    }

    if (this.isEvacuatingMessage(message)) {
      setTimeout(() => this.visitIsland(), 15000);

      console.log('Was evacuated from an island.');
      if (this.minecraft.app.config.discord.useDiscordBot) {
        this.minecraft.app.discord.sendMessage({
          embeds: [{
            description: 'Was evacuated from an island.',
            color: "#F04947"
          }]
        });
      }
    }

    if (this.isTransferredMessage(message)) {
      setTimeout(() => this.visitIsland(), 15000);

      console.log('Was evacuated from an island.');
      if (this.minecraft.app.config.discord.useDiscordBot) {
        this.minecraft.app.discord.sendMessage({
          embeds: [{
            description: 'Was transferred from an island.',
            color: "#F04947"
          }]
        });
      }
    }
  }

  isLobbyJoinMessage(message) {
    return ((message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')) || (message === '➤ You have reached your Hype limit! Add Hype to Prototype Lobby minigames by right-clicking with the Hype Diamond!');
  }

  isJoinedSbMessage(message) {
    return message === 'Welcome to Hypixel SkyBlock!';
  }

  isEvacuatingMessage(message) {
    return message.startsWith('Evacuating');
  }

  isTransferredMessage(message) {
    return message.startsWith('You are being transferred');
  }

  visitIsland() {
    if (this.minecraft.app.config.minecraft.islandToVisit.toLowerCase() === this.bot.username.toLowerCase()) {
      this.bot.chat('/is');
    } else {
      this.bot.chat(`/visit ${this.minecraft.app.config.minecraft.islandToVisit}`);
    }

    console.log('Visited the island.');
    if (this.minecraft.app.config.discord.useDiscordBot) {
      this.minecraft.app.discord.sendMessage({
        embeds: [{
          description: 'Visited the island.',
          color: "#57AD48"
        }]
      });
    }
  }
}

module.exports = ChatHandler;