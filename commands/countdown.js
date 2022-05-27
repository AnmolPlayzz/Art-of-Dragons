const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('countdown')
		.setDescription('Run a countdown of 3 seconds!'),
	async execute(interaction) {
        try {
                await interaction.reply("3");
                await wait(1000);
                await interaction.editReply("2");
                await wait(1000);
                await interaction.editReply("1");
                await wait(1000);
                await interaction.editReply("0");
                await wait(1000);
                await interaction.editReply("Countdown ended!!")
        } catch(error) {
                console.log(error)
                return interaction.reply("Errr... looks like something went wrong!");
        }
	},
};
