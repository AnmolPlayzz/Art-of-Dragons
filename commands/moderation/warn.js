const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('warn a member!!')
        .addUserOption(option => option.setName('user').setDescription('The user to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason behind this user\'s warn')),
    async execute(interaction, client, clnt) {
    try {
        if(interaction.member.permissions.has('KICK_MEMBERS')) {
        const targe = interaction.options.getUser('user');
        const target = interaction.guild.members.cache.get(targe.id);
        const reason = interaction.options.getString('reason');
if(target.user.id === interaction.member.user.id) {
    interaction.reply("<:No:901477337437204481> You can't warn yourself!");
} else {
        const dm = new Discord.EmbedBuilder()
        .setTitle(`You were warned in ${interaction.guild.name}`)
        .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor('FF6461')
        .addFields([
            {
                name: '**__Warn Reason:__**',
                value: reason ? reason : `No reason provided`,
                inline: false
            },
            {
                name: '**__Responsible Moderator__**',
                value: interaction.user.tag,
                inline: false
            }
        ])
        .setTimestamp()

        const embed = new Discord.EmbedBuilder()
                .setTitle(`${target.user.tag} has been warned`)
                .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setColor('FF6461')
                .addFields([
                    {
                        name: '**__Warn Reason:__**',
                        value: reason? reason : `No reason provided`,
                        inline: true
                    },
                    
                    {
                        name: '**__Responsible Moderator__**',
                        value: interaction.user.tag,
                        inline: true
                    }
                ])
                .setTimestamp()

        target.send({ embeds: [dm] })
            .catch(() => interaction.channel.send("_Failed to DM this user. Possible reasons are DMs Closed / This Bot is blocked by the user / The user is a Bot_"));


        await interaction.reply({embeds: [embed]});
        clnt.connect(err => {

            clnt.db('BotDB').collection('Bans').insertOne({
                uid: target.user.id,
                user: `${target.user.tag} (${target.user.id})`,
                type: "Warn",
                reason: reason ? reason : "No reason provided",
                moderator: `${interaction.user.tag} (${interaction.user.id})`,
                date: moment(interaction.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')
            })

        });
    }
        } else {
            const nop1 = new Discord.EmbedBuilder
            nop1
                .setColor('DARK_RED')
                .setDescription('<:No:901477337437204481> You do not have the `KICK_MEMBERS` permission!')
            await interaction.reply({embeds: [nop1]});
        }
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};