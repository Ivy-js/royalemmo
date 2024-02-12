const Discord = require("discord.js")
const Command = require("../../Client/Command")


module.exports = new Command({
     name: "create-bot",
     description: "Permet de créer un bot custom avec RoyaleMMO",
     use: "create-bot [ownerID] [token] [temps]",
     ownerOnly: true,
     category: "Development",

        async run(bot, message, args, db) {
            let ownerID = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
            let token = message.user ? args._hoistedOptions[1].value : args[1]
            let time = message.user ? args._hoistedOptions[2].value : args[2]


            const customClient = new Discord.Client({intents : 32767})
            await customClient.login(token)

            await message.reply({content : `> ${customClient.user} est maintenant connecté !`, ephemeral : true}) 
            await message.channel.send({content : `> ${customClient.user} est en ligne avec succès !`})
            await bot.users.cache.get(ownerID).send({content : `> ${message.user} a crée un bot custom : ${customClient.user} ! Il est en ligne avec succès !`})
            await bot.users.cache.get(message.user.id).send({content : `> ${message.user} a crée un bot custom : ${customClient.user} ! Il est en ligne avec succès !`})


            customClient.user.setActivity({type : "WATCHING", name : "Bot crée avec RoyaleMMO"})

        }

})