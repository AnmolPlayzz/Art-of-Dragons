const chalk = require('chalk');
module.exports = {

	name: 'ready',
	once: true,
	execute(client) {	
	console.clear();
    console.log(chalk.green.bold("Success!"))
    console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
    console.log(
      chalk.white("Watching"),
      chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
      chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
      chalk.red(`${client.guilds.cache.size}`),
      chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
    )
    console.log(
      chalk.white(`Prefix: /`),
      chalk.white("||"),
      chalk.red(`${client.commands.size}`),
      chalk.white(`Commands`)
    );
    console.log("")
    console.log(chalk.red.bold("——————————[Statistics]——————————"))
    console.log(chalk.gray(`Running on Node ${process.version} on ${process.platform} Operating System and ${process.arch} Architecture`))
    console.log(chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))
	},
};