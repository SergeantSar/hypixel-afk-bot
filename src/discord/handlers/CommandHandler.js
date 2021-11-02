const fs = require('fs');
const { Collection, CommandInteraction } = require('discord.js');

class CommandHandler {
  constructor(discord) {
    this.discord = discord;
    this.commands = new Collection();

    const cmdFiles = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'));

    for (const file of cmdFiles) {
      const cmd = new (require(`../commands/${file}`))(discord);
      this.commands.set(cmd.name, cmd);
    }
  }

  async initialize() {
    const guild = this.discord.client.guilds.cache.get(this.discord.app.config.discord.guildId);

    if (this.commands.size === 0) return;

    const commands = [];

    await new Promise(res => {
      let i = 0;
      this.commands.forEach((value, key, map) => {
        const finalOptions = {
          name: value.name,
          description: value.description,
          defaultPermission: false
        }

        if (value.options?.length > 0) finalOptions.options = value.options;

        commands.push(finalOptions);

        i++;
        if (map.size === i) res();
      });
    });
    
    await guild.commands.set(commands);

    const fullPermissions = [];

    await new Promise(res => {
      let i = 0;
      guild.commands.cache.forEach((value, key, map) => {
        fullPermissions.push({
          id: key,
          permissions: [{
            id: this.discord.app.config.discord.ownerId,
            type: 'USER',
            permission: true
          }]
        });

        i++;
        if (map.size === i) res();
      });
    });

    guild.commands.permissions.set({ fullPermissions: fullPermissions });
  }

  /**
   * @param {CommandInteraction} interaction
   */
  handle(interaction) {
    if (!interaction.isCommand()) return;

    const cmd = this.commands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`**Hmm.** I couldn't seem to find a command by that name.`);

    cmd.run(interaction);
  }
}

module.exports = CommandHandler;