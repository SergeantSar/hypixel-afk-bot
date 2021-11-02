class StateHandler {
  constructor(minecraft) {
    this.minecraft = minecraft;

    this.loginAttempts = 0;
    this.exactDelay = 0;
    this.loggedIn = false;
  }

  registerEvents(bot) {
    this.bot = bot;

    this.bot.on('login', (...args) => this.onLogin(...args));
    this.bot.on('end', (...args) => this.onEnd(...args));
    this.bot.on('kick', (...args) => this.onKick(...args));
    this.bot.on('error', (...args) => this.onError(...args));
  }

  onLogin() {
    if (!this.loggedIn) {
      console.log(`Minecraft client ready, logged in as "${this.bot.username}".`);

      this.loginAttempts = 0;
      this.loggedIn = true;
    }
  }

  onEnd() {
    let loginDelay = this.exactDelay;

    if (loginDelay === 0) loginDelay = (this.loginAttempts + 1) * 5000;
    if (loginDelay > 60000) loginDelay = 60000;

    console.warn(`Minecraft client disconnected from server, attempting to reconnect in ${loginDelay / 1000} seconds.`);
    if (this.minecraft.app.config.discord.useDiscordBot) {
      this.minecraft.app.discord.sendMessage({
        embeds: [{
          description: `Minecraft client disconnected from server, attempting to reconnect in ${loginDelay / 1000} seconds.`,
          color: "#F04947"
        }]
      });
    }
    
    setTimeout(() => this.minecraft.connect(), loginDelay);
  }

  onKick(reason) {
    console.warn(`Minecraft client was kicked form the server for reason: "${reason}".`);
    if (this.minecraft.app.config.discord.useDiscordBot) {
      this.minecraft.app.discord.sendMessage({
        embeds: [{
          description: `Minecraft client was kicked from the server for reason: "${reason}".`,
          color: "#F04947"
        }]
      });
    }

    this.loginAttempts++;
  }

  onError(error) {
    if (error.hasOwnProperty('code') && (error.code == 'ECONNRESET' || error.code == 'ECONNREFUSED')) return;

    console.error(error);
  }
}

module.exports = StateHandler;