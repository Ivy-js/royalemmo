const Discord = require("discord.js")
const config = require("../../Config/bot")
const fetch = require("node-fetch")
const Command = require("../../Client/Command");
let arenaObject = [
    { name : "Arena 0", lieu : "Camp d'entrainement"},
    { name : "Arena 1", lieu : "Gobelinarium"},
    { name : "Arena 2", lieu : "Fausse aux os"},
    { name : "Arena 3", lieu : "Arène des barbares  "},
    { name : "Arena 4", lieu : "Vallée des sorts  "},
    { name : "Arena 5", lieu : "Atelier d’ouvriers  "},
    { name : "Arena 6", lieu : "Parc P.E.K.K.Aland  "},
    { name : "Arena 7", lieu : "Arène royale  "},
    { name : "Arena 8", lieu : "Sommet Glacé  "},
    { name : "Arena 9", lieu : "Arène Sauvage  "},
    { name : "Arena 10", lieu :  "Mont des Cochons"},
    { name : "Arena 11", lieu :  "Vallée électrique"},
    { name : "Arena 12", lieu :  "Ville sinistre"},
    { name : "Arena 13", lieu :  "Planque des fripons"},
    { name : "Arena 14", lieu :  "Mont de la sérénité"},
    { name : "Arena 15", lieu :  "Dans la mine"},
    { name : "Arena 16", lieu :  "Cuisine du bourreau"},
    { name : "Arena 17", lieu :  "Crypte royale"},
    { name : "Arena 18", lieu :  "Sanctuaire silencieux"},
    { name : "Arena 19", lieu :  "Sauna du dragon"},
    { name : "Arena 20", lieu :  "Arène légendaire"},
    { name : "Legendary Arena", lieu : "En combat privé (Combat Amical & Combat de Clan & Tournament)"},
]

 const cardsObject = [
     { name: "Knight", emoji: "<:knight:1074292865666130013>" },
     { name: "Archers", emoji: "<:Archers:1074292803770781788>" },
     { name: "Goblins", emoji: "<:goblins:1074292850247860314>" },
     { name: "Giant", emoji: "<:Giant:1074289739882041465>" },
     { name: "P.E.K.K.A", emoji: "<:pekka:1074292893654712411>" },
     { name: "Minions", emoji: "<:Minions:1074289761256214528>" },
     { name: "Balloon", emoji: "<:Ballon:1074292812901781574>" },
     { name: "Witch", emoji: "<:witch:1074292948528799784>" },
     { name: "Barbarians", emoji: "<:Barbarians:1074289319877038100>" },
     { name: "Golem", emoji: "<:Golem:1074292855943745556>" },
     { name: "Skeletons", emoji: "<:Skelettons:1074292918455640115>" },
     { name: "Valkyrie", emoji: "<:Valkyrie:1074292941926969344>" },
     { name: "Skeleton Army", emoji: "<:Skeletton_army:1074292912042553384>" },
     { name: "Bomber", emoji: "<:bomber:1074289331704967179>" },
     { name: "Musketeer", emoji: "<:muskteer:1074292888055324803>" },
     { name: "Baby Dragon", emoji: "<:baby_draggon:1074292809143701535>" },
     { name: "Prince", emoji: "<:prince:1074289423962865664>" },
     { name: "Wizard", emoji: "<:wizard:1074292951783591957>" },
     { name: "Mini P.E.K.K.A", emoji: "<:mini_pekka:1074289411728097362>" },
     { name: "Spear Goblins", emoji: "<:spear_goblins:1074292926512906361>" },
     { name: "Hog Rider", emoji: "<:hog_rider:1074294417088839760>" },
     { name: "Minion Horde", emoji: "<:minion_horde:1074289413770715256>" },
     { name: "Ice Wizard", emoji: "<:ice_wizard:1074289754763444315>" },
     { name: "Royal Giant", emoji: "<:royalgiant:1074289438047338526>" },
     { name: "Guards", emoji: "<:guards:1074292862679781487>" },
     { name: "Princess", emoji: "<:princess:1074289766729781280>" },
     { name: "Dark Prince", emoji: "<:dark_prince:1074292828500414564>" },
     { name: "Three Musketeers", emoji: "<:Three_Musketeers:1074292932460429353>" },
     { name: "Lava Hound", emoji: "<:Lava_hound:1074292869134827570>" },
     { name: "Ice Spirit", emoji: "<:Ice_Spirit:1074289392799195147>" },
     { name: "Fire Spirit", emoji: "<:Fire_spirit:1074292832224944209>" },
     { name: "Miner", emoji: "<:miner:1074289757753978951>" },
     { name: "Sparky", emoji: "<:Sparky:1074292922926780437>" },
     { name: "Bowler", emoji: " <:bowler:1074292814776631329>" },
     { name: "Lumberjack", emoji: "<:lumberjack:1074321333959262328>" },
     { name: "Battle Ram", emoji: "<:battle_ram:1074289326604693526>" },
     { name: "Inferno Dragon", emoji: "<:inferno_dragon:1074289397521981470>" },
     { name: "Ice Golem", emoji: "<:ice_golem:1074289390135803945>" },
     { name: "Mega Minion", emoji: "<:mega_minions:1074289403326898277>" },
     { name: "Dart Goblin", emoji: "<:dart_goblin:1074289334515159112>" },
     { name: "Goblin Gang", emoji: "<:goblin_gang:1074292847144075335>" },
     { name: "Electro Wizard", emoji: "<:electro_wizard:1074289345076400148>" },
     { name: "Elite Barbarians", emoji: "<:elite_barbarians:1074289352181551144>" },
     { name: "Hunter", emoji: "<:hunter:1074289386906198097>" },
     { name: "Executioner", emoji: "<:Executioner:1074289355121758230>" },
     { name: "Bandit", emoji: "<:bandit:1074289311987539998>" },
     { name: "Royal Recruits", emoji: "<:royal_recruits:1074292909974761482>" },
     { name: "Night Witch", emoji: "<:night_witch:1074292890542551111>" },
     { name: "Bats", emoji: "<:bats:1074289322217451620>" },
     { name: "Giant Skeleton", emoji: "<:giant_skeletton:1074289365062271129>" },
     { name: "Royal Ghost", emoji: "<:royal_ghost:1074292903188381716>" },
     { name: "Ram Rider", emoji: "<:ram_rider:1074289431491649546>" },
     { name: "Zappies", emoji: "<:zappies:1074293685048574122>" },
     { name: "Rascals", emoji: "<:Rascals:1074294218593419346>" },
     { name: "Cannon Cart", emoji: "<:cannon_kart:1074292822733238374>" },
     { name: "Mega Knight", emoji: "<:mega_knight:1074293673103208590>" },
     { name: "Skeleton Barrel", emoji: "<:skeletton_barrel:1074292915096014848>" },
     { name: "Flying Machine", emoji: "<:flying_machine:1074292840206716928>" },
     { name: "Wall Breakers", emoji: "<:wall_breakers:1074292945924137001>" },
     { name: "Royal Hogs", emoji: "<:royal_hogs:1074292906644488303>" },
     { name: "Goblin Giant", emoji: "<:giant_goblin:1074289363065769984>" },
     { name: "Fisherman", emoji: "<:fisherman:1074293670884417536>" },
     { name: "Magic Archer", emoji: "<:magic_archer:1074292877993197568>" },
     { name: "Electro Dragon", emoji: "" },
     { name: "Firecracker", emoji: "<:firecracker:1074292837803380817>" },
     { name: "Mighty Miner", emoji: "<:mighty_miner:1074289406116122646>" },
     { name: "Elexir Golem", emoji: "<:elexir_golem:1074289350449303552>" },
     { name: "Battle Healer", emoji: "<:battle_healer:1074289325069565982>" },
     { name: "Skeleton King", emoji: "<:skeletton_king:1074293679721811978>" },
     { name: "Archer Queen", emoji: "<:archer_queen:1074292800159490148>" },
     { name: "Golden Knight", emoji: "<:golden_knight:1074292852986753074>" },
     { name: "Monk", emoji: "<:monk:1074289764674580480>" },
     { name: "Skeleton Dragons", emoji: "<:skeletton_dragons:1074293676311851039>" },
     { name: "Mother Witch", emoji: "<:mother_witch:1074292883949113375>" },
     { name: "Electro Spirit", emoji: "<:electro_spirit:1074289341817442315>" },
     { name: "Electro Giant", emoji: "<:electro_giant:1074289339229544480>" },
     { name: "Phoenix", emoji: "<:pheonix:1074292896951447562>" },
     { name: "Goblin Hut", emoji: "" },
     { name: "Mortar", emoji: "<:mortar:1074292880350396426>" },
     { name: "Cannon", emoji: "<:cannon:1074292819038048266>" },
     { name: "Inferno Tower", emoji: "<:inferno_tower:1074289400311205988>" },
     { name: "Bomb Tower", emoji: "<:bomb_tower:1074289329893015635>" },
     { name: "Barbarian Hut", emoji: "<:barbarian_hut:1074289316857127013>" },
     { name: "Tesla", emoji: "<:tesla:1074292928907841616>" },
     { name: "Elexir Collector", emoji: "<:elexic_collector:1074289347580411954>" },
     { name: "X-Bow", emoji: "<:x_bow:1074292955839475784>" },
     { name: "Tombstone", emoji: "<:tombstone:1074292935572598854>" },
     { name: "Furnace", emoji: "<:furnace:1074289358179422278>" },
     { name: "Goblin Cage", emoji: "<:goblin_cage:1074289372930781295>" },
     { name: "Goblin Drill", emoji: "<:goblin_drill:1074289376093282334>" },
     { name: "Fireball", emoji: "<:fireball:1074292834707976213>" },
     { name: "Arrows", emoji: "<:arrows:1074292805750497280>" },
     { name: "Rage", emoji: "<:rage:1074289428010377276>" },
     { name: "Rocket", emoji: "<:rocket:1074289435560132678>" },
     { name: "Goblin Barrel", emoji: "<:goblin_barrel:1074289742587367454>" },
     { name: "Freeze", emoji: "<:freeze:1074292843323072513>" },
     { name: "Mirror", emoji: "<:mirror:1074289418401226853>" },
     { name: "Lightning", emoji: "<:lightning:1074292871231963136>" },
     { name: "Zap", emoji: "<:zap:1074293682624270397>" },
     { name: "Poison", emoji: "<:poison:1074289422163529808>" },
     { name: "Graveyard", emoji: "<:graveyard:1074292859915739186>" },
     { name: "The Log", emoji: "<:log:1074292874377711627>" },
     { name: "Tornado", emoji: "<:tornado:1074292938139508847>" },
     { name: "Clone", emoji: "<:clone:1074292825300148224>" },
     { name: "Earthquake", emoji: "<:earthquake:1074289336578740234>" },
     { name: "Barbarian Barrel", emoji: "<:barbarian_barrel:1074289313552023562>" },
     { name: "Heal Spirit", emoji: "<:heal_spirit:1074289378563723335>" },
     { name: "Giant Snowball", emoji: "<:giant_snowball:1074289368296083467>" },
     { name: "Royal Delivery", emoji: "<:royal_delivery:1074292900705349712>" },
 ]

 
