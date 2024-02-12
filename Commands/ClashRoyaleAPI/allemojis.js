const Discord = require("discord.js")
const config = require("../../Config/bot")
const Command  = require("../../Client/Command");
const fs = require("fs");
module.exports = new Command({
    name : "emo", 
    description : "Permet de trouver un joueur sur Clash Royale", 
    category : "Clash API", 
    permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
    use: "searchplayer [tag]", 
    async run(bot, message, args, db){

        
        
        
    }
})