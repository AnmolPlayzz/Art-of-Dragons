const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const moment = require("moment");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('View the info about a user.')
		.addUserOption(option => option.setName('user').setDescription('The user')),
	async execute(interaction) {
		try {
			const Target = interaction.options.getUser('user') || interaction.member;
            const Member = interaction.guild.members.cache.get(Target.id);
            const usr = new Discord.EmbedBuilder;
            usr
            .setAuthor(`${Member.user.tag}`, Member.user.avatarURL({ dynamic: true }))
            .setTitle(`User Info`)
            .setColor(`2f3136`)
            .setThumbnail(Member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(`Requested by ${interaction.member.tag}`)
            .addFields(
                {
                    name: 'ID',
                    value: `${Member.id}`,
                    inline: true
                },
                {
                    name: 'Account Creation Date',
                    value: `${moment(Member.user.createdAt).format('MMMM Do YYYY, h:mm')}`,
                    inline: true
                },
                {
                    name: 'User Joining Date',
                    value: `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm')}`,
                    inline: true
                },
                {
                    name: `Roles`,
                    value: `_ _${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`,
                    inline: true
                },
                {
                    name: 'Avatar URL',
                    value: `[Click Me!!](${Member.user.displayAvatarURL({ dynamic: true, size: 2048 })})`,
                    inline: true
                }
            )
         await interaction.reply({ embeds: [usr] })
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
