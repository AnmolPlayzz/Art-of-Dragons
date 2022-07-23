const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('make the bot immitate you')
        .addStringOption(option => option.setName('message').setDescription('The message to send').setRequired(true)),
    async execute(interaction, client) {
    try {
    
        const say = interaction.options.getString('message');

        if(say.includes('<@') || say.includes('<@&') || say.includes('@everyone') || say.includes('@here')) {
            const embed = new Discord.EmbedBuilder()
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You cannot use mentions in the message!!')
            await interaction.reply({embeds: [embed]});
        } else {
            await interaction.reply("sent!");
            await interaction.channel.send(say);
        }

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};