const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('View a roles\'s info')
        .addRoleOption(option => option.setName('role').setDescription('The role to view').setRequired(true)),
    async execute(interaction, client) {
    try {
        
        const role = interaction.options.getRole('role');

        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mentionPermissions = role.permissions.toArray() === null ? "None" : role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        const flr = finalPermissions.join(', ')
        const embed = new Discord.EmbedBuilder()
            .setColor(role.hexColor.toUpperCase())
            .setFooter(`Requested by ${interaction.user.tag} `)
            .setTimestamp()
            .setTitle('Role Information')
            .addFields(
                { name: 'Role Name', value: `${role.name}`, inline:true },
                { name: 'Role ID', value: `${role.id}`, inline:true },
                { name: 'Hex Color', value: `${role.hexColor.toUpperCase()}` , inline:true },
                { name: 'Members', value: `${role.members.size}`, inline:true },
                { name: 'Hoisted', value: `${role.hoist ? 'Yes' : 'No'}`, inline:true },
                { name: 'Mentionable', value: `${role.mentionable ? 'Yes' : 'No'}`, inline:true },
                { name: 'Created date', value: `${moment(role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - role.createdTimestamp) / 86400000)} day(s) ago`, inline:true },
                { name: 'Key Permissions', value: `${flr? flr : "none"}`, inline:true }
            )
        return interaction.reply({embeds: [embed]});

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};