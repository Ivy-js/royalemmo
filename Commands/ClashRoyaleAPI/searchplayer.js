const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command = require("../../Client/Command");

module.exports = new Command({
    name: "searchplayer",
    description: "Permet de trouver un joueur sur Clash Royale",
    category: "Clash API",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "searchplayer [tag]",
    async run(bot, message, args, db) {
        let tag = message.user ? await args._hoistedOptions[0].value : args[0];
        message.delete()
        if (!tag) {
            message.reply("Vous devez indiquer un tag valide.")
        }
        let url = `https://api.clashroyale.com/v1/players/${tag}`.replace("#", "%23")
        fetch(url, {
            "headers": {
                "Authorization": `Bearer ${config.ApiKeyCR}`
            }
        })
            .then((res) => res.json())
            .then((Player) => {
                if (Player.reason == "notFound") {
                    message.reply(`Le joueur n'existe pas.`)
                } else {
                    let arena = Player.arena.name


                    let arenaObject = {
                        "Arena 0": "Camp d'entrainement (Arène 0)",
                        "Arena 1": "Gobelinarium (Arène 1)",
                        "Arena 2": "Fausse aux os (Arène 2)",
                        "Arena 3": "Arène des barbares (Arène 3)",
                        "Arena 4": "Vallée des sorts (Arène 4)",
                        "Arena 5": "Atelier d’ouvriers (Arène 5)",
                        "Arena 6": "Parc P.E.K.K.Aland (Arène 6)",
                        "Arena 7": "Arène royale (Arène 7)",
                        "Arena 8": "Sommet Glacé (Arène 8)",
                        "Arena 9": "Arène Sauvage (Arène 9)",
                        "Arena 10": "Mont des Cochons (Arène 10)",
                        "Arena 11": "Vallée électrique (Arène 11)",
                        "Arena 12": "Ville sinistre (Arène 12)",
                        "Arena 13": "Planque des fripons (Arène 13)",
                        "Arena 14": "Mont de la sérénité (Arène 14)",
                        "Arena 15": "Dans la mine (Arène 15)",
                        "Arena 16": "Cuisine du bourreau (Arène 16)",
                        "Arena 17": "Crypte royale (Arène 17)",
                        "Arena 18": "Sanctuaire silencieux (Arène 18)",
                        "Arena 19": "Sauna du dragon (Arène 19)",
                        "Arena 20": "Arène légendaire (Arène 20)",
                    }

                    let trophies = Player.trophies
                    if (Player.bestTrophies > Player.trophies) {
                        trophies = `${Player.trophies} 🏆 📉`
                    } else {
                        trophies = `${Player.trophies} 🏆 📈`

                    }
                    let badges = [];
                    Player.badges.forEach(badge => {
                        badges.push(badge.name + " | " + badge.level)
                    })
                    let clanName = Player.clan
                    if(!clanName) {
                        clanName = "Aucun Clan"
                    } 
                    console.log(clanName)
                    const playerEmbed = new Discord.MessageEmbed()
                        .setTitle(`Voici les informations sur ${Player.name}`)
                        .addFields(
                            { name: "Trophées", value: `**${trophies}**`, inline: true },
                            { name: "Meilleurs trophées atteint", value: `**${Player.bestTrophies} 🏆**`, inline: true },
                            { name: "Nombres de Victoires", value: `**${Player.wins} 🟢**`, inline: true },
                            { name: "Nombres de Défaites", value: `**${Player.losses} 🔴**`, inline: true },
                            { name: "Niveau de Joueur", value: `**${Player.expLevel} 👑**`, inline: true },
                            { name: "Clan du Joueur", value: `**${clanName}** `, inline: true },
                            { name: "Arène du Joueur", value: `**${arenaObject[Player.arena.name]}**`, inline: true },
                            { name: "Liste des badges :", value: badges.join("\n"), inline: true }
                        )
                        .setColor(bot.color)
                        .setFooter({text: `Demandé par ${message.author.username}`, iconURL : message.author.avatarURL({dynamic: true})})
                    message.channel.send({ embeds: [playerEmbed] })
                }
            })


            
    }
})