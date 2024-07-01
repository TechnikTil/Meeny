const chalk = require('chalk');
const meenyEnv = require('./meenyEnv.js');

function initalizeBot(client, activitytype) {
    client.once('ready', () => {
        console.log(chalk.green(`${client.user.tag} is now online!`));

        if (activitytype != null)
            client.user.setActivity('with your mom/dad lol', { type: activitytype });

        client.user.setStatus('dnd');
    });

    client.on('interactionCreate', async interaction_metadata => {
        if (interaction_metadata.isChatInputCommand()) {
            const command = client.commands.get(interaction_metadata.commandName);

            if (!command) {
                console.error(chalk.red(`No command matching ${interaction_metadata.commandName} was found.`));
                return;
            }

            try {
                if (process.env['banList'].includes(interaction_metadata.user.id))
                    await interaction_metadata.reply({ content: 'Uh oh, You\'re on **Meeny\'s Ban List!** If you think this is a mistake, Try contacting support in the [Meeny Discord Server.](https://discord.gg/fVWFzyr9tg)', ephemeral: true });
                else
                    await command.execute(interaction_metadata);
            }
            catch (error) {
                console.error(chalk.red(error));
                await interaction_metadata.reply({ content: 'There was an error while using this command!', ephemeral: true });
            }
        }

        else if (interaction_metadata.isButton()) { }
        else if (interaction_metadata.isStringSelectMenu()) { }
    });

    client.login(meenyEnv.token);
}

function deployCommands(cmdPath, files) {
    const path = require('node:path');
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord.js');

    const commands = [];

    for (const file of files) {
        const filePath = path.join(cmdPath, file);
        const command = require(filePath);
        commands.push(command.data);
    }

    const rest = new REST({ version: '10' }).setToken(meenyEnv.token);

    rest.put(Routes.applicationCommands(meenyEnv.id), { body: commands })
        .then(() => console.log(chalk.green('Successfully updated commands.')))
        .catch(console.error);
}

module.exports = { initalizeBot, deployCommands }