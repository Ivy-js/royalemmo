const Event = require("../../Client/Event")
const Discord = require("discord.js")
const allowedUserIDs = {
    ivy: "1114616280138395738",
};
module.exports = new Event("interactionCreate", async (bot, interaction) => {
    const db = bot.db

    if (interaction.isCommand()) {
        const command = bot.commands.get(interaction.commandName);
        console.log(`[INTERACTION LOG] - ${command.name.yellow} a été utilisée dans ${interaction.channel.name} [Guild Info : ${interaction.guild.name} / ${interaction.guild.id}]`.cyan)
    }
})