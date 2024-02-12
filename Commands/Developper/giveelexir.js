const Discord = require("discord.js")
const Command = require("../../Client/Command")


module.exports = new Command({
     name: "giveelexir",
     description: "Permet de donner de l'elexir",
     use: "giveelexir [nombre]",
     ownerOnly: true,
     category: "Clash Royale",

     async run(bot, message, args, db) {
          let user; 
          if(message.user ? args._hoistedOptions.length > 0 : args.length > 0) {
              user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
              if(!user) message.reply("Aucun user trouvé.")
          } 

          let elexirGiven = message.user ? args._hoistedOptions[1].value : args[1]
          if(!elexirGiven) return message.reply("Veuillez indiquer un nombre d'elexir a donner.")

          db.query(`SELECT * FROM eco WHERE userID = ${user.id}`, async(err, eco) => {
               if(eco.length < 1){
                    message.reply("L'utilisateur n'a pas commencé l'aventure") 
               }
               db.query(`UPDATE eco SET elexir=elexir+? WHERE userID=?`, [elexirGiven, user.id])
               message.reply(`${user} a reçu \`${elexirGiven}\` <:elixirclashroyale:1075210567997984851> de la part de ${message.user}.`)
               console.log("[GIVE ELEXIR] ".magenta + user.username + " a reçu " + elexirGiven + " de la part de " + message.user.username)
          })
     }
})