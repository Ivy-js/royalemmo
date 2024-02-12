const Discord = require("discord.js")
const Event = require("../../Client/Event")
const config = require("../../Config/owners.json")
const { Configuration, OpenAIApi } = require("openai")
module.exports = new Event("messageCreate", async (bot, message) => {
    if (message.author.bot) return
    const db = bot.db
   

   
        let prefix = "+"

        let messageArray = message.content.split(" ")
        let command = messageArray[0]
        let args = messageArray.slice(1)

      

    


        let commandFile = bot.commands.get(command.slice(prefix.length))
      

        if (!message.content.startsWith(prefix)) return
        if(!message.member.permissions.has(new Discord.Permissions(commandFile.permission)) ) return message.reply("Vous n'avez pas la permission requise pour exécuter la commande.")
        if(commandFile.permission === "Developper" && message.author.id !== "1114616280138395738") return message.reply("Vous n'avez pas la permission requise pour exécuter la commande.")
        commandFile.run(bot, message, args, db)

    
        

})