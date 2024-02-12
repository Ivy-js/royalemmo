const Discord = require("discord.js")
const Command = require("../../Client/Command")


module.exports = new Command({
     name: "giveticket",
     description: "Permet de donner de ticket",
     use: "giveticket [nombre]",
     ownerOnly: true,
     category: "Clash Royale",

     async run(bot, message, args, db) {
          let user; 
          if(message.user ? args._hoistedOptions.length > 0 : args.length > 0) {
              user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
              if(!user) message.reply("Aucun user trouvé.")
          } 

          let ticketGiven = message.user ? args._hoistedOptions[1].value : args[1]
          if(!ticketGiven) return message.reply("Veuillez indiquer un nombre de ticket a donner.")

          db.query(`SELECT * FROM eco WHERE userID = ${user.id}`, async(err, eco) => {
               if(eco.length < 1){
                    message.reply("L'utilisateur n'a pas commencé l'aventure") 
               }
               db.query(`UPDATE eco SET ticket=ticket+? WHERE userID=?`, [ticketGiven, user.id])
               message.reply(`${user} a reçu \`${ticketGiven}\` 🎫 de la part de ${message.user}.`)
               
          })
     }
})