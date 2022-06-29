const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('view the leaderboard'),
    async execute(interaction, client, clnt) {
    try {
        const dtb = await clnt.db('BotDB').collection('levels').find({}).sort({ level: -1 }).toArray();
        //use .map to covert to string
        let cnt = 1;
        const dtb2 = dtb.map(x => `**#${cnt++}**<@!${x.userID}> (${x.userID}) | \`Level:\` ${x.level} - \`XP:\` ${x.xp}`).join('\n');
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Leaderboard')
            .setDescription(dtb2)
            .setTimestamp()
        return interaction.reply({embeds: [embed]});
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};