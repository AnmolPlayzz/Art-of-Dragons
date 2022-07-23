const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Stats about the bot.'),
	async execute(interaction, client) {
	    try {

            let totalSeconds = interaction.client.uptime / 1000;
            const days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
    
            const uptime = `\`\`\`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds\`\`\``;
    
            const embed = new Discord.EmbedBuilder()
            .setTitle(`${interaction.client.user.username} Stats`)
            .addFields(
              { name: "Servers:", value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true },
              { name: "Users:", value: `\`\`\`${client.users.cache.size}\`\`\``, inline: true },
              { name: "Channels",value: `\`\`\`${client.channels.cache.size}\`\`\``, inline: true },
              { name: "Uptime: ", value: uptime , inline: true },
              { name: "Ping:",value: `\`\`\`${Math.round(interaction.client.ws.ping)} ms\`\`\``, inline: true },
              { name: "RAM: ", value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true  },
              { name: "Node.js Version", value: `\`\`\`${(process.version)}\`\`\``, inline: true },
              { name: "Operating System", value: `\`\`\`${(process.platform)}\`\`\``, inline: true },
              { name: "Architecture", value: `\`\`\`${(process.arch)}\`\`\``, inline: true }
            )
              .setColor("3498DB")
            
     return interaction.reply({embeds: [embed]})

		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
