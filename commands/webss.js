const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('webss')
		.setDescription('Screenshot a website.')
        .addStringOption(option => option.setName('url').setDescription('The URL.').setRequired(true)),
	async execute(interaction) {
		try {

			const urls = interaction.options.getString('url');
			if (!urls)
			  return interaction.reply(`Give a valid link.`)
			if (urls.length < 8)
			  return interaction.reply("uhh, that does not look like a valied like.")
			
			  await interaction.deferReply({ ephemeral: true });

			const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
			const { body } = await fetch(
					`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
				  );

			await interaction.editReply(
					{ content: "Here's a screenshot from the given URL",
					  files: [{ attachment: body, name: "Screenshot.png",
					ephemeral: true }]
					}
				  );

		} catch(error) {
			console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
		}
	},
};