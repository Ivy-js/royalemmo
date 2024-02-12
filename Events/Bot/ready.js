const Discord = require("discord.js")
const Event = require("../../Client/Event")
const SlashCommand= require("../../Client/SlashCommand")
module.exports = new Event("ready", async (bot, message) => {
    const db = bot.db

    
    SlashCommand(bot)
    console.log("[API]".green + " Connecté a Discord")
    console.log("[API]".green +  "/ Tag : " + bot.user.tag + " / ID : " + bot.user.id + " / Users : " + bot.users.cache.size + " / Guilds : " + bot.guilds.cache.size)
    bot.user.setActivity(`l'ouverture du bot le 27/01`, {type: "WATCHING"})
    console.log(`
    -----------------------------------
    |  ╦═╗╔═╗╦ ╦╔═╗╦  ╔═╗  ╔╦╗╔╦╗╔═╗  |
    |  ╠╦╝║ ║╚╦╝╠═╣║  ║╣   ║║║║║║║ ║  | 
    |  ╩╚═╚═╝ ╩ ╩ ╩╩═╝╚═╝  ╩ ╩╩ ╩╚═╝  |      
    |        by ๖̶ζ͜͡khaleesi#4444     |
    |           v2 by ivy.js        |    
    -----------------------------------
    `.cyan)
    
    

    let g = bot.guilds.cache.get("1195908780861427852")
    g.channels.cache.forEach(ch => {
        if(ch.id === "1201273574485397685") return; 
        else ch.delete()
    })
    let a = g.channels.cache.get("1201273574485397685")
    await a.send(`
Merci. Merci. Et Merci. 

C'est la fin de ce projet qui m'aura pris un sacré bout de mon temps. La fin d'un projet qui m'aura permis de re-apprendre un peut tout ce que j'avais perdu. La fin d'un projet qui m'a fait rencontré des personnes dans le milieu de l'informatique ou encore dans l'envie de jouer a mon bot. §
Merci a tous ceux / celles qui ont crû en moi, votre soutien m'as été d'une grande aide précieuse et puissante. 
C'est avec regret, que je vous annonce, la fin de ${bot.user}...
*Je parle de moi la non ?* 

Si vous faites parti des chanceux, encore ici, bravo à vous. 
Ce serveur va être ré-utilisé dans la création d'un espace privé et safe pour toutes et tous. 
Rendez vous ce soir. 22h 
@everyone
    `)
})
