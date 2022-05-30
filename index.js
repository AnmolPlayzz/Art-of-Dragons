
const fs = require('fs');
const { Client, Collection, Intents, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");
const { token, clientId, guildId, log } = require('./config.json');
const client = new Client({ intents: 
	[
		Intents.FLAGS.GUILDS,
	 	Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_BANS,
	]
 });

// @ts-ignore
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	
	const command = require(`./commands/${file}`);
	// @ts-ignore
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	// @ts-ignore
	
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
	}
});


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.on('messageUpdate', (oldMessage, newMessage, message) => {
	if (((oldMessage.guild || {}).id) == guildId) {
	  if (oldMessage.author.bot) return;
	  const nm = oldMessage;
	  const MessageLog = client.channels.cache.find(channel => channel.id === log);
	  const logrow1 = new MessageActionRow()
		.addComponents(
		  new MessageButton()
			.setURL(oldMessage.url)
			.setLabel('Jump to Message')
			.setStyle('LINK'),
		);
  
	  const edit = new Discord.MessageEmbed()
  
	  edit
		.setAuthor(`Message edit Log`)
		.setTitle(`${oldMessage.author.username}`)
		.setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setColor('BLURPLE')
		.addFields(
		  {
			name: `Old Message`,
			value: `${oldMessage}`,
			inline: true
		  },
		  {
			name: `New message`,
			value: `${newMessage}`,
			inline: true
		  },
		  {
			name: `Message channel`,
			value: `${oldMessage.channel}`,
			inline: false
		  }
		);
	  MessageLog.send({ embeds: [edit], components: [logrow1] });
	}
  
  });
  
  client.on('messageDelete', (message) => {
  
	if (((message.guild || {}).id) == guildId) {
	  if (message.author.bot) return;
	  const nm = message;
	  const MessageLog = client.channels.cache.find(channel => channel.id === log);
	  const del = new Discord.MessageEmbed()
  
	  del
		.setAuthor(`Message delete Log`)
		.setTitle(`${message.author.username}`)
		.setDescription(`**Deleted message content:** ${message.content} \n **Message channel:** ${message.channel}`)
		.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setColor('RED')
  
	  MessageLog.send({ embeds: [del] });
	}
  
  });
  

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId == "aaa") {
	  const otd = interaction.guild.roles.cache.get("940482544623829012")
	  if (interaction.member.roles.cache.has("940482544623829012")) {
		await interaction.member.roles.remove(otd);
		await interaction.reply({ content: "Removed **OTD Ping**", ephemeral: true })
	  } else if (!interaction.member.roles.cache.has("940482544623829012")) {
		await interaction.member.roles.add(otd);
		await interaction.reply({ content: "Added **OTD Ping**", ephemeral: true })
	  }
	}
  });


  
client.login(token);
