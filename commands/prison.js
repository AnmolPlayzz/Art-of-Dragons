const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('jail')
		.setDescription('Jail someone.')
		.addUserOption(option => option.setName('user').setDescription('The target user')),
	async execute(interaction) {
		try {

            const Target = interaction.options.getUser('user') || interaction.member;
            const Member = interaction.guild.members.cache.get(Target.id);
            const link = `https://some-random-api.ml/canvas/jail?avatar=${Member.user.displayAvatarURL({ dynamic: true, format: 'png' })}`
            const attachment = new Discord.MessageAttachment(link, "jail.png")
            return interaction.reply({ files: [attachment] })

		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
