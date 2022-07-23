const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const e = require('express');
const { PieChart } = require("canvas-pie-chart");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const ms = require("ms");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Poll something')
        .addStringOption(option => option.setName('question').setDescription('The question to ask').setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('The time to wait until the result is calculated.').setRequired(true)),
    async execute(interaction, client) {
    try {
        const poll = interaction.options.getString('question');
        const time = interaction.options.getString('time');
        const mstime = ms(time);

        const { RoundChart } = require('web-graphs');

        const pollembed = new Discord.EmbedBuilder()
        .setTitle('Poll')
        .setDescription(`\n\nPoll: **${poll}**\n~~+-------------------------------------+~~\nPoll ends in: **${ms(mstime, { long: true })}**`)
        .setFooter(`Created by ${interaction.user.tag}`,interaction.user.displayAvatarURL())
        .setColor("GREEN")
    
    
        if (mstime < "5000") {
            interaction.reply("Time must be more than 5 sec.")
        }else if (mstime > "600000") {
            interaction.reply("Time must be less than 10 mins.")
        }else{
    
        const msg = await interaction.channel.send({embeds: [pollembed]})
    
            msg.react('✅')
            msg.react('❌')
            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && reaction.emoji.name === '❌';
            };
            const collector = msg.createReactionCollector({ time: mstime});
    
            collector.on('collect', (reaction, user) => {
                console.log(mstime + ms(mstime));
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            });
    
    
            collector.on('end', async collected => {
                console.log(`Collected ${collected.size} items. ${(collected.filter(reaction => reaction.emoji.name == '✅').map(reaction => reaction.count)[0])}`);
                await msg.edit({ content: "Calculating resultis..." })
    
                const yes = collected.filter(reaction => reaction.emoji.name == '✅').map(reaction => reaction.count)[0] - 1;
                const no = collected.filter(reaction => reaction.emoji.name == '❌').map(reaction => reaction.count)[0] - 1;
                const all = yes + no;
                console.log(yes, no, all)
                const yesp = yes / all;
                const yespt = Math.round(yesp * 100);
                const nop = no / all;
                const nopt = Math.round(nop * 100);
    
                const progressbar = require('string-progressbar');
                var total = 100;
                var current = yespt? yespt : "0";
                const a = progressbar.filledBar(total, current, 12, "<:empty:926781585641046056>", "<:full:926781552132780092>");
                var total1 = 100; 
                var current1 = nopt? nopt : "0";
                const b = progressbar.filledBar(total1, current1, 12, "<:empty:926781585641046056>", "<:full1:926782256700358657>");
    
                const width = 256; //px
                const height = 256; //px
                const backgroundColour = 'rgb(28, 28, 33)'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
                const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});
    
                const labels = [
                    'Yes',
                    'No'
                  ];
                
                  const data = {
                      fill: false,
                    labels: labels,
                    datasets: [{
                      label: 'a',
                      backgroundColor: ['rgb(135, 227, 113)', 'rgb(254, 108, 108)'],
                      borderColor: 'white',
                      borderWidth: 1,
                      data: [yes, no],
                    }]
                  };
    
                const cfg = {
                    type: 'doughnut',
                    data: data
                }
    
                
                const image =  chartJSNodeCanvas.renderToBufferSync(cfg);
                const dataUrl = chartJSNodeCanvas.renderToDataURLSync(cfg);
                const stream = chartJSNodeCanvas.renderToStream(cfg);
                const attachment = new Discord.MessageAttachment(image, "chart.png")
    
                const res = new Discord.EmbedBuilder()
                .setTitle('Poll Results')
                .setDescription(`\nPoll: **${poll}**\n`)
                .setFields(
                    {
                        name: "✅ - Upvotes",
                        value: `${yes}\n\n${String(a).replace(",", " [")}%]`,
                        inline: false
                    },
                    {
                        name: "❌ - Downvotes",
                        value: `${no}\n\n${String(b).replace(",", " [")}%]`,
                        inline: false
                    }
                )
                .setColor("GREEN")
                .setImage('attachment://chart.png')
                msg.reactions.removeAll()
                msg.edit({ embeds: [res], files: [attachment], content: "Calculated the results!!"})
            });
        }
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};