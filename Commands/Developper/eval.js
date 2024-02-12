const Discord = require("discord.js")
const Command = require("../../Client/Command")


module.exports = new Command({
     name: "eval",
     description: "Permet d'evaluer un code",
     use: "eval [code]",
     ownerOnly: true,
     category: "Development",

          async run(bot, message, args, db) {
               const code = message.user ? args._hoistedOptions[0].value : args.slice(0).join(" ")
               if (!code) return message.reply("Veuillez indiquez un code a évaluer")

               try {
                    let output = eval(code)

                    if(typeof output !== "string") output = require("util").inspect(output, {depth: 0})
                    if(output.includes(bot.token)) return message.reply("Vous ne pouvez pas obtenir le token du bot")

                    let Embed = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setTitle("Eval D'un Code")
                    .setDescription(`**Code Donné :** \`\`\`js\n${code}\`\`\` \n\n **Code Recu :** \`\`\`js\n${output}\`\`\``)

                    message.reply({embeds : [Embed]})
               } catch (err) {
                    
                    let Embed = new Discord.MessageEmbed()
                    .setColor(bot.color)
                    .setTitle("Eval D'un Code")
                    .setDescription(`**Code Donné :** \`\`\`js\n${code}\`\`\` \n\n **Code Recu :** \`\`\`json\n${err}\`\`\``)
                    message.reply({embeds : [Embed]})
               }

          }
})