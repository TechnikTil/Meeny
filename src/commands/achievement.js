const watcher = require('../utils/watcher.js');
const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const chalk = require('chalk');

module.exports = {
	data: {
		name: 'achievement',
		type: 1,
		description: 'Replies with a Minecraft Achievement!',
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

		console.log(chalk.yellow('Getting ready to generate achievement...'));

		const canvas = Canvas.createCanvas(1, 1);
		const context = canvas.getContext('2d');
		context.imageSmoothingEnabled = false;

		context.font = '8px "Minecraftia"';
		context.fillStyle = 'white';

		var widthGeneration = 30 + context.measureText(achievement).width + 30;

		if(widthGeneration < 160)
		{
			widthGeneration = 160;
		}

		canvas.width = widthGeneration;
		canvas.height = 32;

		const backgroundMiddle = await Canvas.loadImage('./assets/achievement/background/background_middle.png');

		for(let i=0; i < widthGeneration - 8; i++)
		{
			context.drawImage(backgroundMiddle, 4+i, 0);
		}

		const backgroundLeft = await Canvas.loadImage('./assets/achievement/background/background_left.png');
		context.drawImage(backgroundLeft, 0, 0);

		const backgroundRight = await Canvas.loadImage('./assets/achievement/background/background_right.png');
		context.drawImage(backgroundRight, widthGeneration - backgroundRight.width, 0);

		const achievementGet = await Canvas.loadImage('./assets/achievement/achievementGet.png');
		context.drawImage(achievementGet, 30, 7);

		context.font = '8px "Minecraftia"';
		context.fillStyle = 'white';
		context.fillText(achievement, 30, 12 + (8 * 2));

		const attachentCanvas = Canvas.createCanvas(canvas.width * 2, canvas.height * 2);
		const attachentContext = attachentCanvas.getContext('2d');
		attachentContext.imageSmoothingEnabled = false;

		attachentContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, attachentCanvas.width, attachentCanvas.height);

		const attachment = new AttachmentBuilder(attachentCanvas.toBuffer('image/png'), {
			name: 'achievement.png'
		});

		console.log(chalk.yellow('Finished and sent achievement!'));

		await interaction_metadata.reply({files: [attachment]});

		watcher.command(interaction_metadata, `Name: ${achievement}`);
	},
};