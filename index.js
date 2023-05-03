const fs = require('node:fs');
const path = require('node:path');
const rpc = require("discord-rpc");
const rpcclient = new rpc.Client({ transport: 'ipc' });
const { Client, Collection, GatewayIntentBits } = require('discord.js');

require("dotenv").config();
const blocked = process.env['blockList']
const token = process.env['tokenBETA']

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const { ActivityType } = require('discord.js');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Meeny BETA is now online!');
    client.user.setActivity('with your mom lol', { type: ActivityType.Playing });
});

rpcclient.login({ clientId: "1058203506072367107" }).catch('Error with RPC! ' + console.error);

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
        if (blocked.includes(interaction.user.id))
            await interaction.reply({ content: 'Uh oh, You are on Meeny\'s Block List! If you think this is a mistake, Try contacting support in https://discord.gg/fVWFzyr9tg.', ephemeral: true });
        else
            await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while using this command!', ephemeral: true });
    }
});

client.login(token);