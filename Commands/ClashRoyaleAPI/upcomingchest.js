const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command  = require("../../Client/Command");

module.exports = new Command({
    name : "upcomingchests", 
    description : "Permet de trouver un joueur sur Clash Royale", 
    category : "Clash API", 
    permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
    use: "searchplayer [tag]", 
    async run(bot, message, args, db){
        let tag = message.user ? await args._hoistedOptions[0].value : args[0];
        message.delete()
        let playerName; 
        let playerUrl = `https://api.clashroyale.com/v1/players/${tag}`.replace("#", "%23")
        fetch(playerUrl, {
            "headers" : {
                "Authorization" : `Bearer ${config.ApiKeyCR}`
            }
        })
        .then((res) => res.json())
        .then((plyr) => {
            playerName = plyr.name
        })
        if(!tag){
            message.author.send("Vous devez indiquer un tag valide.")
        }
        let url = `https://api.clashroyale.com/v1/players/${tag}/upcomingchests`.replace("#", "%23")
        fetch(url, {
            "headers" : {
                "Authorization" : `Bearer ${config.ApiKeyCR}`
            }
        })
        .then((res) => res.json())
        .then((chest) => {
            if(chest.reason === "notFound") {
                message.author.send(`Le joueur n'existe pas.`)
            } else {
                let upcomingchests = []
                chest.items.forEach(coffre => {
                    chestObject = {
                        "Wooden Chest" : "<:WoodenChest:1074037262532227072>", 
                        "Crown Chest" : "<:CrownChest:1074039755332923422>",
                        "Silver Chest": "<:Silver_Chest:1074037460859900036>", 
                        "Golden Chest" : "<:Golden_Chest:1074037243364249720>", 
                        "Magical Chest" : "<:Magical_Chest:1074037253644492800>", 
                        "Giant Chest" : "<:Giant_chest:1074037239388045383>",
                        "Mega Lightning Chest": "<:MegaLightningChest:1074037255620005918>",
                        "Epic Chest" : "<:EpicChest:1074037236741460090>",
                        "Legendary Chest" : "<:LegendChest:1074037251186638958>", 
                        "Lightning Chest" : "<:Lightning_Chest:1074037252382019614>",
                        "Fortune Chest" : "<:Fortune_Chest:1074037237869719552>", 
                        "King's Chest" : "<:Kings_Chest:1074037244580606022>",
                        "Legendary King's Chest" : "<:Legendary_Kings_Chest:1074037248170930278>",
                        "Gold Crate" :"<:GoldCrate:1074037242202423476>", 
                        "Plentiful Gold Crate" : "<:PlentifulGoldCrate:1074037458976645230>", 
                        "Overflowing Gold Crate" : "<:OverflowingGoldCrate:1074037457424760874>",
                        "Royal Wild Chest" : "<:Royalwildchest:1074037259789160468>", 
                        "Champion Chest" : "<:Champion_Chest:1074037234342318090>"
                    }
                    upcomingchests.push(chestObject[coffre.name] + " dans **" + coffre.index + "** combats.")
                })

                const ChestEmbed = new Discord.MessageEmbed()
                .setTitle(`Les prochains coffres de ${playerName}`)
                .setDescription(`
${upcomingchests.join("\n")}
                `)
                .setFooter({text: `Demandé par ${message.author.username}`, iconURL : message.author.avatarURL({dynamic: true})})
                .setColor(bot.color)
                message.channel.send({embeds : [ChestEmbed]})
            } 
        
        })
        
            
    }
})