class WindowHandler {
  constructor(minecraft) {
    this.minecraft = minecraft;
  }

  registerEvents(bot) {
    this.bot = bot;

    this.bot.on('windowOpen', (...args) => this.onWindow(...args));
  }

  onWindow(window) {
    if (window.title === `{"translate":"Visit ${this.minecraft.app.config.minecraft.islandToVisit}"}`) {
      setTimeout(() => this.bot.clickWindow(11, 0, 0), 1000);
    }
  }
}

module.exports = WindowHandler;