const DiscordCommand = require('../../structures/DiscordCommand');
const { CommandInteraction } = require('discord.js');

class ExecuteCommand extends DiscordCommand {
  constructor(discord) {
    super(discord);

    this.discord = discord;

    this.name = 'execute';
    this.description = 'Execute a specified command to the Minecraft Client.'
    this.options = [{
      type: 'STRING',
      name: 'command',
      description: 'Command to be run',
      required: true
    }]
  }

  /**
   * @param {CommandInteraction} interaction 
   */
  run(interaction) {
    const cmd = interaction.options.data[0].value;
    
    this.sendMcCmd(cmd);
    interaction.reply({ content: `Executed the minecraft command: \`${cmd}\``, ephemeral: false, allowedMentions: { repliedUser: false } });
  }
}

module.exports = ExecuteCommand;