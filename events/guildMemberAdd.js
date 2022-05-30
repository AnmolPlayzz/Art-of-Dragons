const chalk = require('chalk');
const Canvas = require('canvas');
const Discord = require('discord.js');
const { welcomerole , welcomechannel } = require("../config.json");
module.exports = {

	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
        const channel = member.guild.channels.cache.find(
            c => c.id == welcomechannel
        );
    
        const mem = member;
        const moment = require("moment");
        const role = member.guild.roles.cache.find(r => r.id === welcomerole)
        Canvas.registerFont("./Fonts/Roboto-Black.ttf", { family: 'Roboto-Black' });
        Canvas.registerFont("./Fonts/Roboto-BlackItalic.ttf", { family: 'Roboto-BlackItalic' });
        Canvas.registerFont("./Fonts/Roboto-Bold.ttf", { family: 'Roboto-Bold' });
        Canvas.registerFont("./Fonts/Roboto-BoldItalic.ttf", { family: 'Roboto-BoldItalic' });
        Canvas.registerFont("./Fonts/Roboto-Italic.ttf", { family: 'Roboto-Italic' });
        Canvas.registerFont("./Fonts/Roboto-Light.ttf", { family: 'Roboto-Light' });
        Canvas.registerFont("./Fonts/Roboto-LightItalic.ttf", { family: 'Roboto-LightItalic' });
        Canvas.registerFont("./Fonts/Roboto-Medium.ttf", { family: 'Roboto-Medium' });
        Canvas.registerFont("./Fonts/Roboto-MediumItalic.ttf", { family: 'Roboto-MediumItalic' });
        Canvas.registerFont("./Fonts/Roboto-Regular.ttf", { family: 'Roboto-Regular' });
        Canvas.registerFont("./Fonts/Roboto-Thin.ttf", { family: 'Roboto-Thin' });
        Canvas.registerFont("./Fonts/Roboto-ThinItalic.ttf", { family: 'Roboto-ThinItalic' });
        const canvas = Canvas.createCanvas(1280, 640);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./images/frame_2.0.png');
      
        const avatar = await Canvas.loadImage(mem.displayAvatarURL({ format: 'png' }));
          context.drawImage(background, 0, 0, canvas.width, canvas.height);
          context.font = "47.97px Roboto-Bold";
          context.fillStyle = '#ffffff';
          context.fillText(member.user.username, 38.5, 88.5);
          context.font = "19.99px Roboto-Light";
          context.fillStyle = '#ffffff';
          context.fillText(moment(member.user.createdAt).format('DD MMMM YYYY'), 150.5, 437.5);
          context.font = "19.99px Roboto-Light";
          context.fillStyle = '#ffffff';
          context.fillText(moment(member.user.joinedAt).format('DD MMMM YYYY'), 150.5, 538.5);
          context.font = "19.99px Roboto-Light";
          context.fillStyle = '#ffffff';
          context.fillText(`#${member.guild.memberCount}`, 150.5, 344.5);
          context.font = "21.99px Roboto-Light";
          context.fillStyle = '#ffffff';
          context.fillText(`#${member.user.discriminator}`, 40, 119);
          context.beginPath();
            context.arc(1028.5, 329.5, 147 , 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            context.drawImage(avatar, 881.5, 182.5, 294, 294);
          const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');
          member.roles.add(role)
          channel.send({content: `Hey <@!${member.id}>!! Welcome to **CoolCord**!\n\n<:JoinedDiscord:914911748216213546> **Joined Discord**┃${(moment(member.user.createdAt).format('DD MMMM YYYY'))}\n<:JoinedServer:914911748383969300> **Joined This Server**┃${(moment(member.user.joinedAt).format('DD MMMM YYYY'))}\n<:MemberCount:914911748404957215> **Member no.**┃${member.guild.memberCount}\n\n**Thanks for Joining!!**`, files: [attachment]})
          member.send({content: `Hey <@!${member.id}>!! Welcome to **CoolCord**!\n\n<:JoinedDiscord:914911748216213546> **Joined Discord**┃${(moment(member.user.createdAt).format('DD MMMM YYYY'))}\n<:JoinedServer:914911748383969300> **Joined This Server**┃${(moment(member.user.joinedAt).format('DD MMMM YYYY'))}\n<:MemberCount:914911748404957215> **Member no.**┃${member.guild.memberCount}\n\n**Thanks for Joining!!**`, files: [attachment]});

	},
};