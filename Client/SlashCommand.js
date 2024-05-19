const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, SlashCommandIntegerOption } = require("@discordjs/builders")
const { Routes } = require('discord-api-types/v10')
require("colors")
const config = require("../Config/bot")
const tester = require("../Config/tester")

module.exports = async bot => {

    let commands = [
        new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Permet d'évaluer du code")
        .addStringOption(Option => Option.setName("code").setDescription("Le Code a évaluer").setRequired(true)),
        new SlashCommandBuilder()
        .setName("giveelexir")
        .setDescription("Permet de give de l'elexir")
        .addUserOption(options => options.setName("utilisateur").setDescription("L'utilisateur qui va recevoir de l'elexir").setRequired(true))
        .addStringOption(options => options.setName("elexir").setDescription("Le nombre d'elexir que va recevoir l'utilisateur").setRequired(true)),
        new SlashCommandBuilder()
        .setName("giveticket")
        .setDescription("Permet de give des tickets")
        .addUserOption(options => options.setName("utilisateur").setDescription("L'utilisateur qui va recevoir des tickets").setRequired(true))
        .addStringOption(options => options.setName("tickets").setDescription("Le nombre de tickets que va recevoir l'utilisateur").setRequired(true)),
        new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Permet d'obtenir vos récompenses quotidiennes"),
        new SlashCommandBuilder()
        .setName("weekly")
        .setDescription("(PREMIUM ⭐) - Permet d'obtenir vos récompenses hebdomadaires"),
        new SlashCommandBuilder()
        .setName("monthly")
        .setDescription("(PREMIUM ⭐) - Permet d'obtenir vos récompenses mensuelles"),
        new SlashCommandBuilder()
        .setName("useticket")
        .setDescription("Permet d'obtenir une carte de Clash Royale MMO RPG"),
        new SlashCommandBuilder()
        .setName("premium")
        .setDescription("Permet de rendre un utilisateur premium")
        .addUserOption(options => options.setName("utilisateur").setDescription("L'utilisateur qui va recevoir le premium a vie").setRequired(true)),
        new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("Permet de voir son inventaire"),
        new SlashCommandBuilder()
        .setName("start")
        .setDescription("Permet de commencer l'aventure"),
        new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Permet d'ouvrir le Shop"), 
        new SlashCommandBuilder() 
        .setName("buy")
        .setDescription("Permet d'acheter un article sur la boutique."), 
        new SlashCommandBuilder() 
        .setName("help")
        .setDescription("Permet de voir les commandes du bot"),
        new SlashCommandBuilder() 
        .setName("merge")
        .setDescription("Permet de mélanger des potions."),
        new SlashCommandBuilder()
        .setName("aventure")
        .setDescription("Permet de partir a l'aventure"),
        new SlashCommandBuilder() 
        .setName("market")
        .setDescription("Permet d'ouvrir le market"),
        new SlashCommandBuilder() 
        .setName("create-clan")
        .setDescription("Permet de créer un clan."),
        new SlashCommandBuilder() 
        .setName("embed-builder")
        .setDescription("Permet de créer un embed personalisé"),
        new SlashCommandBuilder() 
        .setName("leak")
        .setDescription("Permet de leak des idées")
        .addStringOption(options => options.setName("time").setDescription("Le Temps").setRequired(true)),
        
        new SlashCommandBuilder() 
        .setName("discord")
        .setDescription("Permet d'obtenir le lien du serveur discord"),
        new SlashCommandBuilder() 
        .setName("create-sponsor")
        .setDescription("Permet de créer un code de parrainage que vous pouvez partager a vos amis."),
        new SlashCommandBuilder() 
        .setName("sponsor")
        .setDescription("Permet de regarder ses revenus sur le code de parrainage."),
        new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("Permet d'ajouter un rôle a un membre du discordr")
        .addUserOption(options => options.setName("utilisateur").setDescription("L'utilisateur qui va recevoir le rôle").setRequired(true))
        .addStringOption(options => options.setName("roleid").setDescription("L'ID Du rôle que l'utilisateur va recevoir").setRequired(true)),
        new SlashCommandBuilder() 
        .setName("custom-sponsor")
        .setDescription("Permet de modifer le code de sponsor que vous pouvez partager a vos amis.")
        .addStringOption(options => options.setName("id").setDescription("L'ID De l'utilisateur").setRequired(true))
        .addStringOption(options => options.setName("code").setDescription("Le nouveau code de parrainage").setRequired(true)),
        new SlashCommandBuilder()
        .setName("claim-sponsor")
        .setDescription("Permet d'appliquer un code de sponsor a votre compte")
        .addStringOption(options => options.setName("code").setDescription("Le code de parrainage").setRequired(true)),
        new SlashCommandBuilder()
        .setName("create-bot")
        .setDescription("Permet de créer un bot custom avec RoyaleMMO")
        .addStringOption(options => options.setName("ownerid").setDescription("Id de l'owner").setRequired(true))
        .addStringOption(options => options.setName("token").setDescription("Le token du bot").setRequired(true))
        .addStringOption(options => options.setName("temps").setDescription("Le temps").setRequired(true)),


        
    ];
    commands.push.toString(commands)
    
    const rest = new REST({version: '10'}).setToken(config.token);

    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands});
    console.log("[(/)]".cyan + " chargés avec succès".white);
   
}; 