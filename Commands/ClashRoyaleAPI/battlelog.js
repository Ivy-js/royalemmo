const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command  = require("../../Client/Command");

module.exports = new Command({
    name : "battlelog", 
    description : "Permet de trouver un joueur sur Clash Royale", 
    category : "Clash API", 
    permission : Discord.Permissions.FLAGS.VIEW_CHANNEL, 
    use: "searchplayer [tag]", 
    async run(bot, message, args, db){
        let tag = message.user ? await args._hoistedOptions[0].value : args[0];
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
        message.delete()
        if(!tag){
            message.author.send("Vous devez indiquer un tag valide.")
        }
        let url = `https://api.clashroyale.com/v1/players/${tag}/battlelog`.replace("#", "%23")
        fetch(url, {
            "headers" : {
                "Authorization" : `Bearer ${config.ApiKeyCR}`
            }
        })
        .then((res) => res.json())
        .then((battle) => {
            if(battle.reason === "notFound") {
                message.author.send(`Le joueur n'existe pas.`)
            } else {
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
                    "Legendary Arena" : "En combat privé (Combat Amical & Combat de Clan & Tournament)",
                }




                let TeamCartes = []
                battle[0].team[0].cards.forEach(card => {
                    let cardsObject = {
                        "Knight" : "<:knight:1074292865666130013>", 
                        "Archers" : "<:Archers:1074292803770781788>", 
                        "Goblins" : "<:goblins:1074292850247860314>", 
                        "Giant" : "<:Giant:1074289739882041465>", 
                        "P.E.K.K.A" : "<:pekka:1074292893654712411>", 
                        "Minions" : "<:Minions:1074289761256214528>", 
                        "Balloon" : "<:Ballon:1074292812901781574>", 
                        "Witch" : "<:witch:1074292948528799784>", 
                        "Barbarians" : "<:Barbarians:1074289319877038100>", 
                        "Golem" : "<:Golem:1074292855943745556>", 
                        "Skeletons" : "<:Skelettons:1074292918455640115>", 
                        "Valkyrie" : "<:Valkyrie:1074292941926969344>", 
                        "Skeleton Army" : "<:Skeletton_army:1074292912042553384>", 
                        "Bomber" : "<:bomber:1074289331704967179>", 
                        "Musketeer" : "<:muskteer:1074292888055324803>", 
                        "Baby Dragon" : "<:baby_draggon:1074292809143701535>", 
                        "Prince" : "<:prince:1074289423962865664>", 
                        "Wizard" : "<:wizard:1074292951783591957>", 
                        "Mini P.E.K.K.A" : "<:mini_pekka:1074289411728097362>", 
                        "Spear Goblins" : "<:spear_goblins:1074292926512906361>", 
                        "Hog Rider" : "<:hog_rider:1074294417088839760>", 
                        "Minion Horde" : "<:minion_horde:1074289413770715256>", 
                        "Ice Wizard" : "<:ice_wizard:1074289754763444315>", 
                        "Royal Giant" : "<:royalgiant:1074289438047338526>", 
                        "Guards" : "<:guards:1074292862679781487>", 
                        "Princess" : "<:princess:1074289766729781280>", 
                        "Dark Prince" : "<:dark_prince:1074292828500414564>", 
                        "Three Musketeers" : "<:Three_Musketeers:1074292932460429353>", 
                        "Lava Hound" : "<:Lava_hound:1074292869134827570>", 
                        "Ice Spirit" : "<:Ice_Spirit:1074289392799195147>", 
                        "Fire Spirit" : "<:Fire_spirit:1074292832224944209>", 
                        "Miner" : "<:miner:1074289757753978951>", 
                        "Sparky" : "<:Sparky:1074292922926780437>", 
                        "Bowler" : " <:bowler:1074292814776631329>", 
                        "Lumberjack" : "<:lumberjack:1074321333959262328>", 
                        "Battle Ram" : "<:battle_ram:1074289326604693526>", 
                        "Inferno Dragon" : "<:inferno_dragon:1074289397521981470>", 
                        "Ice Golem" : "<:ice_golem:1074289390135803945>", 
                        "Mega Minion" : "<:mega_minions:1074289403326898277>", 
                        "Dart Goblin" : "<:dart_goblin:1074289334515159112>", 
                        "Goblin Gang" : "<:goblin_gang:1074292847144075335>", 
                        "Electro Wizard" : "<:electro_wizard:1074289345076400148>", 
                        "Elite Barbarians" : "<:elite_barbarians:1074289352181551144>", 
                        "Hunter" : "<:hunter:1074289386906198097>", 
                        "Executioner" : "<:Executioner:1074289355121758230>", 
                        "Bandit" : "<:bandit:1074289311987539998>", 
                        "Royal Recruits" : "<:royal_recruits:1074292909974761482>", 
                        "Night Witch" : "<:night_witch:1074292890542551111>", 
                        "Bats" : "<:bats:1074289322217451620>", 
                        "Giant Skeleton" : "<:giant_skeletton:1074289365062271129>",
                        "Royal Ghost" : "<:royal_ghost:1074292903188381716>", 
                        "Ram Rider" : "<:ram_rider:1074289431491649546>", 
                        "Zappies" : "<:zappies:1074293685048574122>", 
                        "Rascals" : "<:Rascals:1074294218593419346>", 
                        "Cannon Cart" : "<:cannon_kart:1074292822733238374>", 
                        "Mega Knight" : "<:mega_knight:1074293673103208590>", 
                        "Skeleton Barrel" : "<:skeletton_barrel:1074292915096014848>", 
                        "Flying Machine" : "<:flying_machine:1074292840206716928>", 
                        "Wall Breakers" : "<:wall_breakers:1074292945924137001>", 
                        "Royal Hogs" : "<:royal_hogs:1074292906644488303>", 
                        "Goblin Giant" : "<:giant_goblin:1074289363065769984>", 
                        "Fisherman" : "<:fisherman:1074293670884417536>", 
                        "Magic Archer" : "<:magic_archer:1074292877993197568>", 
                        "Electro Dragon" : "", 
                        "Firecracker" : "<:firecracker:1074292837803380817>", 
                        "Mighty Miner" : "<:mighty_miner:1074289406116122646>", 
                        "Elexir Golem" : "<:elexir_golem:1074289350449303552>", 
                        "Battle Healer" : "<:battle_healer:1074289325069565982>", 
                        "Skeleton King" : "<:skeletton_king:1074293679721811978>", 
                        "Archer Queen" : "<:archer_queen:1074292800159490148>", 
                        "Golden Knight" : "<:golden_knight:1074292852986753074>", 
                        "Monk" : "<:monk:1074289764674580480>", 
                        "Skeleton Dragons" : "<:skeletton_dragons:1074293676311851039>", 
                        "Mother Witch" : "<:mother_witch:1074292883949113375>", 
                        "Electro Spirit" : "<:electro_spirit:1074289341817442315>", 
                        "Electro Giant" : "<:electro_giant:1074289339229544480>", 
                        "Phoenix" : "<:pheonix:1074292896951447562>", 
                        "Goblin Hut" : "", 
                        "Mortar" : "<:mortar:1074292880350396426>", 
                        "Cannon" : "<:cannon:1074292819038048266>", 
                        "Inferno Tower" : "<:inferno_tower:1074289400311205988>", 
                        "Bomb Tower" : "<:bomb_tower:1074289329893015635>", 
                        "Barbarian Hut" : "<:barbarian_hut:1074289316857127013>", 
                        "Tesla" : "<:tesla:1074292928907841616>", 
                        "Elexir Collector" : "<:elexic_collector:1074289347580411954>", 
                        "X-Bow" : "<:x_bow:1074292955839475784>", 
                        "Tombstone" : "<:tombstone:1074292935572598854>", 
                        "Furnace" : "<:furnace:1074289358179422278>", 
                        "Goblin Cage" : "<:goblin_cage:1074289372930781295>", 
                        "Goblin Drill" : "<:goblin_drill:1074289376093282334>", 
                        "Fireball" : "<:fireball:1074292834707976213>", 
                        "Arrows" : "<:arrows:1074292805750497280>", 
                        "Rage" : "<:rage:1074289428010377276>", 
                        "Rocket" : "<:rocket:1074289435560132678>", 
                        "Goblin Barrel" : "<:goblin_barrel:1074289742587367454>", 
                        "Freeze" : "<:freeze:1074292843323072513>", 
                        "Mirror" : "<:mirror:1074289418401226853>", 
                        "Lightning" : "<:lightning:1074292871231963136>", 
                        "Zap" : "<:zap:1074293682624270397>", 
                        "Poison" : "<:poison:1074289422163529808>", 
                        "Graveyard" : "<:graveyard:1074292859915739186>", 
                        "The Log" : "<:log:1074292874377711627>", 
                        "Tornado" : "<:tornado:1074292938139508847>", 
                        "Clone" : "<:clone:1074292825300148224>", 
                        "Earthquake" : "<:earthquake:1074289336578740234>", 
                        "Barbarian Barrel" : "<:barbarian_barrel:1074289313552023562>",
                        "Heal Spirit": "<:heal_spirit:1074289378563723335>", 
                        "Giant Snowball": "<:giant_snowball:1074289368296083467>", 
                        "Royal Delivery": "<:royal_delivery:1074292900705349712>", 
                    }




                    TeamCartes.push(cardsObject[card.name])
                })
                let opponentCartes = []
                battle[0].opponent[0].cards.forEach(card => {
                    let cardsObject = {
                        "Knight" : "<:knight:1074292865666130013>", 
                        "Archers" : "<:Archers:1074292803770781788>", 
                        "Goblins" : "<:goblins:1074292850247860314>", 
                        "Giant" : "<:Giant:1074289739882041465>", 
                        "P.E.K.K.A" : "<:pekka:1074292893654712411>", 
                        "Minions" : "<:Minions:1074289761256214528>", 
                        "Balloon" : "<:Ballon:1074292812901781574>", 
                        "Witch" : "<:witch:1074292948528799784>", 
                        "Barbarians" : "<:Barbarians:1074289319877038100>", 
                        "Golem" : "<:Golem:1074292855943745556>", 
                        "Skeletons" : "<:Skelettons:1074292918455640115>", 
                        "Valkyrie" : "<:Valkyrie:1074292941926969344>", 
                        "Skeleton Army" : "<:Skeletton_army:1074292912042553384>", 
                        "Bomber" : "<:bomber:1074289331704967179>", 
                        "Musketeer" : "<:muskteer:1074292888055324803>", 
                        "Baby Dragon" : "<:baby_draggon:1074292809143701535>", 
                        "Prince" : "<:prince:1074289423962865664>", 
                        "Wizard" : "<:wizard:1074292951783591957>", 
                        "Mini P.E.K.K.A" : "<:mini_pekka:1074289411728097362>", 
                        "Spear Goblins" : "<:spear_goblins:1074292926512906361>", 
                        "Hog Rider" : "<:hog_rider:1074294417088839760>", 
                        "Minion Horde" : "<:minion_horde:1074289413770715256>", 
                        "Ice Wizard" : "<:ice_wizard:1074289754763444315>", 
                        "Royal Giant" : "<:royalgiant:1074289438047338526>", 
                        "Guards" : "<:guards:1074292862679781487>", 
                        "Princess" : "<:princess:1074289766729781280>", 
                        "Dark Prince" : "<:dark_prince:1074292828500414564>", 
                        "Three Musketeers" : "<:Three_Musketeers:1074292932460429353>", 
                        "Lava Hound" : "<:Lava_hound:1074292869134827570>", 
                        "Ice Spirit" : "<:Ice_Spirit:1074289392799195147>", 
                        "Fire Spirit" : "<:Fire_spirit:1074292832224944209>", 
                        "Miner" : "<:miner:1074289757753978951>", 
                        "Sparky" : "<:Sparky:1074292922926780437>", 
                        "Bowler" : " <:bowler:1074292814776631329>", 
                        "Lumberjack" : "<:lumberjack:1074321333959262328>", 
                        "Battle Ram" : "<:battle_ram:1074289326604693526>", 
                        "Inferno Dragon" : "<:inferno_dragon:1074289397521981470>", 
                        "Ice Golem" : "<:ice_golem:1074289390135803945>", 
                        "Mega Minion" : "<:mega_minions:1074289403326898277>", 
                        "Dart Goblin" : "<:dart_goblin:1074289334515159112>", 
                        "Goblin Gang" : "<:goblin_gang:1074292847144075335>", 
                        "Electro Wizard" : "<:electro_wizard:1074289345076400148>", 
                        "Elite Barbarians" : "<:elite_barbarians:1074289352181551144>", 
                        "Hunter" : "<:hunter:1074289386906198097>", 
                        "Executioner" : "<:Executioner:1074289355121758230>", 
                        "Bandit" : "<:bandit:1074289311987539998>", 
                        "Royal Recruits" : "<:royal_recruits:1074292909974761482>", 
                        "Night Witch" : "<:night_witch:1074292890542551111>", 
                        "Bats" : "<:bats:1074289322217451620>", 
                        "Giant Skeleton" : "<:giant_skeletton:1074289365062271129>",
                        "Royal Ghost" : "<:royal_ghost:1074292903188381716>", 
                        "Ram Rider" : "<:ram_rider:1074289431491649546>", 
                        "Zappies" : "<:zappies:1074293685048574122>", 
                        "Rascals" : "<:Rascals:1074294218593419346>", 
                        "Cannon Cart" : "<:cannon_kart:1074292822733238374>", 
                        "Mega Knight" : "<:mega_knight:1074293673103208590>", 
                        "Skeleton Barrel" : "<:skeletton_barrel:1074292915096014848>", 
                        "Flying Machine" : "<:flying_machine:1074292840206716928>", 
                        "Wall Breakers" : "<:wall_breakers:1074292945924137001>", 
                        "Royal Hogs" : "<:royal_hogs:1074292906644488303>", 
                        "Goblin Giant" : "<:giant_goblin:1074289363065769984>", 
                        "Fisherman" : "<:fisherman:1074293670884417536>", 
                        "Magic Archer" : "<:magic_archer:1074292877993197568>", 
                        "Electro Dragon" : "", 
                        "Firecracker" : "<:firecracker:1074292837803380817>", 
                        "Mighty Miner" : "<:mighty_miner:1074289406116122646>", 
                        "Elexir Golem" : "<:elexir_golem:1074289350449303552>", 
                        "Battle Healer" : "<:battle_healer:1074289325069565982>", 
                        "Skeleton King" : "<:skeletton_king:1074293679721811978>", 
                        "Archer Queen" : "<:archer_queen:1074292800159490148>", 
                        "Golden Knight" : "<:golden_knight:1074292852986753074>", 
                        "Monk" : "<:monk:1074289764674580480>", 
                        "Skeleton Dragons" : "<:skeletton_dragons:1074293676311851039>", 
                        "Mother Witch" : "<:mother_witch:1074292883949113375>", 
                        "Electro Spirit" : "<:electro_spirit:1074289341817442315>", 
                        "Electro Giant" : "<:electro_giant:1074289339229544480>", 
                        "Phoenix" : "<:pheonix:1074292896951447562>", 
                        "Goblin Hut" : "", 
                        "Mortar" : "<:mortar:1074292880350396426>", 
                        "Cannon" : "<:cannon:1074292819038048266>", 
                        "Inferno Tower" : "<:inferno_tower:1074289400311205988>", 
                        "Bomb Tower" : "<:bomb_tower:1074289329893015635>", 
                        "Barbarian Hut" : "<:barbarian_hut:1074289316857127013>", 
                        "Tesla" : "<:tesla:1074292928907841616>", 
                        "Elexir Collector" : "<:elexic_collector:1074289347580411954>", 
                        "X-Bow" : "<:x_bow:1074292955839475784>", 
                        "Tombstone" : "<:tombstone:1074292935572598854>", 
                        "Furnace" : "<:furnace:1074289358179422278>", 
                        "Goblin Cage" : "<:goblin_cage:1074289372930781295>", 
                        "Goblin Drill" : "<:goblin_drill:1074289376093282334>", 
                        "Fireball" : "<:fireball:1074292834707976213>", 
                        "Arrows" : "<:arrows:1074292805750497280>", 
                        "Rage" : "<:rage:1074289428010377276>", 
                        "Rocket" : "<:rocket:1074289435560132678>", 
                        "Goblin Barrel" : "<:goblin_barrel:1074289742587367454>", 
                        "Freeze" : "<:freeze:1074292843323072513>", 
                        "Mirror" : "<:mirror:1074289418401226853>", 
                        "Lightning" : "<:lightning:1074292871231963136>", 
                        "Zap" : "<:zap:1074293682624270397>", 
                        "Poison" : "<:poison:1074289422163529808>", 
                        "Graveyard" : "<:graveyard:1074292859915739186>", 
                        "The Log" : "<:log:1074292874377711627>", 
                        "Tornado" : "<:tornado:1074292938139508847>", 
                        "Clone" : "<:clone:1074292825300148224>", 
                        "Earthquake" : "<:earthquake:1074289336578740234>", 
                        "Barbarian Barrel" : "<:barbarian_barrel:1074289313552023562>",
                        "Heal Spirit": "<:heal_spirit:1074289378563723335>", 
                        "Giant Snowball": "<:giant_snowball:1074289368296083467>", 
                        "Royal Delivery": "<:royal_delivery:1074292900705349712>", 
                    }
                    opponentCartes.push(cardsObject[card.name])
                })
                let clanNameTeam = battle[0].team[0].clan
                    if(clanNameTeam === undefined) {
                        clanNameTeam = "Aucun Clan"
                    }
                    
                let clanNameOpp = battle[0].team[0].clan
                if(clanNameOpp === undefined) {
                    clanNameOpp = "Aucun Clan"
                }
                const BattleEmbed = new Discord.MessageEmbed()
                .setTitle(`Anciens combats de ${battle[0].team[0].name}`)
                .setDescription(`
\`\`\`
Combat ${battle[0].team[0].name} VS ${battle[0].opponent[0].name}
       👑  ${battle[0].team[0].crowns} - ${battle[0].opponent[0].crowns}  👑
\`\`\`
    • Le combat a eu lieu en **${arenaObject[battle[0].arena.name]}**
**▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁**
                
    • Joueur :  ${battle[0].team[0].name} 
    • Clan du Joueur :  ${clanNameTeam.name}   

    • Trophées de départ : ${battle[0].team[0].startingTrophies} 🏆
    
    • Deck Utilisé : \n${TeamCartes.join(" | ")}
**▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁**
                
    • Joueur :  ${battle[0].opponent[0].name} 
    • Clan du Joueur :  ${clanNameOpp.name}   

    • Trophées de départ : ${battle[0].opponent[0].startingTrophies} 🏆
    
    • Deck Utilisé : \n${TeamCartes.join(" | ")}

                `)
                .setColor(bot.color)
                .setFooter({text: `Demandé par ${message.author.username}`, iconURL : message.author.avatarURL({dynamic: true})})
                .setTimestamp()
                message.channel.send({embeds: [BattleEmbed]})
            }
        })
            
    }
                
            
    
})