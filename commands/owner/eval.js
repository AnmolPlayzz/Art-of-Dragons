const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evals a code snippet (Only for the bot owners aka Anmol and FiFi)')
        .addStringOption(option => option.setName('code').setDescription('The code to eval').setRequired(true)),

    async execute(interaction, client, clnt) {
    try {

        if (interaction.user.id !== '770548285656006666' && interaction.user.id !== '709270334649663538' && interaction.user.id !== '717070380795428866' && interaction.user.id !== '885771287811747851') return interaction.reply("You are not an owner");

        try {
            var code = interaction.options.getString('code');

            if (code.includes('client.token'))
                return message.reply('Dont wanna do that 0_0');
            var evaled = eval(code);

            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);

            const embed = new Discord.EmbedBuilder()
                .setColor('#a7ff85')
                .addField('📥 Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    '📤 Output: ',
                    `\`\`\`js\n${clean(evaled)}\n\`\`\``
                );
            interaction.reply({ embeds: [embed] });

        } catch (err) {
            const embed = new Discord.EmbedBuilder()
                .setColor('#ff8585')
                .addField('📥 Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    '📤 Output: ',
                    `\`\`\`${clean(err)}\`\`\``
                );
            interaction.reply({ embeds: [embed] });
        }

        function clean(text) {
            if (typeof text === 'string')
                return text
                    .replace(/`/g, '`' + String.fromCharCode(8203))
                    .replace(/@/g, '@' + String.fromCharCode(8203));
            else return text;
        }

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};