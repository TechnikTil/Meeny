const watcher = require('../utils/watcher.js');
const { AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const fs = require('fs');
const chalk = require('chalk');

function loadIconList() {
    try {
        const data = fs.readFileSync('./assets/achievement/icon_list.txt', 'utf8');
        const iconList = [];
        const iconListPartOne = data.split('\n');

        iconListPartOne.forEach(icon => {
            const somethingCool = icon.split(' - ');
            if (somethingCool.length === 2) {
                iconList.push({
                    name: somethingCool[1].trim(),
                    value: somethingCool[0].trim()
                });
            }
        });

        return iconList;
    } catch (err) {
        console.error(chalk.red('Error reading icon list: ' + err));
        throw err;
    }
}

const iconList = loadIconList();

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
			{
				type: 3,
				name: 'icon',
				description: 'What should the icon of the achievement be?',
				required: false,
				choices: iconList,
			},
			{
				type: 11,
				name: 'custom_icon',
				description: 'Upload a custom icon for the achievement! Warning: Might look low quality!',
				required: false,
			}
		],
		integration_types: [0, 1],
		contexts: [0, 1, 2],
	},

	async execute(interaction_metadata) {
		const achievement = interaction_metadata.options.getString('achievement');
		const icon = interaction_metadata.options.getString('icon');
		const customIcon = interaction_metadata.options.get('custom_icon');

		const canvas = Canvas.createCanvas(1, 1);
		const context = canvas.getContext('2d');
		context.imageSmoothingEnabled = false;

		context.font = '8px "Minecraftia"';
		context.fillStyle = 'white';

		var widthGeneration = 30 + context.measureText(achievement).width + 10;

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
		context.fillText(achievement, 30, 14 + (8 * 2));

		const attachentCanvas = Canvas.createCanvas(canvas.width * 2, canvas.height * 2);
		const attachentContext = attachentCanvas.getContext('2d');
		attachentContext.imageSmoothingEnabled = false;

		attachentContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, attachentCanvas.width, attachentCanvas.height);

		var achievementIcon = null;

		if(customIcon != null)
		{
			achievementIcon = await Canvas.loadImage(customIcon.attachment.attachment);
			attachentContext.imageSmoothingEnabled = true;
		}
		else
		{
			if(icon != null)
				achievementIcon = await Canvas.loadImage('./assets/achievement/icons/' + icon + '.png');
			else
			{
				const randomIndex = Math.floor(Math.random() * iconList.length);
				achievementIcon = await Canvas.loadImage('./assets/achievement/icons/' + iconList[randomIndex].value + '.png');
			}
		}

		attachentContext.drawImage(achievementIcon, 16, 16, Math.floor(achievementIcon.width * (32 / achievementIcon.height)), 32);

		const attachment = new AttachmentBuilder(attachentCanvas.toBuffer('image/png'), {
			name: 'achievement.png'
		});

		await interaction_metadata.reply({files: [attachment]});

		watcher.command(interaction_metadata, `Name: ${achievement}`);
	},
};