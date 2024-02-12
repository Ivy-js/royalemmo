/** @format */
const mysql = require("mysql")
const Discord = require("discord.js")
const Client = require("./Client")

/**
 * 
 * @param {Client} bot 
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {string[]} args 
 * @param {mysql.Connection} db
 */
function RunFunction (bot, message, args, db){}

class Command {

    /**
     * @typedef {{name: string, description: string, use: string, permission : bigint, cooldown : number, category : string, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */

    constructor(options){
        this.name = options.name
        this.description = options.description
        this.use = options.use
        this.permission = options.permission 
        this.ownerOnly = options.ownerOnly
        this.category = options.category
        this.run = options.run
    }

}
module.exports = Command;