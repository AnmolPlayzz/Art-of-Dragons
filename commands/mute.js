const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a member!!')
        .addUserOption(option => option.setName('user').setDescription('The user to mute').setRequired(true,))
        .addStringOption(option => option.setName('time').setDescription('The time to mute the user').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason behind this user\'s mute')),

    async execute(interaction, client) {
        try {
        if(interaction.member.permissions.has('TIMEOUT_MEMBERS')) {
        const targe = interaction.options.getUser('user');
        const target = interaction.guild.members.cache.get(targe.id);
        const time = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');
        const nomem = new Discord.MessageEmbed
        nomem
        .setColor('DARK_RED')
        .setDescription('<:No:901477337437204481> Provide a member to mute!!')
    
        const self = new Discord.MessageEmbed
            self
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> I can\'t mute myself!!')

        const self2 = new Discord.MessageEmbed
            self2
            .setColor('DARK_RED')
            .setDescription('<:No:901477337437204481> You can\'t mute yourself!!')

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
            .setDescription('<:No:901477337437204481> You cannot mute this user!!')

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
            .setDescription('<:No:901477337437204481> Invalied time.')

        const r3 = new Discord.MessageEmbed
            r3
            .setColor("DARK_RED")
            .setDescription("<:No:901477337437204481> Time must be less than 28 days.")

        if (!time) {
            interaction.reply({ embeds: [r2] });
        } else {
            const mstime = ms(time);

            if (!target) return interaction.reply({ embeds: [nomem] })

            if (target.user === client.user) return interaction.reply({ embeds: [self] })
            
            if (target.user === interaction.member.user) return interaction.reply({ embeds: [self2] })
    
            if (target.roles.highest.position > interaction.guild.me.roles.highest.position) return message.reply({ embeds: [h1] })
            
            if (target.roles.highest.position === interaction.member.roles.highest.position) return message.reply({ embeds: [h2] })
    
            if (target.roles.highest.position > interaction.member.roles.highest.position) return message.reply({ embeds: [h3] })
    
            if (target.roles.highest.position === interaction.guild.me.roles.highest.position) return message.reply({ embeds: [h4] })

            if (reason && reason.length > 512) return interaction.reply({ embeds: [r1] })

            if (mstime > "2419200000") return interaction.reply({ embeds: [r3] })

            if (mstime) {
                const embed = new Discord.MessageEmbed()
                .setTitle(`${target.user.tag} has been muted`)
                .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setColor('FF6461')
                .addFields([
                    {
                        name: '**__Mute Reason:__**',
                        value: reason? reason : `No reason provided`,
                        inline: true
                    },
                    {
                        name: `**__Mute ends in:__**`,
                        value: ms(mstime, { long: true }),
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
                .setTitle(`You were muted in ${interaction.guild.name}`)
                .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 1024}))
                .setColor('FF6461')
                .addFields([
                    {
                        name: '**__Mute Reason:__**',
                        value: reason? reason : `No reason provided`,
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
                    target.timeout(mstime, reason).then(
                        interaction.reply({embeds: [embed]})
                    )
   
                    target.send({ embeds: [embed2] })
                        .catch(() => interaction.channel.send("_Failed to DM this user. Possible reasons are DMs Closed / This Bot is blocked by the user / The user is a Bot_"));

                }catch(err) {
                    interaction.reply('I am unable to mute this member')
                    console.log(err)
                }

    } else {
        interaction.reply({ embeds: [r2] })
    }
}
}

    } catch(err) {
        console.log(err)
        interaction.reply('Errr... looks like something went wrong!');
    }
}
}