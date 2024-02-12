const Discord = require("discord.js")
const Command = require("./Command")
const Database = require("./Database")
const intents = new Discord.Intents(3276799)
const fs = require("fs")
require("colors")
class Client extends Discord.Client {
    constructor(){
        super({intents})

        this.commands = new Discord.Collection()
        this.db = Database; 
        this.color = "#F3D20C"
        this.function = {
            formatTime : require("../Functions/formatTime"), 
            cacaid : require("../Functions/createID"),

        }
    }

    
    async start(token){
        console.log("•----------•".gray.bold)
        fs.readdirSync("./Commands").forEach(dirs => {
            fs.readdirSync(`./Commands/${dirs}`).filter(f => f.endsWith(".js")).forEach(file => {

                /**
                 * @type {Command}
                 */

                const command = require(`../Commands/${dirs}/${file}`)
                console.log("[CUSTOM] [COMMAND] ".green.bold + command.name.toLocaleLowerCase().yellow + " chargé avec succès".white)
                this.commands.set(command.name, command)
            })
        })

      

        console.log("•----------•".gray.bold)
        
        fs.readdirSync("./RPG").forEach(dirs => {
            fs.readdirSync(`./RPG/${dirs}`).filter(f => f.endsWith(".js")).forEach(file => {

                /**
                 * @type {Command}
                 */

                const command = require(`../RPG/${dirs}/${file}`)
                console.log("[CUSTOM] [RPG] ".blue.bold + command.name.toLocaleLowerCase().yellow + " chargé avec succès".white)
                this.commands.set(command.name, command)
            })
        })
        console.log("•----------•".gray.bold)












        fs.readdirSync("./Events").forEach(async dirs => {
            fs.readdirSync(`./Events/${dirs}/`).filter(files => files.endsWith(".js")).forEach(async evt => {

                /**
                 * @type {Event}
                */

                const event = require(`../Events/${dirs}/${evt}`)
                console.log("[CUSTOM] [EVENT] ".red + event.event.toLowerCase().yellow + " chargé avec succès".white)
                this.on(event.event, event.run.bind(null, this))
            })
        })

        
        this.login(token)
    }
}
module.exports = Client;
