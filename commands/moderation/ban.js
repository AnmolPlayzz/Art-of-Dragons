const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member!!')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true,))
        .addStringOption(option => option.setName('reason').setDescription('The reason behind this user\'s ban')),
    async execute(interaction, client, clnt) {
        try{
        if(interaction.member.permissions.has('BAN_MEMBERS')) {
        const targe = interaction.options.getUser('user');
        const target = interaction.guild.members.cache.get(targe.id);
        const nomem = new Discord.MessageEmbed
        nomem
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> Provide a member to ban!!')

        const self = new Discord.MessageEmbed
        self
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> I can\'t ban myself!!')

        const self2 = new Discord.MessageEmbed
        self2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You can\'t ban yourself!!')

        const h1 = new Discord.MessageEmbed
        h1
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> This user has a higher role position than me!! Move my role above the target\'s role.')

        const h2 = new Discord.MessageEmbed
        h2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You have the same role position as the target user!!')

        const h3 = new Discord.MessageEmbed
        h3
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You cannot ban this user!!')

        const h4 = new Discord.MessageEmbed
        h4
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> The target member has the same highest role as me!!')

        const r1 = new Discord.MessageEmbed
        r1
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> Reason must be less that 512 characters!!')

        const r2 = new Discord.MessageEmbed
        r2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> I was unable to ban this user!!')


        if (!target) return interaction.reply({ embeds: [nomem] })

        if (target.user === client.user) return interaction.reply({ embeds: [self] })

        if (target.user === interaction.member.user) return interaction.reply({ embeds: [self2] })

        if (target.roles.highest.position > interaction.guild.me.roles.highest.position) return interaction.reply({ embeds: [h1] })

        if (target.roles.highest.position === interaction.member.roles.highest.position) return interaction.reply({ embeds: [h2] })

        if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({ embeds: [h3] })

        if (target.roles.highest.position === interaction.guild.me.roles.highest.position) return interaction.reply({ embeds: [h4] })
        
        const reason = interaction.options.getString('reason');

        if (reason && reason.length > 512) return interaction.reply({ embeds: [r1] })

        if (target.bannable === false) return interaction.reply({ embeds: [r2] })

        const embed = new Discord.MessageEmbed()
            .setTitle(`${target.user.tag} has been banned`)
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('FF6461')
            .setDescription(`**__Joined at:__** ${moment.utc(interaction.member.user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
            .addFields([
                {
                    name: '**__Ban Reason:__**',
                    value: reason ? reason : `No reason provided`,
                    inline: true
                },
                {
                    name: '**__Responsible Moderator__**',
                    value: interaction.user.tag,
                    inline: true
                }
            ])
            .setTimestamp()

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`You were banned from ${interaction.guild.name}`)
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('FF6461')
            .addFields([
                {
                    name: '**__Ban Reason:__**',
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
        try {
            target.send({ embed: embed2 })
                 .catch(() => interaction.channel.send("_Failed to DM this user. Possible reasons are DMs Closed / This Bot is blocked by the user / The user is a Bot_"));

            target.ban({ reason: `${reason? reason : "No reason provided"}` }).then(
                interaction.reply({ embeds: [embed] })
            )
        } catch (err) {
            interaction.reply('I am unable to ban this member')
            console.log(err)
        }
        clnt.connect(err => {
            //adds the ban to the database in mongodb

            clnt.db('BotDB').collection('Bans').insertOne({
                uid: target.id,
                user: `${target.user.tag} (${target.user.id})`,
                type: "Ban",
                reason: reason ? reason : "No reason provided",
                moderator: `${interaction.user.tag} (${interaction.user.id})`,
                date: moment(interaction.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')
            })

        });
    } else {
        const no = new Discord.MessageEmbed
        no
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You do not have the `BAN_MEMBERS` permission!')

        interaction.reply({ embeds: [no] })
    }
        } catch(error) {
            console.log(error)
            interaction.reply('Error!')
        }
    },
};
