const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clyde')
		.setDescription('Make clyde say something')
        .addStringOption(option => option.setName('text').setDescription('The text you want clyde to say').setRequired(true)),
	async execute(interaction) {
		try {



		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};