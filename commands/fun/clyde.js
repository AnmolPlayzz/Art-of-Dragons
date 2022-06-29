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
		const text = interaction.options.getString('text');
		const data = await fetch(
		  `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
		).then(res => res.json());
		const embed = new Discord.MessageEmbed()
		.setColor("WHITE")
		.setDescription(
			`[Click me if the image failed to load.](${data.message})`
		  )
		.setImage(data.message)
		.setTimestamp();
		interaction.reply({ content: "Generated the image!!!" , embeds: [embed] });
		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};
