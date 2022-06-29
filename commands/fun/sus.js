const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('sus')
		.setDescription('sussy.')
		.addUserOption(option => option.setName('user').setDescription('The target user')),
	async execute(interaction) {
		try {
            await interaction.deferReply();
            const Target = interaction.options.getUser('user') || interaction.member;
            const canvas = Canvas.createCanvas(2933/3, 1650/3);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('./images/amongus.png');
            const avatar = await Canvas.loadImage(Target.displayAvatarURL({ format: 'jpg' }));
			context.drawImage(avatar, 883/3, 516/3, 140, 140);
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sus.png');
            await interaction.editReply({ files: [attachment] });
		    } catch(error) {
		    	console.log(error)
		    	return interaction.reply("Errr... looks like something went wrong!");
		    }
	},
};
