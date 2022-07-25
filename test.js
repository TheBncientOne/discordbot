const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let keywords = fs.readdirSync('./boikoprod/');

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (newState) => {
    console.log(newState.id)
    if(newState.id === bot.user.id && newState.serverMute) newState.setMute(false);
});


bot.on('message', message =>{
  if (message.guild.name === "novoselo" & message.member.id !== bot.user.id){
    message.reply("It's MORBIN TIME")
  }
  let losh = getRandomInt(100)
  if (losh === 1 && message.member.id!= bot.user.id) message.reply({files:['dankatalosh.png']})
  if (message.content === 'napusni')
  {
    voiceChannel = message.member.voice.channel
    voiceChannel.leave()
  }
  let user = message.mentions.members.first()
  if(user){
    let array = message.content.split(" ")
    if (array[0] === 'ed' & array[1] === 'sheeran')
    {   
      let voiceChannel = user.voice.channel
      if (!voiceChannel){ message.reply('tagni nqkoi vuv vc e bot')}
      else
      {
        joinVCMUSIC(voiceChannel, 'edsheeranbot.mp3')
      }
    }
    else if (array[0] === 'ze')
    {
      let voiceChannel = user.voice.channel
      if (!voiceChannel){ message.reply('tagni nqkoi vuv vc e bot')}
      else
      {
        joinVCMUSIC(voiceChannel, 'hihiha.mp3')
      } 
    } 
    else if (array[0] === 'dani' & array[1] === 'trans')
    {
      let voiceChannel = user.voice.channel
      if (!voiceChannel){ message.reply('tagni nqkoi vuv vc e bot')}
      else
      {
        joinVCMUSIC(voiceChannel, 'transtaxi.mp3')
      }   
    }
  } 
  else if ( message.content === 'ed sheeran')
  {
    proverki(message.member, 'edsheeranbot.mp3')
  }
  else if (message.content === 'ze')
  {
    proverki(message.member, 'hihiha.mp3')
  }
  else if(message.content === 'dani trans')
  {
    proverki(message.member, 'transtaxi.mp3')
  }
  else if(boikoprod(message.content))
  {
    let deez = './boikoprod/'+boikoprodchecker(message.content)
    proverki(message.member, deez)
  }
  else if (message.content === 'gei')
  {
    message.reply({files:[cringe('./cringe/')]})
  } 
  else if (message.content === 'bashta')
  {
    message.reply({files:[cringe('./peiki/')]})
  }
});
      
function joinVCMUSIC(voiceChannel, AudioName)
{
        voiceChannel.join().then(connection =>{
        connection.on("disconnect", () =>{
        })
          let dispatcher = connection.play(AudioName);
          dispatcher.on("finish", () => {
            voiceChannel.leave();
          });
        }).catch(err => console.log(err));
}

function cringe(path)
{
  let temp = fs.readdirSync(path)
  let snimka = temp[getRandomInt(temp.length-1)]
  return path+snimka
}

function proverki( member, pesen){
  let voiceChannel = member.voice.channel
  if (voiceChannel){
    joinVCMUSIC(voiceChannel, pesen)
  }
}

function boikoprod(message){
  message+='.mp3'
  let check = false
  for (let i = 0; i < keywords.length; i++) {
    if (message === keywords[i]) check = true
  }
  return check
}
function boikoprodchecker(message)
{
  let str = ''
  message+='.mp3'
  for(let i = 0; i < keywords.length; i++)
  {
    if (message === keywords[i]) str = message
  }
  return str
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

bot.login(process.env.BOT_TOKEN);
