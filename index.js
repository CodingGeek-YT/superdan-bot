require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const randomPuppy = require('random-puppy')
client.login(process.env.BOT_TOKEN)

client.on("ready", async () => {
  console.log(`${client.user.username} has logged in!`)
  client.user.setActivity("Aurora Ferries", { type: "WATCHING" })
})

client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;

  let prefix = ".";
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if(cmd === `${prefix}ban`){
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINSTRATOR"])) return message.reply("You do not have sufficient permissions!")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!banMember) return message.reply("Please provide a user!");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "no reason given"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINSTRATOR"])) return message.reply("I do not have sufficient permissions!")
    banMember.send(`Hello, you were banned from ${message.guild.name} for: ${reason}`).then(() => {
      message.guild.ban(banMember, { days: 1, reason: reason})
  }).catch(err => {
    console.log(err)
    message.channel.send("Failed to ban the member!")
    return;
  })
    message.channel.send("Banned the member!")

}
if(cmd === `${prefix}unban`){
  if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINSTRATOR"])) return message.reply("You do not have sufficient permissions!")
  let bannedMember = await client.fetchUser(args[0])

  if(!bannedMember) return message.reply("Please provide a **user id**!")

  let ureason = args.slice(1).join(" ")
  if(!ureason) reason = "no reason given"
  if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINSTRATOR"])) return message.reply("I do not have sufficient permissions!")
  message.guild.unban(bannedMember, {reason: ureason})
  message.channel.send(`${bannedMember.tag} has been unbanned successfully`).catch(err => console.log(err))
}
if(cmd === `${prefix}kick`){
  if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINSTRATOR"])) return message.reply("You do not have sufficient permissions!")

  let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);

  if(!kickMember) return message.reply("Please provide a user!");

  let zreason = args.slice(1).join(" ");
  if(!zreason) reason = "no reason given"


  if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINSTRATOR"])) return message.reply("I do not have sufficient permissions!")
  kickMember.send(`Hello, you were kicked from ${message.guild.name} for: ${zreason}`).then(() => {
    kickMember.kick()
}).catch(err => {
  console.log(err)
  message.channel.send("Failed to boot the member!")
  return;
});
  message.channel.send("Booted the member!")
}
if(cmd === `${prefix}mute`){
  if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You do not have sufficient permissions!")
  if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.reply("I do not have sufficient permissions!")
  let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mutee) return message.reply("Please specify a user to mute!")

  let role = message.guild.roles.find(r => r.name === "Verified")
  if(!role) return message.reply('Ask an admin to create the role \'Verified\' and give it perms (remember it\'s caps sensitive');
  let muteRole = message.guild.roles.find(r => r.name === "Muted")
  if(!muteRole) return message.reply('Ask an admin to create the role \'Muted\' and give it perms (remember it\'s caps sensitive');
  mutee.removeRole(role.id)
  mutee.addRole(muteRole.id).then(() => {
    message.channel.send("Muted that member!")
    mutee.send("You were muted in the server!")
  }).catch(err => {console.log(err)})
}
if(cmd === `${prefix}unmute`){
  if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You do not have sufficient permissions!")
  if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.reply("I do not have sufficient permissions!")
  let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mutee) return message.reply("Please specify a user to mute!")

  let role = message.guild.roles.find(r => r.name === "Verified")
  if(!role) return message.reply('Ask an admin to create the role \'Verified\' and give it perms (remember it\'s caps sensitive');
  let muteRole = message.guild.roles.find(r => r.name === "Muted")
  if(!muteRole) return message.reply('Ask an admin to create the role \'Muted\' and give it perms (remember it\'s caps sensitive');
  mutee.addRole(role.id)
  mutee.removeRole(muteRole.id).then(() => {
    message.channel.send("Unmuted that member!")
    mutee.send("You were Unmuted in the server!")
  }).catch(err => {console.log(err)})
}
if(cmd === `${prefix}meme`){
  const subReddits = ["dankmeme", "meme", "me_irl"];
  const random = subReddits[Math.floor(Math.random() * subReddits.length)];

  const img = await randomPuppy(random);
  const memeEmbed = new Discord.RichEmbed()
  .setColor('#5780cd')
  .setImage(img)
  .setTitle(`From /r/${random}`)
  .setURL(`https://reddit.com/r/${random}`)

  message.channel.send({embed: memeEmbed})
}
if(cmd === `${prefix}ping`){
  message.channel.send("@everyone")
}
if(cmd === `${prefix}announce`){
  if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.reply("You do not have sufficient permissions!")
  if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.reply("I do not have sufficient permissions!")
  let argsresult;
  let mChannel = message.mentions.channels.first()

  message.delete()

  if(mChannel) {
    argsresult = args.slice(1).join(" ")
    mChannel.send(argsresult)
  } else {
    argsresult = args.join(" ")
    message.channel.send(argsresult)
  }
}
if(cmd === `${prefix}purge`){
  const messagesDeleted = args[0]
  message.channel.bulkDelete(args[0]).then(() => message.channel.send(`Purged ${messagesDeleted} messages`))
}
if(cmd === `${prefix}sendhtp`){
   if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.reply("You do not have sufficient permissions!")
  if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.reply("I do not have sufficient permissions!")
  let mrEmbed = new Discord.RichEmbed()
  .setTitle("This handy guide tell you how to use our ferries!")
  .setDescription("When you join a server, you will spawn at either Portavadie or Tarbert. This is where you spawn")
  .setImage("https://i.imgur.com/lhyYEun_d.jpg?maxwidth=640&shape=thumb&fidelity=medium")
  message.channel.send({embed: mrEmbed})
  
}
})
