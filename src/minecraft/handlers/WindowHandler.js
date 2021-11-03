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
      
      let slot;

      for (const item of window.slots) {
        if (item?.nbt.value.display.value.Name.value === '§aVisit player island') {
          slot = item.slot;
        }
      }

      setTimeout(() => this.bot.clickWindow(slot, 0, 0), 2000);
    }
  }
}

module.exports = WindowHandler;