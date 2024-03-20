const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const init = require('./src/initalize.js');

require("dotenv").config();
const token = process.env['tokenBETA']
const blocked = process.env['blockList']
const clientId = process.env['botIDBETA']

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

init.deployCommands(commandsPath, commandFiles, token, clientId)
init.initalizeBot(client, token, ActivityType.Playing, blocked);