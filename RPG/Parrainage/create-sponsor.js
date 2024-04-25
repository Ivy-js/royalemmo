const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { createID } = require("../../Functions/createID")

module.exports = new Command({
    name: "create-sponsor",
    description: "Permet de créer un code de parrainage que vous pouvez partager a vos amis.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "create-sponsor",
    async run(bot, message, args, db) {
        db.query(`SELECT * FROM sponsor WHERE userID = ${message.user.id}`, async (err, req) => {

            try {
                if (req[0].sponsor_code !== "\"\"") {
                    return message.reply({content : `> Vous avez déja un code de parrainage ! Trouvez le en faisant la commande \`/sponsor\``, ephemeral : true})
                } 
            }catch(e) {
                console.log(`[ERR CATCHED] - ${e}`.red)
                return message.reply({content : `Désolé, j'ai rencontré un problème, c'est sûrement du au fait que vous n'avez pas de compte. Avez vous essayé de faire la commande \`/start\` ? Si oui, contacter un modérateur.`, ephemeral :true})

            }
            let Sponsor_ID = createID("SPONSOR")
            let gemsToClaim = req[0].sponsorGems
            let ticketToClaim = req[0].sponsorTicket
            let elexirToClaim = req[0].sponsorElexir
            let countPartner = req[0].count

            db.query(`UPDATE sponsor SET sponsor_code=? , username=? WHERE userID=?`, [Sponsor_ID, message.user.username, message.user.id])

            let embed = new Discord.MessageEmbed()
            .setTitle(`Panel Sponsor !`)
            .setDescription(`
**__Bienvenue sur le Panel, ${message.user}__**: 

Vos revenus estimées : 

\`${elexirToClaim}\` Elexirs 
\`${ticketToClaim}\` Tickets 
\`${gemsToClaim}\` Gemmes

__Nombre de joueurs parrainés :__ **${countPartner}**

**__Votre code de ζ͜͡RoyaleParrainage__** : \`${Sponsor_ID}\`
            `)
            .setFooter({text : "discord.gg/royale-mmo", iconURL : `${bot.user.avatarURL({dynamic: true})}`})

            .setColor(bot.color)
            

            try{
                message.reply({embeds : [embed]})
            } catch (e) {
                console.log(`[ERR CATCHED] - ${e}`)
                message.reply({content : `Désolé, j'ai rencontré un problème, c'est sûrement du au fait que vous n'avez pas de compte. Avez vous essayé de faire la commande \`/start\` ? Si oui, contacter un modérateur.`, ephemeral :true})

            }

        }) 

    }
})