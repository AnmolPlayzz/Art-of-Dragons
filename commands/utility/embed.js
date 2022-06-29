const { SlashCommandBuilder } = require('@discordjs/builders');
const simplydjs = require('simply-djs');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Get an embed builder!'),
	async execute(interaction) {
		try {
        if(interaction.user.permissions.has('MANAGE_CHANNELS')) {
		await interaction.deferReply()
		simplydjs.embedCreate(interaction, {
			embedColor: '2F3136',
			credit: false,
			slash: true
		  })
        } else {
            return interaction.reply("You don't have the `MANAGE_CHANNELS` permission.");
        }
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
