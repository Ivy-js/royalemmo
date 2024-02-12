const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { formatTime } = require("../../Functions/formatTime")

module.exports = new Command({
    name: "weekly",
    description: "Permet de récupérer vos récompenses hebdomadaires.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "weekly",
    async run(bot, message, args, db) {
        let randomElexir = Math.floor(Math.random() * (75 - 100)) + 100
        let randomTicket = Math.floor(Math.random() * (20 - 45)) + 45
        db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, eco) => {
            db.query(`SELECT * FROM cooldown WHERE userID = ${message.user.id}`, async (err, req) => {
                let cooldownweekly;
                if (eco.length < 1) {
                db.query(`INSERT INTO eco (userID) VALUES (?)`, [message.user.id])
            } else if (req.length < 1 ) {
                cooldownweekly = 0
                db.query(`INSERT INTO cooldown (userID) VALUES (?)`, [message.user.id])
            } else {
                cooldownweekly = req[0].cooldownweekly; 
            }

            if(eco[0].premium === 1){
               message.reply("> Vous avez voulu essayer une fonctionnalité **Premium ⭐**, pour obtenir le premium rejoignez le support et particpez au giveaways quotidiens !")
            } else if(eco[0].premium === 2){
               console.log("a")
               if (cooldownweekly === 0 || Math.floor(message.createdTimestamp - req[0].cooldownweekly) >= 604800000) {
                    db.query(`UPDATE cooldown SET cooldownweekly = ? WHERE userID = ?`, [message.createdTimestamp, message.user.id])

                    db.query(`UPDATE eco SET elexir = elexir+?, ticket= ticket+? WHERE userID = ?`, [randomElexir, randomTicket, message.user.id])

                    let dailyEmbed = new Discord.MessageEmbed()
                        .setTitle("Weekly")
                        .setDescription(`
Vous avez exécuté votre commande Weekly et vous avez reçu le récompenses suivantes : 
\`\`\`yaml
- ${randomElexir} Elexirs
- ${randomTicket} Tickets de tirages
\`\`\`
    `)
                        .setColor(bot.color)
                    message.reply({ embeds: [dailyEmbed] })
                } else {
                    let dn = formatTime(604800000 - (message.createdTimestamp - req[0].cooldownweekly))
                    message.reply(`Vous êtes en cooldown. Temps restant : ${dn}`)
                }
            }
        

               
            })

        })
    }
})