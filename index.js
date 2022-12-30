const fs = require('node:fs');
const path = require('node:path');
const rpc = require("discord-rpc");
const rpcclient = new rpc.Client({ transport: 'ipc' });
const { Client, Collection, GatewayIntentBits } = require('discord.js');

require("dotenv").config();
const token = process.env['tokenBETA']

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

rpcclient.login({ clientId: "1058203506072367107" }).catch(console.error);

rpcclient.on('ready', () => {
    console.log('Discord Presence now active!')
    rpcclient.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            details: "Running BETA Version",
            state: "Currently running Meeny",
            timestamps: {
                start: Date.now()
            },
            assets: {
                large_image: "meeny-beta-magik",
                large_text: "Meeny BETA",
                //small_image: config.SmallImage,
                //small_text: config.SmallImageText,
            }
        }
    })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while using this command!', ephemeral: true });
    }
});

client.login(token);