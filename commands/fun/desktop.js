const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Canvas = require('canvas');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('desktop')
		.setDescription('Makes a desktop image of the target')
        .addUserOption(option => option.setName('user').setDescription('the target user')),
	async execute(interaction) {
    try{
        const Target = interaction.options.getUser('user') || interaction.member;
        const canvas = Canvas.createCanvas(853, 480);
		const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./images/desktop.png');
        const avatar = await Canvas.loadImage(Target.displayAvatarURL({ format: 'png' }));
        context.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sus.png');
        context.strokeStyle = '#0099ff';
        interaction.reply({ files: [attachment] })
    } catch(error) {
        console.log(error)
        return interaction.reply("Errr... looks like something went wrong!");
    }
    },
};
