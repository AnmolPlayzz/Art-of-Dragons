const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlevel')
        .setDescription('sets the level of a user')
        .addUserOption(option => option.setName('user').setDescription('The user to set the level of').setRequired(true))
        .addNumberOption(option => option.setName('level').setDescription('The level to set the user to').setRequired(true)),
    async execute(interaction, client, clnt) {
    try {
        if(interaction.member.permissions.has('MANAGE_ROLES')) {
            const user = interaction.options.getUser('user');
            const level = interaction.options.getNumber('level');
            if (level < 1) {
                return interaction.reply('<:No:901477337437204481> The level must be greater than 0!');
            } else {
            const urs = await clnt.db('BotDB').collection('levels').findOne({
                userID: user.id
            });
            console.log(urs);
            if (urs === null) {
                console.log("aaaaaaaa")
                clnt.db('BotDB').collection('levels').insertOne({ userID: user.id, level: level, xp: 0 });
                return interaction.reply(`${user.tag} was not found in the database, so they were added with a level of ${level}!`);
            } else {
            await clnt.db("BotDB").collection('levels').updateOne(
                { userID: user.id },
                {
                  $set: {
                    level: level
                  }
                });
            await interaction.reply(`${user.tag}'s level has been set to ${level} in the database!`);
            }}
        } else {
            return interaction.reply('You do not have permission to use this command!');
        }
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};