const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { createID } = require("../../Functions/createID")

module.exports = new Command({
    name: "custom-sponsor",
    description: "Permet de modifer le code de sponsor que vous pouvez partager a vos amis.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "custom-sponsor",
    ownerOnly: true, 
    async run(bot, message, args, db) {
        let userID = message.user ? args._hoistedOptions[0].value : args[0]
        let newCode = message.user ? args._hoistedOptions[1].value : args[1]

        db.query(`SELECT * FROM sponsor WHERE userID = ${userID}`, async (err, req) => {

            
            let oldCode = req[0].sponsor_code

            db.query(`UPDATE sponsor SET sponsor_code=? WHERE userID=?`, [newCode, userID])

            let embed = new Discord.MessageEmbed()
            .setTitle(`Custom Sponsor | ${message.user.username}`)
            .setDescription(`
Le code de \`${bot.users.cache.get(userID).username}\` a été changé en \`${newCode}\` avec succès !
            `)

            .setColor(bot.color)
            

            let embedToUser = new Discord.MessageEmbed()
            .setTitle(`Custom Sponsor | ${bot.users.cache.get(userID).username}`)
            .setDescription(`
Votre code de parrainage \`${oldCode}\` a été changé en \`${newCode}\` avec succès par ${message.user} !
            `)

            .setColor(bot.color)

            

            try {
                bot.users.cache.get(userID).send({embeds: [embedToUser]})
                message.reply({embeds : [embed], ephemeral: true})
            } catch (err) {
                console.log(`[ERR] `.red + ` - L'utilisateur ${bot.users.cache.get(userID).username.yellow} n'accepte pas les messages privés`)
                message.reply({content : `*L'utilisateur n'accepte pas les messages privés, le changement à quand même été effectué.*`, embeds : [embed], ephemeral: true})
            }



        }) 

    }
})