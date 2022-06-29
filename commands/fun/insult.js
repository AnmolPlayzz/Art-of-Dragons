const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const insult = require("insult");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('insult')
        .setDescription('insult a member!!')
        .addUserOption(option => option.setName('user').setDescription('The user to insult').setRequired(false)),
    async execute(interaction, client) {
    try {
           
        insultString = insult.Insult();
        const target = interaction.options.getUser('user') || interaction.user;
        interaction.reply(`${target}` + " " + insultString);

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};