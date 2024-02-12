const Discord = require("discord.js")
const Command = require("../../Client/Command")
const { formatTime } = require("../../Functions/formatTime")

const emojis =  {

    early : "<:BadgeEarlySupporter:1199827640887029830>", 
    red_crown :"<a:redcrown:1198763587951394867>"
}
module.exports = new Command({
    name: "inventory",
    description: "Permet de voir vôtre inventaire.",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "daily",
    async run(bot, message, args, db) {
        db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err, eco) => {
            db.query(`SELECT * FROM adventure WHERE userID = ${message.user.id}`, async (err, adventure) => {
               if(eco.length < 1 && adventure.length < 1) return message.reply({content : "> Vous n'avez pas commencé l'aventure.", ephemeral : true});
            
            const Inventory = new Discord.MessageEmbed()    
            .setTitle("Votre Inventaire")
            .setDescription(`
Vos ressources actuelles :
\`\`\`ansi
- ${eco[0].elexir} \u001b[0;40;35mElexir 🌺\u001b[0;0m
- ${eco[0].ticket} \u001b[0;40;34mTickets de Tirages ⭐\u001b[0;0m
- ${eco[0].gems}   \u001b[0;32mGemmes\u001b[0;0m
\`\`\`

Vos Potions : 
\`\`\`ansi
- ${eco[0].common_potion} \u001b[0;40;37mPotions Communes\u001b[0;0m
- ${eco[0].rare_potion} \u001b[0;40;33mPotions Rare\u001b[0;0m 
- ${eco[0].epic_potion} \u001b[0;40;35mPotions Epique\u001b[0;0m
- ${eco[0].legendary_potion} \u001b[0;42;30mPotions Légendaire\u001b[0;0m
- ${eco[0].champion_potion} \u001b[1;33mPotions de Champion\u001b[0;0m
\`\`\`

Vos statistiques : 
\`\`\`yaml
Arène ${adventure[0].arene}
// Suite bientôt :) 
\`\`\`

__**Badges :**__

OG Player ? : ${eco[0].isOG === 1 ? emojis.early : "Non"}
Owner ? : ${eco[0].isOwner === 1 ? emojis.red_crown : "Non"}
Premium ? : ${eco[0].premium === 2 ? "`🌟 Vous êtes premium !`" : "`❌ Vous n'êtes pas premium !`" }
`)
            .setColor(bot.color)
            message.reply({embeds: [Inventory]})
        }) 
        })
        
    }
})