const Discord = require("discord.js")
const Command = require("../../Client/Command");
const emoji = {
     heal: "<:heal_potion:1081936151650246738>",
     xp: "<:xppotion:1081962918393958460>",
     common_potion: "<:commonpotion:1081965294752387072>",
     rare_potion: "<:rarepotion:1081965299215106078>",
     epic_potion: "<:epicpotion:1081965296652386375>",
     legendary_potion: "<:legendarypotion:1081965937978249248>",
     champion_potion: "<:championpotion:1081965292328075426>",
     elexir_potion: "<:elexirpotion:1081965295817736192>",
     elexir: "<:elexir:1081976703049531492>"
 }
module.exports = new Command({
     name: "merge",
     description: "Permet de mélanger des potions.",
     category: "RPG",
     permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
     use: "merge",
     async run(bot, message, args, db) {
          db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, req) => {
               let elexir = req[0].elexir
               let ticket = req[0].ticket
               let gems = req[0].gems
               let common = req[0].common_potion
               let rare = req[0].rare_potion
               let epic = req[0].epic_potion
               let legendary = req[0].legendary_potion
               let champion = req[0].champion_potion

               const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                         .setCustomId(`rare_${message.user.id}`)
                         .setStyle("PRIMARY")
                         .setDisabled(common < 5 ? true : false)
                         .setLabel("Mélanger en Potion Rare"),
                    new Discord.MessageButton()
                         .setCustomId(`epic_${message.user.id}`)
                         .setStyle("PRIMARY")
                         .setDisabled(rare < 5 ? true : false)
                         .setLabel("Mélanger en Potion Epique"),
                    new Discord.MessageButton()
                         .setCustomId(`legendary_${message.user.id}`)
                         .setStyle("PRIMARY")
                         .setDisabled(epic < 5 ? true : false)
                         .setLabel("Mélanger en Potion Légendaire"),
                    new Discord.MessageButton()
                         .setCustomId(`champion_${message.user.id}`)
                         .setStyle("PRIMARY")
                         .setDisabled(legendary < 5 ? true : false)
                         .setLabel("Mélanger en Potion de Champion"),

               )
               const Embed_Main = new Discord.MessageEmbed()
                    .setTitle("Merge")
                    .setDescription(`
**Comment mélanger des potions ?**
*Pour mélanger des potions, vous devez avoir 5 potions du même type. 
Ex : 5 Potions Communes --> 1 Potions Rare*


**On ne peut pas cliquer sur le bouton, pourquoi ?**
*Cela veut dire que vous n'avez pas les ingrédients requis pour faire un mélange !*
               `)
                    .setColor(bot.color)


               message.reply({ embeds: [Embed_Main], components: [row] })
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

               collector.on("collect", async (button) => {
                    if (button.customId === `rare_${message.user.id}`) {
                         if (common < 5) return button.reply({ content: `Vous n'avez pas assez de potions communes.`, ephemeral: true })
                         db.query(`UPDATE eco SET common_potion = common_potion - 5 , rare_potion = rare_potion + 1 WHERE userID = ${button.user.id}`)
                         button.reply(`> Mélange en cours...`)
                         setTimeout(() => {
                              button.editReply(`> Vous avez eu **${emoji.rare_potion} Une Potion Rare**`)
                         }, 3000);
                    }
                    if (button.customId === `epic_${message.user.id}`) {
                         if (rare < 5) return button.reply({ content: `Vous n'avez pas assez de potions rares.`, ephemeral: true })
                         db.query(`UPDATE eco SET rare_potion = rare_potion - 5, epic_potion = epic_potion + 1 WHERE userID = ${button.user.id}`)
                         button.reply(`> Mélange en cours...`)
                         setTimeout(() => {
                              button.editReply(`> Vous avez eu **${emoji.epic_potion} une potion épique**`)
                         }, 3000);
                    }
                    if (button.customId === `legendary_${button.user.id}`) {
                         if (epic < 5) return button.reply({content : `Vous n'avez pas assez de potions epiques.`, ephemeral : true})
                             db.query(`UPDATE eco SET epic_potion = epic_potion - 5, legendary_potion = legendary_potion + 1 WHERE userID = ${button.user.id}`)
                         button.reply(`> Mélange en cours...`)
                         setTimeout(() => {
                             button.editReply(`> Vous avez eu **${emoji.legendary_potion} une potion légendaire**`)
                         }, 3000);
                     }
                     if (button.customId === `champion_${button.user.id}`) {
                         if (legendary < 5) return button.reply({content : `Vous n'avez pas assez de potions légendaires.`, ephemeral : true})
                             db.query(`UPDATE eco SET legendary_potion = legendary_potion - 5, champion_potion = champion_potion + 1 WHERE userID = ${button.user.id}`)
                         button.reply(`> Mélange en cours...`)
                         setTimeout(() => {
                             button.editReply(`> Vous avez eu **${emoji.legendary_potion} une potion de champion**`)
                         }, 3000);
                     }
               })

               console.log(`User : ${message.user.username} / Gems: ${gems} / Elexir: ${elexir} / ticket: ${ticket}`.red)
          })
     }
})