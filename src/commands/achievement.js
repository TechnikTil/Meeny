const watcher = require('../utils/watcher.js');
const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

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

		const canvas = Canvas.createCanvas(1, 1);
		const context = canvas.getContext('2d');

		context.msImageSmoothingEnabled = false;
		context.mozImageSmoothingEnabled = false;
		context.webkitImageSmoothingEnabled = false;
		context.imageSmoothingEnabled = false;

		const image = await Canvas.loadImage('./assets/achievement/background.png');
		canvas.width = image.width*2;
		canvas.height = image.height*2;
		context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

		var achievementX = 60;
		var achievementY = 28 + 8;
		var curAchievementX = achievementX;
		var undercaseLetters = '                               !"#$%&\'()*+,-./0123456789:;<=>?"@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
		for(var i=0; i < achievement.length; i++)
		{
			var letterText = achievement.charAt(i);
			if(letterText != ' ')
			{
				if(letterText === letterText.toLowerCase())
					letterText += '_l';

				const letter = await Canvas.loadImage('./assets/achievement/text/' + letterText + '.png');
				context.drawImage(letter, 0, 0, letter.width, letter.height, curAchievementX, achievementY, letter.width*2, letter.height*2);
				curAchievementX += (letter.width*2)-4;
			}
			else
				curAchievementX += 16-4;
		}

		const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), {
			name: 'achievement.png'
		});

		await interaction_metadata.reply({files: [attachment]});

		watcher.command(interaction_metadata, `Name: ${achievement}`);
	},
};