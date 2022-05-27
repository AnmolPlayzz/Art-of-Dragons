const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yt')
		.setDescription('Create a youtube together session!'),
	async execute(interaction, client) {
        const { DiscordTogether } = require('discord-together');
        const Discord = require("discord.js");
        client.discordTogether = new DiscordTogether(client);
        try {
        if(!interaction.member.voice.channel) {
            return interaction.reply("You need to be in a voice channel to start a youtube sesion!");
        }  
        
        if(interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                const yt = new Discord.MessageEmbed;
                yt
                .setAuthor('YouTube Together', 'https://i.imgur.com/raE8eQy.png')
                .setTitle(`Hey!!`)
                .setDescription(`To join this activity click on the link below\n[**__Click me to join YouTube Together!!__**](${invite.code})\n\n__**NOTE:**__ This works only for PC`)
                .setColor("FF6565")
                .setTimestamp()
                .setFooter(`Requested by ${interaction.user.tag}`)
                interaction.reply({ embeds: [yt] });   
            });
        }
    } catch(error) {
        console.log(error)
        return interaction.reply("Errr... looks like something went wrong!");
    } 
	},
};
