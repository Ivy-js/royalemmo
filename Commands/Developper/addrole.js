const Discord = require("discord.js")
const Command = require("../../Client/Command")


module.exports = new Command({
     name: "addrole",
     description: "Permet d'ajouter un rôle a un membre du discord",
     use: "addrole [member] [roleId]",
     ownerOnly: true,
     category: "Gestion",

     async run(bot, message, args, db) {
          let user; 
          if(message.user ? args._hoistedOptions.length > 0 : args.length > 0) {
              user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]));
              if(!user) message.reply("Aucun user trouvé.")
          } 

          let roleId = message.user ? args._hoistedOptions[1].value : args[1]
          if(!roleId) return message.reply("Veuillez indiquer un nombre d'elexir a donner.")

          try{
            const member = await message.guild.members.fetch(user.id);
            member.roles.add(roleId)
          }
          catch(err){
            return message.reply("err")
          }

          message.reply({content : `> ${user} à reçu le rôle <@&${roleId}> par ${message.user}`})




          
     }
})