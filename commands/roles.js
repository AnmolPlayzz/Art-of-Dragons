const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Display server\'s roles'),
    async execute(interaction, client) {
    try {

        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const embed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(roles.join('\n'))
        await interaction.reply({embeds: [embed]});
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};