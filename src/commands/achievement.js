const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'achievement',
        type: 1,
        description: 'Replies with a Minecraft Achievement (Achievement Icon is Randomized)',
        options: [
            {
                type: 3,
                name: 'achievement',
                description: 'What should the name of the achievement be?',
                required: true,
            },
        ],
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const achievement = interaction_metadata.options.getString('achievement');
        const link = `https://minecraftskinstealer.com/achievement/${Math.floor(Math.random() * 40)}/Achievement+Get%21/${achievement.replace(/ /g, "+")}`;

        const canvas = Canvas.createCanvas(200, 200);
        const context = canvas.getContext('2d');

        context.fillStyle = 'red';
        context.fillRect(0, 0, 200, 200);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), {
            name: 'achievement.png'
        });

        await interaction_metadata.reply({files: [attachment]});

        watcher.command(interaction_metadata, `Name: ${achievement}, Link: ${link}`);
    },
};
