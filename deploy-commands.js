const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFolder = fs.readdirSync('./commands');


// Place your client and guild ids here
for (const folder of commandFolder) {
	const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'));
	//convert to an object
	const commandObject = {};
	
	for (const file of commandFiles) {

		const command = require(`./commands/${folder}/${file}`);
		commandObject[command.data] = command;
		console.log(command.data);
		commands.push(command.data);
	}
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();