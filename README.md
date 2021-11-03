# Hypixel Afk Bot

This program will will connect to [Hypixel](https://hypixel.net) and afk on a SkyBlock island that you select. There is also an optional [Discord](https://discord.com) bot that can be used to receive status updates about the Minecraft bot as well as perform various commands.

> This application will login to Hypixel using Mineflayer which is not a normal Minecraft client, this could result in your Minecraft account getting banned from Hypixel, so use this application at your own risk.

## Installation

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org) >= 16.6.0
- [Yarn](https://classic.yarnpkg.com/en/docs/install#:~:text=Once%20you%20have,install%20--global%20yarn) >= 1.2
- A [Minecraft](https://www.minecraft.net/en-us/store/minecraft-java-edition) account

### Setup Guide

First, open a terminal/command line in the folder you would like to host your bot.
Once you are there, run:

    git clone https://github.com/SergeantSar/hypixel-afk-bot.git

Next go into the `hypixel-afk-bot` folder and install all the dependencies by running:

    yarn

After they are installed, you can copy the configuration file by running:

    cp config.example.json config.json

To read up on what to set the `config.json` values to, check below.

Once that is done, you can start the bot by running:

    node .

### Configuration

#### Minecraft

If you're using a Mojang account, `auth` should be set to `mojang`. The `username` and `password` values should be filled out with your Mojang username and password for the Minecraft account you plan on using, your Minecraft username is most likely the email it was created with. If you're using a microsoft account, change `auth` to `microsoft`, `username` to your microsoft account email, and `password` can be left blank. You will then need to go to the [Microsoft Link page](https://www.microsoft.com/link) to finish logging in.

> Note: After quick testing with a friend, logging in with microsoft can be a bit buggy.

#### Discord

The Discord options includes the `useDiscordBot`, `token`, `guildId`, `channelId`, and `ownerId`, options.

The `useDiscordBot` decides whether or not a discord bot will be used. If you aren't going to use one, it should be set to `false` and the following fields can be ignored. If you are, set it to `true`.  *Make sure that true/false is not inside of quotes, unlike the other values.*

The `token` is the Discord application token. If you don't already have a Discord App, you can [create a new app](https://discord.com/developers/applications), then convert the app to a Discord bot, and then get your Discord bot token on the "Bot" page. You can customize the bot on those pages however you like.

The `guildId` is the Discord guild ID of the server the bot should be linked with. This will be the server that the bot creates its slash commands in, and the bot won't work if this is wrong. 

The `channelId` is the Discord channel ID of the text channel the bot should be linked with. This channel will be where the bot sends status updates to, so the bot won't work if this is wrong. 

The `ownerId` should be set to your own Discord ID. Whatever ID this is set to is the only user that will have permission to run slash commands. This grants people permission to commands like `/execute`, which would allow them to run any Minecraft command of their choice, so make sure it is you.

### Discord Slash Commands

`[ ]` = Required arguments, `( )` = Optional arguments

- `/ping` - Check if the bot is online and responding.
- `/execute [command]` Runs the command specified in the Minecraft client.
- `/relog (time)` - Relogs the Minecraft client after your specified seconds (between 5 and 60). If none specified, after 5 seconds.

## Credits

Huge thanks to [Senither](https://senither.com/), as although most code was modified, nearly all of it was based upon [one of their projects](https://github.com/Senither/hypixel-discord-chat-bridge).
This app uses [Mineflayer](https://github.com/PrismarineJS/mineflayer) for connecting to Hypixel, as well as [Discord.js](https://github.com/discordjs/discord.js) for communicating with Discord.

## License

Hypixel Afk Bot is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).