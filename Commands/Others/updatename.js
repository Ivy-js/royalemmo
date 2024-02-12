const Discord = require("discord.js")
const Command = require("../../Client/Command")

module.exports = new Command({
    name:  "update-name", 
    description: "Update the name of a Discord Bot",
    ownerOnly : true,
    async run(bot, message, args,db) {

        bot.user.setUsername(args.slice(0).join(" "))
        console.log("Changed username to : " + args.slice(0).join(" ").red)
        message.channel.send("Changed username to : " + args.slice(0).join(" "))

    }

})