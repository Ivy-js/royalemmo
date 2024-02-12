const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command  = require("../../Client/Command");
const fs = require("fs");
module.exports = new Command({
    name : "vocal", 
    description : "Permet de savoir le nombre de gens en Vocal", 
    category :  "Stats", 
    permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
    use: "vocal", 
    ownerOnly: true,
    async run(bot, message, args, db){
        const voiceCount = message.guild.voiceStates.cache.size
        
        let Embed = new Discord.MessageEmbed() 
        .setTitle(`Nombre de gens en Vocal sur ${message.guild.name}`)
        .setDescription(`
Il y'a **${voiceCount}** en Vocal sur ${message.guild.name}
        `)
        .setColor(bot.color)
        .setFooter({text : `${bot.user.username} - ${message.guild.name}`, iconURL : message.guild.iconURL({dynamic : true})})
        message.channel.send({embeds : [Embed]})
    }
})