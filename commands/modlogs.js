const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
const paginationEmbed = require('discordjs-button-pagination');

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
                uid: ur.id
            }).toArray();

            let count = 0;
            const logstext = logs.map(log => `**#${count = count+1}**\n❓ Reason: \`${log.reason}\`\n🗂 Type: \`${log.type}\`\n⚒ Mod: \`${log.moderator}\`\n📅 Date and time: \`${log.date}\``).join('\n\n');
            console.log(logstext);
            const split = logstext.split('\n\n');
            const pages = split.map(log => {
                return new Discord.MessageEmbed()
                    .setColor('2f3136')
                    .setTitle(`Moderation logs for ${ur.tag}`)
                    .setThumbnail(ur.avatarURL())
                    .setDescription(log)
                    .setFooter(`Total logs: ${count}`);
            });
            const button1 = new Discord.MessageButton()
            .setCustomId('previousbtn')
            .setLabel('Previous')
            .setStyle('DANGER');
            const button2 = new Discord.MessageButton()
            .setCustomId('nextbtn')
            .setLabel('Next')
            .setStyle('SUCCESS');
            const buttonList = [
                button1,
                button2
            ]
            paginationEmbed(interaction, pages, buttonList);
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};