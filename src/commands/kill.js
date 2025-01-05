const chalk = require('chalk');
const fs = require('node:fs');
const watcher = require('../utils/watcher.js');
const fs = require('fs');
const chalk = require('chalk');

function loadDeathTexts()
{
    try
    {
        const data = fs.readFileSync('./assets/kill/deaths.txt', 'utf8');
        return data.split('\n');
    } catch (err) {
        console.error(chalk.red('Error reading death list: ' + err));
        throw err;
    }
}

const deaths = loadDeathTexts();

module.exports = {
    data: {
        name: 'kill',
        type: 1,
        description: 'Who will you kill and how will you do it? (WARNING: MAY REPLY WITH DISTURBING CONTENT!)',
        options: [
            {
                type: 6,
                name: 'target',
                description: 'Who do you want to kill?',
                required: true,
            },
        ],
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const target = interaction_metadata.options.getUser('target');
        const deaths = buildKillMessages(target, `<@${interaction_metadata.user.id}>`);
        const response = Math.floor(Math.random() * deaths.length);

        await interaction_metadata.reply({
            embeds: [
                {
                    title: 'Meeny\'s Death Chamber',
                    description: filteredResponse,
                    footer: {
                        text: `Requested by: ${interaction_metadata.user.username}`
                    }
                }
            ]
        });

        watcher.command(interaction_metadata, `Target: ${target}, Cause of death: ${deaths[response]}`);
    },
};

var rawText = null;

function buildKillMessages(target, user)
{
    if (rawText == null)
    {
        try {
            rawText = fs.readFileSync('./assets/kill/messages.txt', 'utf8');
        } catch (err) {
            console.error(chalk.red('Error reading kill messages list: ' + err));
            throw err;
        }
    }

    return rawText.trim().replaceAll('{target}', target).replaceAll('{user}', user).split('\n');
}