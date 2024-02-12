const Discord = require("discord.js")
const Command = require("../../Client/Command");
const emoji = {
     heal: "<:elexir:1199124230407737535>",
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
     name: "shop",
     description: "Permet d'ouvrir le Shop",
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
                         .setCustomId(`shop_${message.user.id}`)
                         .setMaxValues(1)
                         .setPlaceholder(`Choisisez vôtre catégorie...`)
                         .setOptions([
                              { label: "Potions", value: "Potions", emoji: "🍹", description: "Ouvre la catégorie Potions" }, 
                         
                              { label: "Plantes", value: "Plantes", emoji: "🌺", description: "Ouvre la catégorie Plantes" },
                         
                              { label: "Reliques", value: "Reliques", emoji: "🗿", description: "Ouvre la catégorie Reliques" },
                         ])
                         
                         
               )
               
               let id = new Discord.MessageActionRow().addComponents(
               new Discord.TextInputComponent()
               .setCustomId("id")
               .setLabel("Identifiant de l'article à acheter...")
               .setRequired(true)
               .setStyle("SHORT")
               )
              let nbr = new Discord.MessageActionRow().addComponents(
               new Discord.TextInputComponent()
               .setCustomId("nombre_d'article")
               .setLabel("Le nombre d'article que vous souhaitez...")
               .setRequired(true)
               .setStyle("SHORT")
               .setPlaceholder("Si y'a rien =  un article")
           )

           let btn = new Discord.MessageActionRow().addComponents(
               new Discord.MessageButton()
               .setLabel("Acheter un article")
               .setStyle("SECONDARY")
               .setEmoji("1199124230407737535")
               .setCustomId(`buyer_${message.user.id}`)
           )

           let modal = new Discord.Modal()
               .setTitle("Achats sur la boutique.")
               .setCustomId(`achats_${message.user.id}`)
               .addComponents(id,nbr)
               const Embed_Main = new Discord.MessageEmbed()
                    .setTitle("Shop !")
                    .setDescription(`
**🍹 ・ Accèder a la catégorie des potions. ** 
*La catégorie est accessible dès l'arène 0* 

**🌺 ・ Accèder a la catégorie des plantes. ** 
*La catégorie est accessible dès l'arène 0* 
               
**🗿 ・ Accèder a la catégorie des reliques. ** 
*La catégorie est accessible dès l'arène 0* 

*Pour vous balader dans le shop, cliquez sur le menu*
               `)
                    .setColor(bot.color)
                    .setFooter({text: "Pour effectuer des achats, faites /buy", iconURL : message.user.avatarURL({dynamic: true})})


               message.reply({ embeds: [Embed_Main], components: [row] })
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

               collector.on("collect", async (button) =>  {
                    if(button.isSelectMenu()){
                         if(button.customId === `shop_${button.user.id}`){
                              if(button.values[0] === "Potions"){
                                   console.log("[SHOP] ".green.bold + button.user.username.yellow + " a ouvert le shop " + "Potions".magenta)
                                   const Embed_Potions = new Discord.MessageEmbed()
                                       .setTitle("🍹 ・ Catégorie des potions ")
                                       .setDescription(`
Bienvenue au Shop à potions ! Je te laisse voir mes produits : 
                       
${emoji.common_potion} - Une Potion Commune (ID : 1)
*Augmente le pourcentage de taux de drop de carte commune.*
Prix : 10 ${emoji.elexir}
                       
${emoji.rare_potion} - Une Potion Rare (ID : 2)
*Augmente le pourcentage de taux de drop de carte rare.*
Prix : 60 ${emoji.elexir}
                       
${emoji.epic_potion} - Une Potion Epique (ID : 3)
*Augmente le pourcentage de taux de drop de carte épique.*
Prix : 300 ${emoji.elexir}
                       
${emoji.legendary_potion} - Une Potion Légendaire (ID : 4)
*Augmente le pourcentage de taux de drop de carte légendaire.*
Prix : 900 ${emoji.elexir}
                       
${emoji.champion_potion} - Une Potion de Champion (ID : 5)
*Augmente le pourcentage de taux de drop de carte champion.*
Prix : 2 700 ${emoji.elexir}
                   `)
                                       .setColor(bot.color)
                                       .setFooter({ text: "Pour effectuer des achats, faites /buy", iconURL: button.user.avatarURL({ dynamic: true }) })
                   
                                   button.deferUpdate()
                                   button.message.edit({ embeds: [Embed_Potions] , components : [row, btn] })
                              }
                              if (button.values[0] === "Plantes") {
                                   button.reply({ content: "> En Développement...", ephemeral: true })
                               }
                               if (button.values[0] === "Reliques") {
                                   button.reply({ content: "> En Développement...", ephemeral: true })
                               }
                         }
                    }
                    if(button.isButton()){
                         if(button.customId === `buyer_${button.user.id}`){
                              button.deferUpdate()
                              button.showModal(modal)
                         }
                    }
                    if(button.isModalSubmit()){
                         if(button.customId === `achats_${message.user.id}`){
                              db.query(`SELECT * FROM eco WHERE userID = ${button.user.id}`, async (err, eco) => {
                                   let article = button.fields.getTextInputValue("id")
                                   let nbr = button.fields.getTextInputValue("nombre_d'article")
                                   let elexir = eco[0].elexir
                   
                                   if (article < 1 || article > 5) {
                                       return button.reply({ content: `> Votre article n'existe pas.`, ephemeral: true })
                                   }
                                   let price = [10*nbr, 60*nbr, 300*nbr, 900*nbr, 2700*nbr]
                                   if (elexir < price[article - 1]) return button.reply({ content: `> Vous n'avez pas assez d'élexir.`, ephemeral: true })
                   
                                   let colonnes = ["common_potion", "rare_potion", "epic_potion", "legendary_potion", "champion_potion"]
                                   let response = [`**Une Potion Commune** pour ${price[0]} `, `**Une Potion Rare** pour ${price[1]}`, `**Une Potion Epique** pour ${price[2]}`, `**Une Potion légendaire** pour ${price[3]}`, `**Une Potion De Champion** pour ${price[4]}`]
                                   let emojis = [emoji.common_potion, emoji.rare_potion, emoji.epic_potion, emoji.legendary_potion, emoji.champion_potion]
                   
                                   db.query(`UPDATE eco SET ${colonnes[article - 1]} = ${colonnes[article - 1]} + ${nbr} , elexir = elexir - ${price[article - 1]}   WHERE userID = ${button.user.id}`)
                                   button.reply({ content: `> ${emojis[article - 1]} Vous avez acheté ${response[article - 1]}  ${emoji.elexir}`, ephemeral: true })
                                   console.log("[ACHAT] ".magenta + button.user.username.yellow + ` a acheté ${response[article - 1]} elexirs !`)
                   
                   
                   
                                   console.log(article)
                               })
                         }
                    }
               })

               console.log(`User : ${message.user.username} / Gems: ${gems} / Elexir: ${elexir} / ticket: ${ticket}`.red)
          })
     }
})