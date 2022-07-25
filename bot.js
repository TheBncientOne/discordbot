const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let isReady = true

let keywords = fs.readdirSync('./muzika/');

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);

});

bot.on('voiceStateUpdate', (oldState, newState) => {
    if(newState.id === bot.user.id && newState.serverMute) 
    {
        newState.setMute(false);
    }
});

bot.on('message', message =>{
    try
    {
        let vc = message.member.voice.channel
        if (!vc && message.member.id !== bot.user.id){
            message.reply('vlez vuv vc we bot')
        } else {
            let zaglavie = message.content +'.mp3'
            if (message.content === 'napusni') vc.leave();
            else if (keywords.includes(zaglavie)){
                message.reply('puskam shefe')
                joinVCMUSIC(vc, zaglavie)
            }
            else if (message.content === 'gei') message.reply({files:[cringe('./cringe/')]})
            else if (message.content === 'bashta') message.reply({files:[cringe('./peiki/')]})
        }
    } 
    catch (DiscordAPIError) {}
});

function joinVCMUSIC(voiceChannel, AudioName)
{   
    isReady = false;
    if (!voiceChannel){
      isReady = true
    } else {
        voiceChannel.join().then(connection =>{
            console.log("Playing " + AudioName + " in server " + voiceChannel.guild.name + " at", new Date().toLocaleTimeString());
            isPlaying = true
            connection.on("disconnect", () =>{
                isReady = true
            })
            let dispatcher = connection.play('./muzika/'+AudioName);
            dispatcher.on("finish", () => {
                voiceChannel.leave();
                isReady = true
            });
        }).catch(err => console.log(err));
    }
}

function cringe(path)
{
  let temp = fs.readdirSync(path)
  let snimka = temp[getRandomInt(temp.length-1)]
  return path+snimka
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

bot.login(process.env.BOT_TOKEN);
