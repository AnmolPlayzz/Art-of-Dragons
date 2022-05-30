const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageButton } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('nitro')
        .setDescription('FREE NITRO!!'),
    async execute(interaction, client) {
    try {
            
        const embed = new Discord.MessageEmbed().setTitle("You've been gifted a subscription!").setColor('#2f3136').setDescription('**Anmol#4838** gifted you Nitro for **1 month!**').setThumbnail('https://cdn.discordapp.com/attachments/912064093316333648/941298775014658078/nitro.png');

        const row = new Discord.MessageActionRow().addComponents(new MessageButton().setCustomId('nitroAccept').setLabel('Accept').setStyle('SUCCESS'));
        interaction.reply({embeds: [embed], components: [row]})
    
        client.on('interactionCreate', (interaction) => {
        if (interaction.customId === 'nitroAccept') {interaction.reply({ content: 'https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713', ephemeral: true });
        };
    });    

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};