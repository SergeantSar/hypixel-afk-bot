class EventHandler {
  constructor(discord) {
    this.discord = discord;
  }

  ready() {
    console.log(`Discord client ready, logged in as "${this.discord.client.user.tag}".`);

    this.discord.client.user.setActivity('Hypixel Skyblock!', { type: 'PLAYING' });

    this.discord.commandHandler.initialize();

    this.discord.client.channels.fetch(this.discord.app.config.discord.channelId).then(channel => {
      channel.send({
        embeds: [{
          author: { name: `Bot is online.` },
          color: '#47F049'
        }]
      });
    });
  }

  close() {
    this.discord.client.channels.fetch(this.discord.app.config.discord.channelId).then(channel => {
      channel.send({
        embeds: [{
          author: { name: `Bot is offline.` },
          color: '#F04947'
        }]
      }).then(() => process.exit());
    }).catch(() => process.exit());
  }
}

module.exports = EventHandler;