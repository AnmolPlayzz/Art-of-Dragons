const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Canvas = require("canvas");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('poo')
		.setDescription('Poop.')
		.addUserOption(option => option.setName('user').setDescription('The target user')),
	async execute(interaction) {
		try {
            await interaction.deferReply();
            const Target = interaction.options.getUser('user') || interaction.member;
            const canvas = Canvas.createCanvas(512,512);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('./images/xd.png');
            const avatar = await Canvas.loadImage(Target.displayAvatarURL({ format: 'png' }));
            context.drawImage(avatar, 38, 66, 436, 436);
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'poo.png');
            await interaction.editReply({ files: [attachment] });
		    } catch(error) {
		    	console.log(error)
		    	return interaction.reply("Errr... looks like something went wrong!");
		    }
	},
};
