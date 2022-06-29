const { SlashCommandBuilder } = require('@discordjs/builders');
const simplydjs = require('simply-djs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('calc')
		.setDescription('Get a button calculator!'),
	async execute(interaction) {
		try {
		await interaction.deferReply()
		simplydjs.calculator(interaction, {
			embedColor: '2F3136',
			credit: false,
			slash: true
		  })
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
