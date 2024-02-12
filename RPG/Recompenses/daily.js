const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { formatTime } = require("../../Functions/formatTime")

module.exports = new Command({
    name: "daily",
    description: "Permet de récupérer vos récompenses quotidiennes.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "daily",
    async run(bot, message, args, db) {
        let randomElexir = Math.floor(Math.random() * (50 - 30)) + 30
        let randomTicket = Math.floor(Math.random() * (10 - 5)) + 5
        db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, eco) => {
            db.query(`SELECT * FROM cooldown WHERE userID = ${message.user.id}`, async (err, req) => {
                let cooldowndaily;
                if (eco.length < 1) {
                db.query(`INSERT INTO eco (userID) VALUES (?)`, [message.user.id])
            } else if (req.length < 1 ) {
                cooldowndaily = 0
                db.query(`INSERT INTO cooldown (userID) VALUES (?)`, [message.user.id])
            } else {
                cooldowndaily = req[0].cooldowndaily; 
            }
        

               
                if (cooldowndaily === 0 || Math.floor(message.createdTimestamp - req[0].cooldowndaily) >= 86400000) {
                    db.query(`UPDATE cooldown SET cooldowndaily = ? WHERE userID = ?`, [message.createdTimestamp, message.user.id])

                    db.query(`UPDATE eco SET elexir = elexir+?, ticket= ticket+? WHERE userID = ?`, [randomElexir, randomTicket, message.user.id])

                    let dailyEmbed = new Discord.MessageEmbed()
                        .setTitle("Daily")
                        .setDescription(`
Vous avez exécuté votre commande daily et vous avez reçu le récompenses suivantes : 
\`\`\`yaml
- ${randomElexir} Elexirs
- ${randomTicket} Tickets de tirages
\`\`\`
    `)
                        .setColor(bot.color)
                    message.reply({ embeds: [dailyEmbed] })
                } else {
                    let dn = formatTime(86400000 - (message.createdTimestamp - req[0].cooldowndaily))
                    message.reply(`Vous êtes en cooldown. Temps restant : ${dn}`)
                }
            })

        })
    }
})