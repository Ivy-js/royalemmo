const Discord = require("discord.js")
const Command = require("../../Client/Command");
const emojis = {
     gem: "<:gem:1199407074812113137>",
     elexir: "<:elexir:1199124230407737535>"
}
module.exports = new Command({
     name: "market",
     description: "Permet d'ouvrir le market",
     category: "RPG",
     permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
     use: "shop",
     async run(bot, message, args, db) {
          db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, req) => {
               let elexir = req[0].elexir
               let ticket = req[0].ticket
               let gems = req[0].gems
               const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                         .setCustomId(`market_${message.user.id}`)
                         .setMaxValues(1)
                         .setPlaceholder(`Choisisez vôtre catégorie...`)
                         .setOptions([
                              { label: "Elexir", value: "Elexir", emoji: "1199124230407737535", description: "Ouvre la catégorie Elexir" },
                              { label: "Ticket", value: "Ticket", emoji: "🎫", description: "Ouvre la catégorie Ticket" },
                         ])


               )
               const btn = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                         .setLabel("Effectuer un achat")
                         .setEmoji(emojis.gem)
                         .setStyle("SECONDARY")
                         .setCustomId(`market_buy_${message.user.id}`)
               )

               const Embed_Explications = new Discord.MessageEmbed()
                    .setTitle("Explications du Market")
                    .setDescription(`
Bonjour joueur, laisse moi t'expliquer l'utilité du **__/market__** ! 

> **__1. Les Packs__** : 

Le market vous permet d'acheter des packs :  
• Des packs d'éléxirs ! 
• Des packs d'éléxirs ! 
• Des packs de démarage ! 
• Des packs de clés de coffres (👀 En développement) ! 

> **__2. La nouvelle monnaie ! __** : 

La nouvelle monnaie est la "Gemme" ! Avec celle ci vous allez pourvoir effectuer des achats sur le market ! 

Elle est obtenable pendant les combats (Soon...) et les **__/useticket__** ! 
`)
                    .setColor(bot.color)

               const Embed_Main = new Discord.MessageEmbed()
                    .setTitle("Le Market")
                    .setDescription(`
**${emojis.elexir} ・ Accèder a la catégorie des Elexirs. ** 
*La catégorie est accessible dès l'arène 0* 

**🎫 ・ Accèder a la catégorie des Tickets. ** 
*La catégorie est accessible dès l'arène 0* 


*Pour vous balader dans le market, cliquez sur le menu*
               `)
                    .setColor(bot.color)
                    .setFooter({ text: `Votre porte-monaie : Gemmes ${gems}`, iconURL: message.user.avatarURL({ dynamic: true }) })


               message.reply({ embeds: [Embed_Explications, Embed_Main], components: [row] })
               const collector = message.channel.createMessageComponentCollector({
                    filter: x => {
                         if (x.user.id === message.user.id) {
                              return true;
                         } else {
                              x.reply({ embeds : [{ title: "Erreur", description: `${x.user} vous ne pouvez pas utliser ces interactions. Vous n'êtes pas l'auteur du message !`, color : bot.color}], ephemeral: true })
                              return false;
                         }
                    }, 
                    time : 60000, 
                    idle : 30000
               })
               collector.on("collect", async (button, menu) => {

                    const filterMessage = (m) => m.author.id == message.user.id && !m.author.bot
                    if (button.customId === `market_${message.user.id}`) {
                         button.deferUpdate()
                         if (button.values[0] === "Elexir") {
                              const Embed_Elexir = new Discord.MessageEmbed()
                                   .setTitle("Catégorie Starter")
                                   .setDescription(`
__**Pack N°1**__ : 

・ 120 ${emojis.elexir}
・ 20 🎫
*ID : 1* 
Prix : 15 ${emojis.gem}  

__**Pack N°2**__ : 

・ 250 ${emojis.elexir} 
・ 45 🎫
*ID : 2* 
Prix : 30 ${emojis.gem}  
                              `)
                                   .setColor(bot.color)
                                   .setFooter({ text: `Votre porte-monaie : Gemmes ${gems}`, iconURL: message.user.avatarURL({ dynamic: true }) })

                              message.editReply({ embeds: [Embed_Elexir], components: [row, btn] })


                         }
                         if (button.values[0] === "Ticket") {
                              button.reply({ content: `> En developpement...`, ephemeral: true })
                         }
                         
                    }
                    if (button.customId === `market_buy_${message.user.id}`) {
                         button.deferUpdate()
                         const question = await button.channel.send({
                              embeds: [{
                                   description: "Quel pack voulez-vous acheter ?",
                                   color: bot.color
                              }]
                         })
                         const reponse = (await message.channel.awaitMessages({
                              filterMessage,
                              max: 1
                         })).first()
                         question.delete()
                         reponse.delete()
                         if (reponse.content == 1) {
                              if (gems < 15) return reponse.channel.send({ content: `Vous n'avez pas les gemmes suffisantes.` }).then(msg => {
                                   setTimeout(() => {
                                        msg.delete(1)
                                   }, 3000);
                              })
                              db.query(`UPDATE eco SET elexir = elexir + 120, ticket = ticket + 20, gems = gems - 15 WHERE userID = ${button.user.id}`)
                              reponse.channel.send({ content: `Vous avez acheté le __**Pack N°1**__ avec succès !` }).then(msg => {
                                   setTimeout(() => {
                                        msg.delete(1)
                                   }, 3000);
                              })
                         }
                         if (reponse.content == 2) {
                              if (gems < 30) return reponse.channel.send({ content: `Vous n'avez pas les gemmes suffisantes.` }).then(msg => {
                                   setTimeout(() => {
                                        msg.delete(1)
                                   }, 3000);
                              })
                              db.query(`UPDATE eco SET elexir = elexir + 250, ticket = ticket + 45, gems = gems - 30 WHERE userID = ${button.user.id}`)
                              reponse.channel.send({ content: `Vous avez acheté le __**Pack N°2**__ avec succès !` }).then(msg => {
                                   setTimeout(() => {
                                        msg.delete(1)
                                   }, 3000);
                              })
                         }
                    }
               })

               console.log(`User : ${message.user.username} / Gems: ${gems} / Elexir: ${elexir} / ticket: ${ticket}`.red)
          })
     }
})