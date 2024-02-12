const Discord = require("discord.js")
const Event = require("../../Client/Event")
const SlashCommand= require("../../Client/SlashCommand")
module.exports = new Event("guildMemberAdd", async (member) => {
    
    let role = "1198763951144587375"

    const giveRole = await member.guild.roles.cache.get(role)

    member.roles.add(giveRole)
})
