const { ShardingManager } = require("discord.js")
const { token } = require("./Config/bot")
require("colors")
const manager = new ShardingManager('./main.js', {token : token})

manager.on("shardCreate", shard => console.log("[SHARDS] ".blue.bold + " Shard Lancé " + shard.id))
manager.spawn()