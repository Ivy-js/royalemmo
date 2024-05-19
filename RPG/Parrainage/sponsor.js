const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { createID } = require("../../Functions/createID")

module.exports = new Command({
    name: "sponsor",
    description: "Permet de regarder ses revenus sur le code de parrainage.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "create-sponsor",
    async run(bot, message, args, db) {
        db.query(`SELECT * FROM sponsor WHERE userID = ${message.user.id}`, async (err, req) => {

            if (req[0].sponsor_code.length < 1) {
                return message.reply({content : `> Vous n'avez pas de code de parrainage ! Créez-en un en faisant la commande \`/create-sponsor\``, ephemeral : true})
            }

            let gemsToClaim = req[0].sponsorGems
            let ticketToClaim = req[0].sponsorTicket
            let elexirToClaim = req[0].sponsorElexir

            let embed = new Discord.MessageEmbed()
            .setTitle(`Panel Sponsor !`)
            .setDescription(`
**__Bienvenue sur le Panel, ${message.user}__**: 

Vos revenus estimées : 

\`${elexirToClaim}\` Elexirs 
\`${ticketToClaim}\` Tickets 
\`${gemsToClaim}\` Gemmes

**__Votre code de ζ͜͡RoyaleParrainage__** : \`${req[0].sponsor_code}\`
`)

            .setColor(bot.color)
            

            let row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                .setCustomId("gems")
                .setStyle("SUCCESS")
                .setLabel("Récuperer les Gemmes")
                .setDisabled(gemsToClaim === 0 ? true : false)
                , 
                new Discord.MessageButton()
                .setCustomId("ticket")
                .setStyle("PRIMARY")
                .setLabel("Récuperer Vos Tickets")
                .setEmoji("🎫")
                .setDisabled(ticketToClaim === 0 ? true : false)
                , 
                new Discord.MessageButton()
                .setCustomId("elexir")
                .setStyle("PRIMARY")
                .setLabel("Récuperer L'Elexir")
                .setDisabled(elexirToClaim === 0 ? true:false)
                , 
                new Discord.MessageButton()
                .setCustomId("help")
                .setLabel("C'est quoi ?")
                .setStyle("SECONDARY")
                .setEmoji("❓")
            )

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
                if(button.customId === `help`){
                    button.reply({ content: `
                    **Système de Parrainage RoyaleMMO 🌟**

Le système de parrainage de RoyaleMMO te permet de bénéficier d'avantages exclusifs ! Voici comment ça fonctionne :

1. **Obtiens un Code Partenaire :** Demande à un utilisateur existant son code partenaire. En l'utilisant avec la commande \`/claim-sponsor [code partenaire]\`, tu gagnes instantanément 30 Elexirs, 5 Tickets et 1 Gemme !

2. **Crée ton Propre Code :** Si tu souhaites devenir un parrain, génère ton propre code partenaire avec la commande \`/create-sponsor\`. Partage-le avec d'autres joueurs pour qu'ils deviennent tes filleuls et profitent des récompenses exclusives.

3. **Code Partenaire Personnalisé :** Si tu as accumulé 100 Elexirs, tu peux demander au staff RoyaleMMO un code partenaire personnalisé. Il te permettra de parrainer d'autres joueurs de manière unique.

Le parrainage est une excellente façon d'accélérer ta progression dans RoyaleMMO et de tisser des liens avec la communauté. Profite des avantages du parrainage et plonge dans l'aventure ! 🚀✨


Documentation : \`[🦇 GitHub](https://github.com/Ivy-js/royalemmo/blob/main/RPG/Parrainage/readme.md)\`
                    
                    `, ephemeral : true})
                }

                if(button.customId === "ticket"){

                    if(ticketToClaim === 0){
                        return message.reply({content : `Vous ne pouvez pas retirer 0 tickets.`, ephemeral : true})
                    }

                    button.reply({
                        content : `
> Vous avez retiré \`${ticketToClaim} 🎫\`, ils ont été ajouté à votre inventaire. 
                        `, 
                        ephemeral : true, 
                    })

                    db.query(`UPDATE sponsor SET sponsorTicket=? WHERE userID =? `, [0, button.user.id])
                    db.query(`UPDATE eco SET ticket=ticket+? WHERE userID =? `, [ticketToClaim, button.user.id])
                    return button.editReply({components : [row]})
                }
                if(button.customId === "elexir"){

                    if(elexirToClaim === 0){
                        return message.reply({content : `Vous ne pouvez pas retirer 0 d'élexir.`, ephemeral : true})
                    }

                    button.reply({
                        content : `
> Vous avez retiré \`${elexirToClaim} 🟣\`, ils ont été ajouté à votre inventaire. 
                        `, 
                        ephemeral : true, 
                    })

                    db.query(`UPDATE sponsor SET sponsorElexir=? WHERE userID =? `, [0, button.user.id])
                    db.query(`UPDATE eco SET elexir=elexir+? WHERE userID =? `, [elexirToClaim, button.user.id])
                    return button.message.edit({components : [row]})

                }
                if(button.customId === "gems"){

                    if(gemsToClaim === 0){
                        return message.reply({content : `Vous ne pouvez pas retirer 0 gemmes.`, ephemeral : true})
                    }

                    button.reply({
                        content : `
> Vous avez retiré \`${gemsToClaim} 🟢\`, ils ont été ajouté à votre inventaire. 
                        `, 
                        ephemeral : true, 
                    })

                    db.query(`UPDATE sponsor SET sponsorGems=? WHERE userID =? `, [0, button.user.id])
                    db.query(`UPDATE eco SET gems=gems+? WHERE userID =? `, [gemsToClaim, button.user.id])
                    return button.editReply({components : [row]})

                }
           })
            message.reply({embeds : [embed], components : [row]})

        }) 

    }
})