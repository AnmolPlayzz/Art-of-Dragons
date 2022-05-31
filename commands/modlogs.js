const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('modlogs')
        .setDescription('view mod logs')
        .addUserOption(option => option.setName('user').setDescription('The user to retrieve data of.').setRequired(true)),
    async execute(interaction, client, clnt) {
    try {
        //
            const ur = interaction.options.getUser('user');
            // get all logs from mongo db database based on id
            const logs = await clnt.db('BotDB').collection('Bans').find({
                user: `${ur.tag} (${ur.id})`
            }).toArray();

            let count = 0;
            //convert logs into text
            const logstext = logs.map(log => `**#${count = count+1}**\n❓ Reason: \`${log.reason}\`\n🗂 Type: \`${log.type}\`\n⚒ Mod: \`${log.moderator}\`\n📅 Date and time: \`${log.date}\``).join('\n\n');
            console.log(logstext);
            const embeds = new Discord.MessageEmbed()
                .setColor('2f3136')
                .setTitle(`Moderation logs for ${ur.tag}`)
                .setThumbnail(ur.avatarURL())
                .setDescription(logstext)
                .setFooter(`Total logs: ${count}`);
            interaction.reply({embeds: [embeds]});
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};