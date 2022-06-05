const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('view your rank')
        .addUserOption(option => option.setName('user').setDescription('user to view rank of')),
    async execute(interaction, client, clnt) {
    try {
            const user = interaction.options.getUser('user') || interaction.user;
            const dta = await clnt.db('BotDB').collection('levels').find({
                userID: user.id
            }).toArray();
            if(dta.length === 0) {
                return interaction.reply('This user has no rank!');
            } else {
            const dtb = await clnt.db('BotDB').collection('levels').find({}).sort({ xp: -1 }).toArray();
            const rank = dtb.findIndex(x => x.userID === user.id) + 1;
            const xp = dta[0].xp;
            const lvl = dta[0].level;
            let nxtlvl = Math.round(lvl * 100);
            console.log(nxtlvl)
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
            const canvas = Canvas.createCanvas(960, 330);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage('./images/empty@1.5x.png');
            const pcnt = xp / nxtlvl;
            var width = Math.round(pcnt * 520 );
            if (width< 15) {
                width = 15;
            } else if (width > 520) {
                width = 520;
            } else {
                width = width;
            }
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
            const styles = {
                default: {font: "15px Roboto-Bold", fillStyle: "white"},
                l: {font: "15px Roboto-Light", fillStyle: "white"},
            };
            
            function roundRect(x, y, w, h, radius)
            {
                var grd = canvas.getContext('2d').createLinearGradient(222, 278, 220 + width, 288);
                grd.addColorStop(0, "#287fe8");
                grd.addColorStop(1, "#9c24d4");
              var context = canvas.getContext("2d");
              var r = x + w;
              var b = y + h;
              context.beginPath();
              context.fillStyle = grd;
              context.moveTo(x+radius, y);
              context.lineTo(r-radius, y);
              context.quadraticCurveTo(r, y, r, y+radius);
              context.lineTo(r, y+h-radius);
              context.quadraticCurveTo(r, b, r-radius, b);
              context.lineTo(x+radius, b);
              context.quadraticCurveTo(x, b, x, b-radius);
              context.lineTo(x, y+radius);
              context.quadraticCurveTo(x, y, x+radius, y);
              context.fill();
            }

            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            context.font = "30px Roboto-Bold";
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.fillText(user.tag, 960/2, 234);
            context.font = "16px Roboto-Thin";
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.fillText(`Level: ${lvl}      Rank: #${rank}`, 960/2, 261);
            context.fillStyle = "rgba(255, 255, 0, .5)";
            roundRect(220, 275, width, 17, 10);

            context.font = "11pt Roboto-Bold";
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.fillText(`${xp}/${nxtlvl} XP`, 960/2, 289);
            context.beginPath();
            context.arc(480, 105, 162/2 , 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            context.drawImage(avatar, 399, 24, 162, 162);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank.png');
            await interaction.reply({files: [attachment]});
            }
    } catch(error) {
        console.log(error)
        return interaction.reply('Errr... looks like something went wrong!');
    }
    },
};