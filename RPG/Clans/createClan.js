const Discord = require("discord.js")
const fs = require("fs")
const Command = require("../../Client/Command")
const { pourcentage_chances } = require("../../Functions/fonction")
const { formatTime } = require("../../Functions/formatTime")
const { cardsObject } = require("../../Data/cardsobject")
const { emojiobject } = require("../../Data/emojiobject")
const Emojis = {
     owner: "<:ownerID:1083905761777811528>",
     time: "<:clans_time:1199105215111110757>",
     power: "<:clans_power:1199105538487754892>",
     members: "<:clans_members:1199105201584484352>",
     moderator: "<:clans_moderator:1199105203132170360>",
     clans: "<:clans:1199105185545461821>",
     fight: "<:clans_fight:1199105194118611096>",
     name: "<:clans_name:1199105204369502239>",
     closed: "<:clans_closed:1199105190138232853>",
     open: "<:clans_open:1199105206936420372>",
     description: "<:clans_descriptions:1199105192684167350>",
     admin: "<:clans_admin:1199105186803753121>",
     screen: "<:clans_screen:1199105212011528283>"
}
module.exports = new Command({
     name: "create-clan",
     description: "Permet de créer un clan.",
     category: "RPG",
     permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
     use: "create-clans",
     async run(bot, message, args, db, interaction) {
          let nom, description, image, access;

          let Ids = Math.floor(Math.random() * 100)

          db.query(`SELECT * FROM clans WHERE ownerID = ${message.user.id}`, async (err, clans) => {

               if (clans.length === 1) return message.reply({ content: `Vous avez déjà un clan `, ephemeral: true });

               db.query(`INSERT INTO clans (ownerID) VALUES (?)`, [message.user.id])




               


               let embed_start = new Discord.MessageEmbed()
                    .setTitle("Création d'un Clan")
                    .setDescription(`
Bonjour joueur ! Il est venu pour toi de créer ton clan ! Pour participer au Crew Fight, ou faire de simples compétitions amicales. 

Utilise le __**Menu**__ ci-dessous pour créer ton clan !
               `)
                    .setColor(bot.color)
               let embedCreation = new Discord.MessageEmbed()
                    .setTitle("Création d'un Clan")
                    .setDescription(`
Bonjour joueur ! Il est venu pour toi de créer ton clan ! Pour participer au Crew Fight, ou faire de simples compétitions amicales. 

Utilise le __**Menu**__ ci-dessous pour créer ton clan !
`)
                    .setColor(bot.color)




               const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                         .setCustomId(`clans_${message.user.id}`)
                         .setMaxValues(1)
                         .setPlaceholder(`Cliquez pour commencer à créer votre clan...`)
                         .setOptions([
                              { label: "Nom du clan", value: "name", emoji: "1199105204369502239", description: "Quel est le nom de votre clan ?" },
                              { label: "Description du clan", value: "description", emoji: "1199105192684167350", description: "Ok, quel est la description de votre clan ?" },
                              { label: "Image du clan", value: "icon", emoji: "1199105212011528283", description: "Ok, quel est l'image de votre clan ?" },
                              { label: "Accès au clan", value: "access", emoji: "1199105190138232853", description: "Ouvert ou Fermé ou Sur Invitation ?" },

                         ])
               )
               const btn = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                         .setLabel("Finir la configuration")
                         .setCustomId(`finish_${message.user.id}`)
                         .setStyle("SECONDARY")
               )
               message.reply({ embeds: [embed_start], components: [row, btn] })
               const collector = message.channel.createMessageComponentCollector({
                    filter: x => {
                         if (x.user.id === message.user.id) {
                              return true;
                         } else {
                              x.reply({ embeds: [{ title: "Erreur", description: `${x.user} vous ne pouvez pas utliser ces interactions. Vous n'êtes pas l'auteur du message !`, color: bot.color }], ephemeral: true })
                              return false;
                         }
                    },
                    time: 600000,
                    idle: 30000
               })

               collector.on("collect", async (button) => {
                    const filterMessage = (m) => m.author.id == message.user.id && !m.author.bot
                    if (button.isSelectMenu()) {
                         if (button.customId === `clans_${message.user.id}`) {

                              if (button.values[0] === "name") {
                                   button.deferUpdate()
                                   const question = await button.channel.send({
                                        embeds: [{
                                             description: "Quel est le nom de votre clan ?",
                                             color: bot.color
                                        }]
                                   })
                                   const reponse = (await message.channel.awaitMessages({
                                        filterMessage,
                                        max: 1
                                   })).first()
                                   question.delete()
                                   reponse.delete()

                                   db.query(`UPDATE clans SET name = ? WHERE ownerID = ? `, [reponse.content.toLowerCase(), button.user.id])
                                   nom = reponse.content


                                   embedCreation.addFields({ name: `> ${Emojis.name} **__Nom du Clan__** :`, value: `> ** ${reponse.content} **`, inline: true })
                                   button.editReply({ embeds: [embedCreation] })
                              }

                              if (button.values[0] === "description") {
                                   button.deferUpdate()
                                   const question = await button.channel.send({
                                        embeds: [{
                                             description: "Quel est la description de votre clan ? (Pas d'emoji nitro)",
                                             color: bot.color
                                        }]
                                   })
                                   const reponse = (await message.channel.awaitMessages({
                                        filterMessage,
                                        max: 1
                                   })).first()
                                   question.delete()
                                   reponse.delete()

                                   embedCreation.addFields({ name: `> ${Emojis.name} **__Description du Clan__** :`, value: `> ** ${reponse.content} **`, inline: true })

                                   button.editReply({ embeds: [embedCreation] })
                                   db.query(`UPDATE clans SET description = ? WHERE ownerID = ? `, [reponse.content, button.user.id])
                                   description = reponse.content

                              }
                              if (button.values[0] === "icon") {
                                   button.deferUpdate()
                                   const question = await button.channel.send({
                                        embeds: [{
                                             description: "Quel est l'image de votre clan ? (Envoyez un lien d'une image peut importe le format `.gif / .png / .jpg`)",
                                             color: bot.color
                                        }]
                                   })
                                   const reponse = (await message.channel.awaitMessages({
                                        filterMessage,
                                        max: 1
                                   })).first()
                                   question.delete()
                                   reponse.delete()

                                   embedCreation.addFields({ name: `**> ${Emojis.screen} Image de votre clan**`, value: `⏬`, inline: true })
                                   db.query(`UPDATE clans SET image = ? WHERE ownerID = ? `, [reponse.content, button.user.id])
                                   image = reponse.content
                                   embedCreation.setImage(image)
                                   button.editReply({ embeds: [embedCreation] })
                              }
                              if (button.values[0] === "access") {
                                   button.deferUpdate()
                                   const question = await button.channel.send({
                                        embeds: [{
                                             description: "L'accés a votre clan doit être ? (Copiez collez la réponse) \n• ouvert \n• fermé \n• invite",
                                             color: bot.color
                                        }]
                                   })
                                   const reponse = (await message.channel.awaitMessages({
                                        filterMessage,
                                        max: 1
                                   })).first()
                                   question.delete()
                                   reponse.delete()

                                   embedCreation.addFields({ name: `**> ${Emojis.screen} Image de votre clan**`, value: `⏬`, inline: true })
                                   db.query(`UPDATE clans SET access = ? WHERE ownerID = ? `, [reponse.content, button.user.id])
                                   access = reponse.content                                  
                                   embedCreation.addFields({ name: `> ${Emojis.closed} **__Accès au Clan__** :`, value: `> ** ${reponse.content} **`, inline: true })
                                   button.editReply({ embeds: [embedCreation] })
                              }
                         }
                    }
                    if (button.isButton()) {
                         if (button.customId === `finish_${message.user.id}`) {
                              button.message.delete()

                              let embedFinish = new Discord.MessageEmbed()
                                   .setTitle("Votre Clan")
                                   .setDescription(`
Votre Clan **__${nom}__** a été crée avec succès ! 

__**Récapitulatif**__ : 
          `)
                                   .addFields([
                                        { name: `> ${Emojis.name} **__Nom du Clan__** :`, value: `${nom.toLowerCase().replace(" ", '_')} `, inline: true },
                                        { name: `> ${Emojis.description} **__Description du Clan__** :`, value: `${description} `, inline: true },
                                        { name: `**> ${Emojis.screen} Image de votre clan**`, value: `⏬`, inline: true },
                                        { name: `**> ${Emojis.closed} Accès à votre clan**`, value: `**${access}**`, inline: true },
                                        { name: `**> ${Emojis.power} ID Du Clan**`, value: `${nom}_${Ids}`, inline: true }
                                   ])
                                   .setColor(bot.color)
                                   .setImage(image)
                                   db.query(`UPDATE clans SET clansID = ? WHERE ownerID = ?`, [`${nom.toLowerCase().replace(" ", '_')}_${Ids}`, button.user.id])
                                   console.log("[CLANS] - ".cyan.bold + `${nom.yellow.bold} a été crée ! Owner : ${button.user.username.yellow.bold} | Description : ${description.blue.bold} | Access : ${access.green.bold}`) 
                              button.user.send({ content: "Récapitulatif de création", embeds: [embedFinish] })
                         }
                    }
               })

          })
     }
})