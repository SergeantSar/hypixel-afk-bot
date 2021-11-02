const DiscordCommand = require('../../structures/DiscordCommand');
const { CommandInteraction } = require('discord.js');

class RelogCommand extends DiscordCommand {
  constructor(discord) {
    super(discord);

    this.discord = discord;

    this.name = 'relog';
    this.description = 'Relogs the Minecraft client after specified time, or 5 seconds.'
    this.options = [{
      type: 'INTEGER',
      name: 'time',
      description: 'Time to relog after',
      required: false
    }]
  }

  /**
   * @param {CommandInteraction} interaction 
   */
  run(interaction) {
    let time = interaction.options.data[0]?.value;

    if (!time) return this.relogWithDelay(interaction);

    if (time < 5 || time > 60) time = 5;

    return this.relogWithDelay(interaction, time);
  }

  relogWithDelay(interaction, delay = 0) {
    interaction.reply({ content: `Relogging the Minecraft client after ${delay === 0 ? 5 : delay} seconds.`, ephemeral: false, allowedMentions: { repliedUser: false } });

    this.discord.app.minecraft.stateHandler.exactDelay = delay * 1000;
    this.discord.app.minecraft.bot.quit();
  }
}

module.exports = RelogCommand;