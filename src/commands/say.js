const { PermissionsBitField } = require('discord.js');
const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'say',
        type: 1,
        description: 'Say a message as Meeny BETA',
        options: [
            {
                type: 3,
                name: 'message',
                description: 'What do you want to say as Meeny BETA?',
                required: true,
            },
        ],
        integration_types: [0],
        contexts: [0],
    },

    async execute(interaction_metadata) {
        var message = interaction_metadata.options.getString('message');

        // You can't @ everyone/here/server role if the user doesn't have the permission.
        if (!interaction_metadata.memberPermissions.has(PermissionsBitField.Flags.MentionEveryone))
        {
            message = removeMentions(message);
        }

        await interaction_metadata.reply({ content: 'Sent Message!', ephemeral: true });
        await interaction_metadata.channel.send({ content: message });
        watcher.command(interaction_metadata, `Message: ${message}`);

        function removeMentions(messageStr)
        {
            var newMsg = '';
            const mentionSplit = messageStr.split('@');

            for (mention in mentionSplit)
            {
                newMsg += mentionSplit[mention];
            }

            return newMsg;
        }
    },
};