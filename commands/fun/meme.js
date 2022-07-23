const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const got = require('got');
module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('random meme'),
    async execute(interaction, client) {
    try {

        const row = new Discord.ActionRowBuilderBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
          .setLabel("Next meme")
          .setStyle("PRIMARY")
          .setCustomId("meme")
        )
         got(`https://www.reddit.com/r/memes/random/.json`).then( async response => {  
  
      const content = JSON.parse(response.body)
      const permanentlink = content[0].data.children[0].data.permanentlink
      const memeURl = `https://www.reddit.com${permanentlink}`
      const memeImage = content[0].data.children[0].data.url
      const memeTitle = content[0].data.children[0].data.title
      const memeUpvotes = content[0].data.children[0].data.ups
      const memeDownVotes = content[0].data.children[0].data.downs1 
  
      const embed = new Discord.EmbedBuilder()
        embed.setTitle(`${memeTitle}`)
          .setTimestamp()
          .setURL(`${memeURl}`)
          .setColor("BLUE")
          .setFooter(`👍${memeUpvotes}`)
          .setImage(`${memeImage}`)
  
         interaction.reply({ embeds: [embed], components: [row]});
                  
      client.on('interactionCreate', interaction => {
        if (interaction.isButton()){
          if(interaction.customId === "meme"){
            got(`https://www.reddit.com/r/memes/random/.json`).then( async response => {  
              const content = JSON.parse(response.body)
              const permanentlink = content[0].data.children[0].data.permanentlink
              const memeURl = `https://www.reddit.com${permanentlink}`
              const memeImage = content[0].data.children[0].data.url
              const memeTitle = content[0].data.children[0].data.title
              const memeUpvotes = content[0].data.children[0].data.ups
              const memeDownVotes = content[0].data.children[0].data.downs1 
              const embed = new Discord.EmbedBuilder()
              embed
              .setTitle(`${memeTitle}`)
              .setTimestamp()
              .setURL(`${memeURl}`)
              .setColor("BLUE")
              .setFooter(`👍${memeUpvotes}`)
              .setImage(`${memeImage}`)
   
           interaction.update({ embeds: [embed], components: [row]})
           })
          }
        }
      });
    })

    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};