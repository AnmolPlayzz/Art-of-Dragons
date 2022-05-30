const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Number of members in the server'),
    async execute(interaction, client) {
    try {
            
        const embed = new Discord.MessageEmbed();
        const a = (interaction.guild.memberCount)
            embed
                .setTitle(`Number of members in **${interaction.guild.name}**`)
                  .setDescription( a + ` total members`)
                .setColor("BLURPLE")
    
            interaction.reply({ embeds: [embed] });

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};