const Discord = require("discord.js")
const Command = require("../../Client/Command")

module.exports = new Command({
     name : "help", 
     description : "Permet de voir les commandes du bot", 
     category : "RPG",
     permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
     use: "help", 
     async run(bot, message, args, db){
          const Embed = new Discord.MessageEmbed()
          .setTitle("Toutes les Commandes de ๖̶ζ͜͡Royale MMO")
          .setDescription(`
\`\`\`yaml
------------------
- /start : Permet de commencer une aventure sur ๖̶ζ͜͡Royale  MMO
- /inventory : Permet d"ouvrir votre inventaire 
- /useticket : Pour utiliser les tickets de Tirage ! 
------------------
- /daily : Pour récupèrer vos récompenses journalières. 
- /weekly : Pour récupèrer vos récompenses hebdomadaires. 
- /monthly : Pour récupèrer vos récompenses mensuelles. 
------------------
- /shop : Permet d"ouvrir la boutique.
- /buy : Permet d"acheter un article dans le shop. 
- /merge : Permet de mélanger des potions. 
- /market : Permet d'ouvrir le market.
------------------
- /sponsor : Permet de regarder ses revenus sur le code de parrainage.
- /claim-sponsor : Permet d'appliquer un code de sponsor a votre compte.
- /custom-sponsor : Permet de modifer le code de sponsor que vous pouvez partager a vos amis.
- /create-sponsor : Permet de créer un code de parrainage que vous pouvez partager a vos amis.
------------------
\`\`\`           
          `)
          .setColor(bot.color)

          message.reply({embeds : [Embed]})
     }
})