const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chess')
		.setDescription('Create a chess together game!'),
	async execute(interaction, client) {
        const { DiscordTogether } = require('discord-together');
        const Discord = require("discord.js");
        client.discordTogether = new DiscordTogether(client);
        try {
        if(!interaction.member.voice.channel) {
            return interaction.reply("You need to be in a voice channel to play chess!");
        }  
        
        if(interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
                const ch = new Discord.MessageEmbed;
                ch
                .setAuthor('Chess', 'https://media.discordapp.net/attachments/882167333651619840/941958226272976926/kindpng_971360_1.png?width=325&height=325')
                .setTitle(`Hey!!`)
                .setDescription(`To join this activity click on the link below\n[**__Click me to join Chess!!__**](${invite.code})\n\n__**NOTE:**__ This works only for PC`)
                .setColor("FAC589")
                .setTimestamp()
                .setFooter(`Requested by ${interaction.user.tag}`)
                return interaction.reply({ embeds: [ch] });   
            });
        }
    } catch(error) {
        console.log(error)
        return interaction.reply("Errr... looks like something went wrong!");
    }
	},
};
