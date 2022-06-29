const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('user').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		try {
			const Target = interaction.options.getUser('user') || interaction.member;
			const emb = new Discord.MessageEmbed()
			.setTitle(`${Target.tag? Target.tag : interaction.member.user.tag}\`s Avatar`)
			.setImage(Target.displayAvatarURL({ dynamic: true, size: 2048 }))
			.setColor("BLURPLE")
			return interaction.reply({ embeds: [emb] });
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
