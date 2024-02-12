const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { formatTime } = require("../../Functions/formatTime")

module.exports = new Command({
    name: "monthly",
    description: "Permet de récupérer vos récompenses mensuelles.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "monthly",
    async run(bot, message, args, db) {
        let randomElexir = Math.floor(Math.random() * (100 - 200)) + 200;
        let randomTicket = Math.floor(Math.random() * (20 - 30)) + 30
        db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, eco) => {
            db.query(`SELECT * FROM cooldown WHERE userID = ${message.user.id}`, async (err, req) => {
                let cooldownmonthly;
                if (eco.length < 1) {
                db.query(`INSERT INTO eco (userID) VALUES (?)`, [message.user.id])
            } else if (req.length < 1 ) {
                cooldownmonthly = 0
                db.query(`INSERT INTO cooldown (userID) VALUES (?)`, [message.user.id])
            } else {
                cooldownmonthly = req[0].cooldownmonthly; 
            }

            if(eco[0].premium === 1){
               message.reply("> Vous avez voulu essayer une fonctionnalité **Premium ⭐**, pour obtenir le premium rejoignez le support et particpez au giveaways quotidiens !")
            } else if(eco[0].premium === 2){
               if (cooldownmonthly === 0 || Math.floor(message.createdTimestamp - req[0].cooldownmonthly) >= 2592000000) {
                    db.query(`UPDATE cooldown SET cooldownmonthly = ? WHERE userID = ?`, [message.createdTimestamp, message.user.id])

                    db.query(`UPDATE eco SET elexir = elexir+?, ticket= ticket+? WHERE userID = ?`, [randomElexir, randomTicket, message.user.id])

                    let dailyEmbed = new Discord.MessageEmbed()
                        .setTitle("Monthly")
                        .setDescription(`
Vous avez exécuté votre commande Monthly et vous avez reçu le récompenses suivantes : 
\`\`\`yaml
- ${randomElexir} Elexirs
- ${randomTicket} Tickets de tirages
\`\`\`
    `)
                        .setColor(bot.color)
                    message.reply({ embeds: [dailyEmbed] })
                } else {
                    let dn = formatTime(2592000000 - (message.createdTimestamp - req[0].cooldownmonthly))
                    message.reply(`Vous êtes en cooldown. Temps restant : ${dn}`)
                }
            }
        

               
            })

        })
    }
})