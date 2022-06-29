const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('trash')
		.setDescription('Send people into the trash can.')
		.addUserOption(option => option.setName('user').setDescription('The target user')),
	async execute(interaction) {
		try {
            await interaction.deferReply();
            const Target = interaction.options.getUser('user') || interaction.member;
            const canvas = Canvas.createCanvas(779, 1280);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('./images/trash.png');
            const avatar = await Canvas.loadImage(Target.displayAvatarURL({ format: 'png' }));
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(389.5, 390.5, 252.5 , 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            context.drawImage(avatar, 139, 138, 505, 505);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'trash.png');
            context.strokeStyle = '#0099ff';
            await interaction.editReply({ files: [attachment] });
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