module.exports = new Command({
    name: "start",
    description: "Permet de jouer a Clash Discord",
    category: "RPG",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "start-adventure",
    async run(bot, message, args, db) {

        db.query(`SELECT * FROM adventure WHERE userID = ${message.user.id}`, async (err, req) => {
            db.query(`SELECT * FROM eco WHERE userID = ${message.user.id}`, async (err,eco) => {
                        if(req.length < 1 || eco.length < 1){
                            let handCards = ``;
            
                            
                            db.query(`INSERT INTO adventure (userID) VALUES (?)`, [message.user.id]) 
                            db.query(`INSERT INTO eco (userID) VALUES (?)`, [message.user.id])
                            db.query(`INSERT INTO sponsor (userID) VALUES (?)`, [message.user.id])
                    
                    
                            for (let i = 0; i < 5; i++) {
                                const ListeHandCard = cardsObject[Math.floor(Math.random() * cardsObject.length)]
                                handCards += `${ListeHandCard.emoji} Carte ${i+1} : ${ListeHandCard.name}\n`
                                db.query(`UPDATE adventure SET carte${i+1} = ?, arene = ? WHERE userID = ? `, [`${ListeHandCard.emoji} Carte ${i+1} : ${ListeHandCard.name}`, arenaObject[0].name, message.user.id])
                            }
                    
                    
                           
                    
                            const StartEmbed = new Discord.MessageEmbed()
                                .setTitle("Début d'aventure.")
                                .setDescription(`
                    Bonjour ${message.user}, le village de RoyaleLand est attaqué par des gobelins !!
                    Ils nous ont pillé presque toutes nos ressources de guerre... 
                    En plus ils envisagent de balancer une roquette sur notre chateau. J'ai envoyé le prince, mais il n'est pas revenu pour le moment.
                    **Le message va changer dans 15s.**
                    `)
                                .setColor(bot.color)
                
                    
                                const SuiteEmbed = new Discord.MessageEmbed()
                                .setTitle("Debut d'aventure.")
                                .setDescription(`
                    Je te confie aussi 60 <:elexir:1199124230407737535> afin de pouvoir appeler tes troupes que je t'ai confié. 
                    Je t'envoie dans ta première mission. Rends toi au **${arenaObject[0].lieu}** pour récupérer des ressources.
                    Tu peux faire /cards pour voir ton deck.
                    Bon courage ${message.user} !         
                                `)
                                .setColor(bot.color)
                            message.reply({ embeds: [StartEmbed], })
                            setTimeout(() => {
                                message.editReply({ embeds : [SuiteEmbed], components: [] })
                            }, 15*1000);
                    
                        } else {
                            message.reply("Vous avez déjà commencé l'aventure !")
                        }
                    

            
            })

        })
    







    }

})