const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('hug a member!!')
        .addUserOption(option => option.setName('user').setDescription('The user to hug').setRequired(false)),
    async execute(interaction, client) {
    try {
        const Target = interaction.options.getUser('user') || interaction.user;
        const canvas = Canvas.createCanvas(498, 483);
		const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./images/hug.gif');
        const avatar = await Canvas.loadImage(Target.displayAvatarURL({ format: 'png' }));
        const memberav = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png' }));
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.drawImage(avatar, 120, 46, 129, 129);
        context.drawImage(memberav, 241, 75, 129, 129);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hug.png');
        interaction.reply({ files: [attachment] });
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};