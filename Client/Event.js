/**@format */

const Discord = require("discord.js")
const Client = require("./Client")
/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} bot 
 * @param {Discord.ClientEvents[K]} eventsArgs 
 */

function RunFunction(bot, ...eventsArgs){}

/**
 * @template {keyof Discord.ClientEvents} K
 */

class Event {
    /**
     * @param {K} event
     * @param {RunFunction<K>} runFunction
     */

    constructor(event, runFunction){
        this.event = event; 
        this.run = runFunction;
    }
}

module.exports = Event;
