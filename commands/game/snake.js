const { SlashCommandBuilder } = require('@discordjs/builders');
const { Snake } = require('discord-gamecord');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('snake')
		.setDescription('The sanke game.'),
	async execute(interaction, client) {
	try {
        new Snake({
            message: interaction,
            slash_command: true,
            embed: {
              title: 'Snake',
              color: '#5865F2',
              overTitle: 'Game Over',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            emojis: {
              board: '⬛', 
              food: '🍎',
              up: '⬆️', 
              right: '➡️',
              down: '⬇️',
              left: '⬅️',
            },
            foods: ['🍆', '🍇', '🍑'],
            stopButton: 'Stop',
            othersMessage: 'You are not allowed to use buttons for this message!',
          }).startGame();

	} catch(error) {
		console.log(error)
		return interaction.reply("Errr... looks like something went wrong!");
	}
	},
};
