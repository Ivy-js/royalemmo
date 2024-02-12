const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command  = require("../../Client/Command");

module.exports = new Command({
    name : "searchclans", 
    description : "Permet de trouver un joueur sur Clash Royale", 
    category : "Clash API", 
    permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
    use: "searchplayer [tag]", 
    async run(bot, message, args, db){
        let tag = message.user ? await args._hoistedOptions[0].value : args[0];
        message.delete()
        if(!tag){
            message.author.send("Vous devez indiquer un tag valide.")
        }
        let url = `https://api.clashroyale.com/v1/clans/${tag}`.replace("#", "%23")
        fetch(url, {
            "headers" : {
                "Authorization" : `Bearer ${config.ApiKeyCR}`
            }
        })
        .then((res) => res.json())
        .then((clans) => {
            if(clans.reason === "notFound") {
                message.author.send(`Le clan n'existe pas.`)
            } else {
                let description = clans.description
                if(!description) description = "Aucune description de clan"
                const ClanEmbed = new Discord.MessageEmbed()
                .setTitle(`Voici les informations du clan ${clans.name}`)
                .setDescription(`
Type : **${clans.type}**
Description :



Tag du Clan : **${clans.tag}**     
Trophées de GDC : **${clans.clanWarTrophies}**
Location : **${clans.location.name}**
Trophées requis : **${clans.requiredTrophies}**
Donations /semaine : **${clans.donationsPerWeek}**
Membres : **${clans.members}**
Joueur avec le plus de Trophées : **${clans.memberList[0].name}** **(${clans.memberList[0].trophies} 🏆)**
                `)
                .setFooter({text: `Demandé par ${message.author.username}`, iconURL : message.author.avatarURL({dynamic: true})})
                .setColor(bot.color)

                message.channel.send({embeds : [ClanEmbed]})
            }
        })
        
            
    }
})