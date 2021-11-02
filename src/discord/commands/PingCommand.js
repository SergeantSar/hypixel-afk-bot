const DiscordCommand = require('../../structures/DiscordCommand');
const { CommandInteraction } = require('discord.js');

class PingCommand extends DiscordCommand {
  constructor(discord) {
    super(discord);

    this.discord = discord;
    
    this.name = 'ping',
    this.description = 'Check if the bot is online and responding.'
  }

  /**
   * @param {CommandInteraction} interaction 
   */
  run(interaction) {
    interaction.reply({ content: '**Pong!**', ephemeral: false, allowedMentions: { repliedUser: false } });
  }
}

module.exports = PingCommand;