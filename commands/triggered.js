const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
module.exports = {

	data: new SlashCommandBuilder()
		.setName('triggered')
		.setDescription('The classic triggered meme!.')
		.addUserOption(option => option.setName('user').setDescription('The target user')),
	async execute(interaction) {
		try {
            await interaction.deferReply();
            const Target = interaction.options.getUser('user') || interaction.member;
            const Member = interaction.guild.members.cache.get(Target.id);
            const link = `https://some-random-api.ml/canvas/triggered?avatar=${Member.user.displayAvatarURL({ dynamic: true, format: 'png' })}`;
            const attachment = new Discord.MessageAttachment(link, "triggered.gif");
            await interaction.editReply({ files: [attachment] });

		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
