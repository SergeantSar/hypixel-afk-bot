const { CommandInteraction } = require('discord.js');

class DiscordCommand {
  constructor(discord) {
    this.discord = discord;
  }

  sendMcCmd(cmd) {
    this.discord.app.minecraft.bot.chat(cmd);
  }

  /**
   * @param {CommandInteraction} interaction 
   */
  run(interaction) {
    interaction.reply({ content: '**Hmm.** It appears as though this command has not been set up yet.', ephemeral: true, allowedMentions: { repliedUser: false } });
  }
}

module.exports = DiscordCommand;