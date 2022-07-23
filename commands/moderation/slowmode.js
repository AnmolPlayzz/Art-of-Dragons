const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Set the slowmode of a channel.')
        .addStringOption(option => option.setName('reason').setDescription('The reason behind slowmode change.').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('Time in seconds.').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to set the slowmode.').setRequired(false)),
        
	async execute(interaction) {
		try {
            if(interaction.member.permissions.has('MANAGE_CHANNELS')) {
            const time = interaction.options.getString('time');
            const channel = interaction.options.getChannel('channel') || interaction.channel; ;
            const reason = interaction.options.getString('reason');
                if(time > 21600) return interaction.reply("Please provide a time less than 6 hours.");
                if(time < 1) return interaction.reply("Please provide a time greater than 1 seconds.");
                if(reason.length > 512) return interaction.reply("Please provide a reason less than 512 characters.");
                if(channel.type !== "text") return interaction.reply("Please provide a text channel.");
                if(isNaN(time)) {
                    return interaction.reply("Provide a valied time")
                } else {
                    const embed = new Discord.EmbedBuilder();
                
                    embed
                        .setDescription(`✅ | \`Set slowmodee to ${time} || Reason: ${reason}\``)
                        .setColor("GREEN")
                    
                    channel.setRateLimitPerUser(time , `${reason} - Provided by ${interaction.user.tag}`)
            
                    interaction.reply({ embeds: [embed] });
                }
            } else {
                return interaction.reply("You don't have the `MANAGE_CHANNELS` permission.");
            }
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
