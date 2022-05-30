const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Info about this server.'),
    async execute(interaction, client) {
    try {
          
        const text = interaction.guild.channels.cache.size - interaction.guild.channels.cache.filter(c => c.type !== "GUILD_VOICE").size - interaction.guild.channels.cache.filter(c => c.type !== "GUILD_CATEGORY").size;
        const server = new Discord.MessageEmbed
        server
        .setAuthor(
            interaction.guild.name,
            interaction.guild.iconURL({ dynamic: true })
        )
        .setTitle(`Server Info`)
        .setColor(`2f3136`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp(interaction.createdTimestamp)
        .setFooter(`Requested by: ${interaction.user.tag}`)
        .addFields(
            {
                name: 'Server Owner',
                value: `<@${interaction.guild.ownerId}>`,
                inline: true
            },
            {
                name: "ID",
                value: `${interaction.guild.id}`,
                inline: true
            },
            {
                name: 'Creation Date',
                value: `${moment(interaction.guild.createdAt).format('MMMM Do YYYY, h:mm:ss')}`,
                inline: true
            },
            {
                name: 'Members',
                value: `${interaction.guild.memberCount} Total Members`,
                inline: true
            },
            {
                name: `Total channels: ${interaction.guild.channels.cache.filter(c => c.type !== "GUILD_CATEGORY").size}`,
                value: `**Text:** ${interaction.guild.channels.cache.filter(c => c.type == "GUILD_TEXT").size}\n**Voice:** ${interaction.guild.channels.cache.filter(c => c.type == "GUILD_VOICE").size}`,
                inline: true
            },
            {
                name: 'Roles',
                value: `${interaction.guild.roles.cache.size - 1} Total Roles`,
                inline: true
            }
        )


     await interaction.reply({ embeds: [server] })

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};