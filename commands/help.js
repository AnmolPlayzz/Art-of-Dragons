const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get the help menu!'),
	async execute(interaction, client) {
        const embed = new Discord.MessageEmbed()
        embed
        .setTitle('Hey!')
        .setDescription("This bot has moved to slash commands. Use `/` to bring up all the commands.\nUse the Drop Down Menu given below to navigate through the help menu")
        .setColor("AQUA")
        .setTimestamp()
        .setFooter(`Requested by ${interaction.user.tag}`)
        const embed2 = new Discord.MessageEmbed()
        embed2
        .setTitle("Fun Commands")
        .setDescription(
            `**/say (text):** Sends the same message as what you type.\n` +
            `**/nitro:** Get free Discord Nitro!!!!! (credit to @Awesome Stickz#9689 for the code)\n` +
            `**/trash (user):** Puts the person's PFP into a trash can.\n` +
            `**/hug (user):** Hug someone!\n` +
            `**/sus (user):** Makes a sus image of the target!\n` +
            `**/desktop (user):** Makes a desktop image of the target.\n` +
            `**/poo (user):** Makes a poo image of the target.\n` +
            `**/prison (user):** Makes a prison image of the target.\n` +
            `**/wasted (user):** Makes a wasted image of the target.\n` +
            `**/triggered (user):** Makes a tiggered gif of the target.\n` +
            `**/clyde (text):** Makes an image with clyde saing the text you put in.\n` +
            `**/webss (url):** Get a screenshot of the given url\n` +
            `**/insult (user):** Get a random insult\n` +
            `**/meme:** Get a random meme from reddit\n`
        )
        .setColor("ORANGE")
        .setFooter(`Requested by ${interaction.user.tag}`)
        .setTimestamp()
        const embed3 = new Discord.MessageEmbed()
        embed3
        .setTitle("Miscellanous Commands")
        .setDescription(
            `**/help:** Gives the list of all the commands.\n` +
            `**/ping:** Pings the bot!\n` +
            `**/info:** Shows the info of the bot.\n`
        )
        .setColor("YELLOW")
        .setFooter(`Requested by ${interaction.user.tag}`) 
        .setTimestamp()
        const embed4 = new Discord.MessageEmbed()
        embed4
        .setTitle("Utility Commands")
        .setDescription(
            `**/avatar (user):** Sends the Profile Picture / GIF of the mentioned user.\n` +
            `**/membercount:** Sends the total number of members in the server.\n` +
            `**/countdown:** Runs a countdown timer of 3 seconds.\n` +
            `**/calc:** Get a button calculator.\n` +
            `**/poll (time) (text):** Create a Poll.\n` +
            `**/userinfo (user):** Get a user's info.\n` +
            `**/roleinfo (role):** Get a role's info.\n` +
            `**/serverinfo:** Get this server's info.\n` +
            `**/roles:** Get a list of the roles in this server.\n` +
            `**/embed:** Make an embed.\n`
        )
        .setColor("RED")
        .setFooter(`Requested by ${interaction.user.tag}`) 
        .setTimestamp()
        
        const embed5 = new Discord.MessageEmbed()
        embed5
        .setTitle("Discord Together Commands")
        .setDescription(
            `**/yt:** Generate a YouTube Together invite code\n` +
            `**/chess:** Generate a Chess Together invite code`
        )
        .setColor("DARK_ORANGE")
        .setFooter(`Requested by ${interaction.user.tag}`)
        .setTimestamp()

        const embed6 = new Discord.MessageEmbed()
        embed6
        .setTitle("Game Commands")
        .setDescription(
            `**/ttt (user):** Play Tic-Tac-Toe with an opponent\n` +
            `**/snake:** Play the classic snake game\n` +
            `**/wyr:** The Would-You-Rather game`
        )
        .setColor("DARK_RED")
        .setFooter(`Requested by ${interaction.user.tag}`)
        .setTimestamp()
        const embed7 = new Discord.MessageEmbed()
        embed7
        .setTitle("Moderation Commands")
        .setDescription(
            `**/ban (user) (reason):** Ban a member\n` +
            `**/kick (user) (reason):** Kick a member\n` +
            `**/mute (user) (time) (reason):** Mute a member\n` +
            `**/warn (user) (reason):** Warn a member and save it to the database\n` +
            `**/modlogs (user):** Get the mod logs of a member\n` +
            `**/mylogs:** Get your mod logs\n` +
            `**/purge (amount):** Purge messages\n` +
            `**/slowmode (time) (reason):** Set this channel's slowmode`
        )
        .setColor("RED")
        .setFooter(`Requested by ${interaction.user.tag}`)
        .setTimestamp()
       
        const embed8 = new Discord.MessageEmbed()
        embed8
        .setTitle("Leveling Commands")
        .setDescription(
            `**/rank (user):** View the level of a person\n` +
            `**/leaderboard:** View the server leaderboard\n` +
            `**/setlevel (user) (level):** Set the level of a user.\n`
        )
        .setColor("PURPLE")
        .setFooter(`Requested by ${interaction.user.tag}`)
        .setTimestamp()

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('sel')
                    .setPlaceholder('Choose a Category')
                    .addOptions([
                        {
                            label: "Misc. Commands",
                            value: "a",
                            description: "Miscellanous Commands",
                            emoji: "✨"
                        },
                        {
                            label: "Fun Commands",
                            value: "b",
                            description: "Fun Commands",
                            emoji: "😂"
                        },
                        {
                            label: "Utility Commands",
                            value: "c",
                            description: "Utility Commands",
                            emoji: "⚒"
                        },
                        {
                            label: "Discord Together Commands",
                            value: "d",
                            description: "Discord Together Commands",
                            emoji: "🔱"
                        },
                        {
                            label: "Game Commands",
                            value: "e",
                            description: "Game Commands",
                            emoji: "🎮"
                        },
                        {
                            label: "Moderation Commands",
                            value: "f",
                            description: "Moderation Commands",
                            emoji: "🔨"
                        },
                        {
                            label: "Leveling Commands",
                            value: "h",
                            description: "Leveling Commands",
                            emoji: "🏆"
                        },
                        {
                            label: "Main Menu",
                            value: "g",
                            description: "The Main Menu",
                            emoji: "🏡"
                        }
                    ])
            )
        try {
        const MESSAGE = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true});
        client.on('interactionCreate', async interaction => {
            if (interaction.isSelectMenu()){
              if(interaction.customId === "sel"){
                if(interaction.values[0] === 'a') {
                    await interaction.update({ embeds: [embed3], components: [row] })
                }
                if(interaction.values[0] === 'b') {
                    await interaction.update({ embeds: [embed2], components: [row] })
                }
                if(interaction.values[0] === 'c') {
                    await interaction.update({ embeds: [embed4], components: [row] })
                }
                if(interaction.values[0] === 'd') {
                    await interaction.update({ embeds: [embed5], components: [row] })
                }
                if(interaction.values[0] === 'e') {
                    await interaction.update({ embeds: [embed6], components: [row] })
                }
                if(interaction.values[0] === 'f') {
                    await interaction.update({ embeds: [embed7], components: [row] })
                }
                if(interaction.values[0] === 'g') {
                    await interaction.update({ embeds: [embed], components: [row] })
                }
                if(interaction.values[0] === 'h') {
                    await interaction.update({ embeds: [embed8], components: [row] })
                }
              }
            }
          });
        } catch(error) {
            console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
        }
	},
};
