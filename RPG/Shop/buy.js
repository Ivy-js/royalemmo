const Discord = require("discord.js")
const Command = require("../../Client/Command");

module.exports = new Command({
     name: "buy",
     description: "Permet d'acheter dans la boutique.",
     category: "RPG",
     permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
     use: "buy",
     async run(bot, message, args, db) {
          db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, req) => {
               let elexir = req[0].elexir
               let ticket = req[0].ticket
               let gems = req[0].gems
               const btn = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                         .setCustomId(`buy_${message.user.id}`)
                         .setEmoji("1200888566755106886")
                         .setStyle("PRIMARY")
                         .setLabel("Acheter un article")
               )

               const Embed_Main = new Discord.MessageEmbed()
                    .setTitle("Achats sur la boutique")
                    .setDescription(`
** 💵・ Que voulez vous acheter ? ** 
*Cliquez sur le bouton si dessous pour acheter* 
               `)
                    .setColor(bot.color)
                    .setFooter({text : `Votre porte-monnaie : Elexir : ${elexir}`, iconURL : message.user.avatarURL({dynamic: true})})


               message.reply({ embeds: [Embed_Main], components: [btn] })
               const collector = message.channel.createMessageComponentCollector({
                    filter: x => {
                         if (x.user.id === message.user.id) {
                              return true;
                         } else {
                              x.reply({ embeds: [{ title: "Erreur", description: `${x.user} vous ne pouvez pas utliser ces interactions. Vous n'êtes pas l'auteur du message !`, color: bot.color }], ephemeral: true })
                              return false;
                         }
                    },
                    time: 60000,
                    idle: 30000
               })
               collector.on("collect", async(button) => {
                    if(button.customId === `buy_${message.user.id}`){
                         button.reply({ embeds: [{ title: "Update 1.0.3", description : `La commande __**/buy**__ va être supprimée. Un bouton a été rajouté au **__/shop__**`, color : bot.color }], ephemeral : true})
                    }
               })

               console.log(`User : ${message.user.username} / Gems: ${gems} / Elexir: ${elexir} / ticket: ${ticket}`.red)
          })
     }
})