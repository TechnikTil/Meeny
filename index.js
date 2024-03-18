const fs = require('node:fs');
const path = require('node:path');
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
    console.log(`${client.user.tag} is now online!`);
    client.user.setActivity('with your mom/dad lol', { type: ActivityType.Playing });
    client.user.setStatus('dnd');
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

        try {
            if (blocked.includes(interaction.user.id))
                await interaction.reply({ content: 'Uh oh, You\'re on Meeny\'s Block List! If you think this is a mistake, Try contacting support in https://discord.gg/fVWFzyr9tg.', ephemeral: true });
            else
                await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while using this command!', ephemeral: true });
        }
    } else if (interaction.isButton()) {
        // respond to the button
    } else if (interaction.isStringSelectMenu()) {
        // respond to the select menu
    }
});

client.login(token);