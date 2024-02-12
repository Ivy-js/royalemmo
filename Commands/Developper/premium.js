const Discord = require("discord.js")
const Command = require("../../Client/Command")


module.exports = new Command({
     name: "premium",
     description: "Permet de rendre un utilisateur premium",
     use: "premium [user]",
     ownerOnly: true,
     category: "Development",

     async run(bot, message, args, db) {
          let user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));

          db.query(`SELECT * FROM eco WHERE userID = ${user.id}`, async (err, req) => {
               if (req.length < 1) {
                    message.reply("L'utilisateur n'a pas commencé l'aventure")
               }

               if (req[0].premium === 1) {

                    db.query(`UPDATE eco SET premium = ? WHERE userID = ?`, [2, user.id])
                    message.reply(`> L'utilisateur ${user} est maintenant **Premium ⭐** !!`)
               }else if (req[0].premium === 2) {
                    message.reply(`> L'utilisateur ${user} est déjà **Premium ⭐** !!`)

               }
               

          })
     }
})