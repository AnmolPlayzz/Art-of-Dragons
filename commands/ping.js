const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
	try {
		return interaction.reply(`Pong! ${client.ws.ping}ms.`);
	} catch(error) {
		console.log(error)
		return interaction.reply("Errr... looks like something went wrong!");
	}
	},
};
