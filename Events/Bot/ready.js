const Discord = require("discord.js")
const Event = require("../../Client/Event")
const SlashCommand= require("../../Client/SlashCommand")
module.exports = new Event("ready", async (bot, message) => {
    const db = bot.db

    
    SlashCommand(bot)
    console.log("[API]".green + " Connecté a Discord")
    console.log("[API]".green +  "/ Tag : " + bot.user.tag + " / ID : " + bot.user.id + " / Users : " + bot.users.cache.size + " / Guilds : " + bot.guilds.cache.size)
    console.log(`Invite Me : https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`)

    
    bot.user.setActivity(`l'ouverture du bot le XX/XX`, {type: "WATCHING"})
    console.log(`
    -----------------------------------
    |  ╦═╗╔═╗╦ ╦╔═╗╦  ╔═╗  ╔╦╗╔╦╗╔═╗  |
    |  ╠╦╝║ ║╚╦╝╠═╣║  ║╣   ║║║║║║║ ║  | 
    |  ╩╚═╚═╝ ╩ ╩ ╩╩═╝╚═╝  ╩ ╩╩ ╩╚═╝  |      
    |        by ๖̶ζ͜͡khaleesi#4444     |
    |           v2 by ivy.js        |    
    -----------------------------------
    `.cyan)
    
})
