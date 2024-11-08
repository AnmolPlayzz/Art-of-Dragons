const chalk = require('chalk');
const Discord = require('discord.js');
module.exports = {

	name: 'ready',
	once: true,
	execute(client) {
    
    const embed = new Discord.EmbedBuilder();
    embed
      .setColor(3092790)
      .setImage("https://cdn.discordapp.com/attachments/916295424866914335/949235697804537886/A.png")

    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('aaa')
          .setLabel('OTD Ping')
          .setStyle(Discord.ButtonStyle.Primary)
          .setEmoji("📅"),
      );
    
    const embed1 = new Discord.EmbedBuilder();
    embed1
    .setColor(3092790)
    .setTitle("Self Roles")
    .setDescription("` OTD PING `\n<:in1:949232214636388372><@&940482544623829012>\n<:in1:949232214636388372>**Emoji:** 📅\n<:in2:949232271402078228>Get pinged on the daily    Of-The-Day Posts in <#923823709410717746>")
    
    
    //await client.channels.cache.get("940465975097196574").send({embeds: [embed]})
    //const hmm = await client.channels.cache.get("940465975097196574").send({embeds: [embed1], components: [row]})

    console.log(chalk.green.bold("Success!"))
    console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
    console.log(
      chalk.white("Watching"),
      chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
      chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
      chalk.red(`${client.guilds.cache.size}`),
      chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
    )
    console.log(
      chalk.white(`Prefix: /`),
    );
    console.log("")
    console.log(chalk.red.bold("——————————[Statistics]——————————"))
    console.log(chalk.gray(`Running on Node ${process.version} on ${process.platform} Operating System and ${process.arch} Architecture`))
    console.log(chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))
	},
};