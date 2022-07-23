const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick a member!!')
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true,))
        .addStringOption(option => option.setName('reason').setDescription('The reason behind this user\'s kick')),
    async execute(interaction, client) {
        try {
            const targe = interaction.options.getUser('user');
            const target = interaction.guild.members.cache.get(targe.id);
            const reason = interaction.options.getString('reason');
            const nomem = new Discord.EmbedBuilder
            nomem
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> Provide a member to kick!!')
        
        const self = new Discord.EmbedBuilder
            self
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> I can\'t kick myself!!')
    
        const self2 = new Discord.EmbedBuilder
            self2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You can\'t kick yourself!!')
    
        const h1 = new Discord.EmbedBuilder
            h1
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> This user has a higher role position than me!! Move my role above the target\'s role.')
    
        const h2 = new Discord.EmbedBuilder
            h2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You have the same role position as the target user!!')
    
        const h3 = new Discord.EmbedBuilder
            h3
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You cannot kick this user!!')
    
        const h4 = new Discord.EmbedBuilder
            h4
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> The target member has the same highest role as me!!')
    
        const r1 = new Discord.EmbedBuilder
            r1
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> Reason must be less that 512 characters!!')
    
        const r2 = new Discord.EmbedBuilder
            r2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> I was unable to kick this user!!')
    
    
        if (!target) return interaction.reply({ embeds: [nomem] })
    
        if (target.user === client.user) return interaction.reply({ embeds: [self] })
        
        if (target.user === interaction.member.user) return interaction.reply({ embeds: [self2] })
    
        if (target.roles.highest.position > interaction.guild.me.roles.highest.position) return interaction.reply({ embeds: [h1] })
        
        if (target.roles.highest.position === interaction.member.roles.highest.position) return interaction.reply({ embeds: [h2] })
    
        if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply({ embeds: [h3] })
    
        if (target.roles.highest.position === interaction.guild.me.roles.highest.position) return interaction.reply({ embeds: [h4] })
    
        if (reason && reason.length > 512) return interaction.reply({ embeds: [r1] })
    
        if (target.kickable === false) return interaction.reply({ embeds: [r2] })
    
        const embed = new Discord.EmbedBuilder()
            .setTitle(`${target.user.tag} has been kicked`)
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor('FF6461')
            .setDescription(`**__Joined at:__** ${moment.utc(interaction.member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
            .addFields([
                {
                    name: '**__Kick Reason:__**',
                    value: reason? reason : `No reason provided`,
                    inline: true
                }, 
                {
                    name: '**__Responsible Moderator__**',
                    value: interaction.member.user.tag,
                    inline: true
                }
            ])
            .setTimestamp()
    
            const embed2 = new Discord.EmbedBuilder()
            .setTitle(`You were kicked from ${interaction.guild.name}`)
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor('FF6461')
            .addFields([
                {
                    name: '**__Kick Reason:__**',
                    value: reason? reason : `No reason provided`,
                    inline: false
                }, 
                {
                    name: '**__Responsible Moderator__**',
                    value: interaction.member.user.tag,
                    inline: false
                }
            ])
            .setTimestamp()
            try {
                target.send({ embeds: [embed2] })
                    .catch(() => interaction.channel.send("_Failed to DM this user. Possible reasons are DMs Closed / This Bot is blocked by the user / The user is a Bot_"));
                target.kick(reason).then(
                    interaction.reply({embeds: [embed]})
                )

                clnt.connect(err => {

                    clnt.db('BotDB').collection('Bans').insertMany({
                        uid: target.id,
                        user: `${target.user.tag} (${target.user.id})`,
                        type: "Kick",
                        reason: reason ? reason : "No reason provided",
                        moderator: `${interaction.user.tag} (${interaction.user.id})`,
                        date: moment(interaction.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')
                    })
       
                });
            }catch(err) {
                interaction.reply('I am unable to kick this member')
                console.log(err)
            }            

        } catch(error) {
            console.log(error)
            return interaction.reply('Errr... looks like something went wrong!');
        }
    },
};
