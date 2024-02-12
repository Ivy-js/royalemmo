const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command  = require("../../Client/Command");
const fs = require("fs");
module.exports = new Command({
    name : "discord", 
    description : "Permet d'obtenir le lien du serveur discord", 
    category :  "Info", 
    permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
    use: "discord", 
    async run(bot, message, args, db){
        const Embed = new Discord.MessageEmbed()
        .setTitle("Lien du Discord")
        .setDescription(`
<:discord:1199408162894254091> Merci de rejoindre le Discord ! Le Lien : [ICI](https://discord.gg/royale-mmo) 
        `)
        .setColor("#5865F2")
        .setImage("https://cdn.discordapp.com/banners/1195908780861427852/a_b64221c05dc665000db097155fac3ce5.gif?size=1024&width=0&height=204")
        .setFooter({text : `Commande Exécutée par ${message.user.username}`, iconURL : bot.user.avatarURL({dynamic: true})})
        .setTimestamp()

        message.reply({embeds : [Embed]})
    }
})