const keepAlive = require('./server.js');
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
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
 });

 
const { MongoClient, ServerApiVersion } = require('mongodb');
const { urlencoded } = require('express');
const { nextTick } = require('process');
const pass = encodeURIComponent("AndyL149@#")
const uri = `mongodb+srv://idk:${pass}@cluster0.1eqb8.mongodb.net/?retryWrites=true&w=majority`;
const clnt = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
clnt.connect(err => {

});


// @ts-ignore
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	
	const command = require(`./commands/**/${file}`);
	// @ts-ignore
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	// @ts-ignore
	
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client, clnt);
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

	  const nm = message;
	  const MessageLog = client.channels.cache.find(channel => channel.id === log);
	  const del = new Discord.MessageEmbed()
  
	  del
		.setAuthor(`Message delete Log`)
		.setTitle(`${message.author.tag}`)
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

  client.on('interactionCreate', async interaction => {
	var inttext;
	if (!interaction.options) {
	  inttext = "No options";
	} else {
	  inttext = interaction.options.data.map(log => `${log.name}:\`${log.value}\``).join(', ');
	}
	console.log(inttext)
	const inlog = new Discord.MessageEmbed()
	  .setAuthor(`Interaction Log`)
	  .setTitle(`${interaction.member.user.tag}`)
	  .setDescription(``)
	  .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
	  .setTimestamp()
	  .setColor('BLURPLE')
	  .addFields(
		{
		  name: `Interaction`,
		  value: `${interaction.commandName ? interaction.commandName : "Unknown - Probably a message component like buttons or select menus"}`,
		  inline: true
		},
		{
			name: `Interaction data`,
			value: `${inttext ? inttext : "No options"}`,
			inline: true
		},
		{
		  name: `Interaction channel`,
		  value: `${interaction.channel} (${interaction.channel.id})`,
		  inline: true
		},
		{
			name: `Type`,
			value: `${interaction.type}`,
			inline: true
		},
		{
			name: `Custom ID`,
			value: `${interaction.customId ? interaction.customId : "Unknown - Probably a slash command"} `,
			inline: true
		},
		{
			name: `Interaction ID`,
			value: `${interaction.id}`,
			inline: true
		},
		{
			name: `Interaction Version`,
			value: `${interaction.version}`,
			inline: true
		},

	  );
		
	
	const MessageLog = client.channels.cache.find(channel => channel.id === "980767716686323714");
	MessageLog.send({ embeds: [inlog] });
  });
  

client.on('messageCreate', async message => {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	  }
	if (message.author.bot) return;
	const lvl = await clnt.db("BotDB").collection('levels');
	//create a new record if the user doesn't exist
	const doc = await lvl.findOne({ userID: message.author.id });
	//clnt.db("BotDB").collection('levels').deleteOne({ userID: message.author.id });
	if (!doc) {
	  await lvl.insertOne({
		userID: message.author.id,
		level: 0,
		xp: 0
	  });
	} else {
		//define the variables for leach level
		const curxp = doc.xp;

		//add the xp
		await lvl.updateOne(
		  { userID: message.author.id },
		  {
			$set: {
			  xp: curxp + getRandomInt(6)
			}
		  });
		//check if xp is enough to level up
		const newdoc = await lvl.findOne({ userID: message.author.id });
		const curlvl = newdoc.level;
		const curxp2 = newdoc.xp;
		let nxtlvl = Math.round(curlvl * 100);
		//if xp is enough, level up
		console.log(nxtlvl)
		if (curxp2 >= nxtlvl) {
		  await lvl.updateOne(
			{ userID: message.author.id },
			{
			  $set: {
				level: curlvl + 1,
				xp: 0
			  }
			}).then(() => {
			  message.reply(`You have leveled up! You are now level ${curlvl + 1}`);
			}
		  );
		}
	  }
	}
);

client.login(token);

keepAlive();