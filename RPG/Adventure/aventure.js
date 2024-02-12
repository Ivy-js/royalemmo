const {
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const { formatTime } = require("../../Functions/formatTime");
const Command = require("../../Client/Command");

module.exports = new Command({
  name: "aventure",
  description: "Permet de partir a l'aventure",
  category: "RPG",
  permission: Permissions.FLAGS.VIEW_CHANNEL,
  use: "aventure",
  async run(bot, message, args, db) {
    db.query(
      `SELECT * FROM adventure WHERE userID = ${message.user.id}`,
      async (reqerr, req) => {
        db.query(
          `SELECT * FROM eco WHERE userID = ${message.user.id}`,
          async (ecoerr, eco) => {
            db.query(
              `SELECT * FROM cooldown WHERE userID = ${message.user.id}`,
              async (cooldownerr, cooldown) => {
                

                let arena = req[0].arene;
                let lengthCooldown = cooldown.length
                let cooldownAventure = cooldown[0].cooldownAventure;
                if (lengthCooldown => 1) {
                  let Embed = new MessageEmbed()
                    .setTitle("Aventure")
                    .setDescription(
                      `
⭐・Voici les aventures pour lesquels vous êtes éligibles.
*Si les boutons sont en gris, cela veut dire que vous n'êtes éligibles aux aventures.*

Vous êtes **Arène ${arena}**
                         `
                    )
                    .setColor(bot.color);

                  let row = new MessageActionRow().addComponents(
                    new MessageButton()
                      .setCustomId(`${message.user.id}_arena0`)
                      .setLabel(`Arène 0 - Camp D'entrainement.`)
                      .setDisabled(arena == "0" ? false : true)
                      .setStyle("SECONDARY")
                      .setEmoji("🎯"),
                    new MessageButton()
                      .setCustomId(`${message.user.id}_arena1`)
                      .setLabel(`Arène 1 - Gobelinarium`)
                      .setDisabled(arena == "1" ? false : true)
                      .setStyle("SECONDARY")
                      .setEmoji("🦎"),
                    new MessageButton()
                      .setCustomId(`${message.user.id}_arena2`)
                      .setLabel(`Arène 2 - Fosse aux Os`)
                      .setDisabled(arena === "1" ? false : true)
                      .setStyle("SECONDARY")
                      .setEmoji("🦴"),
                    new MessageButton()
                      .setCustomId(`${message.user.id}_arena3`)
                      .setLabel(`Arène 3 - Arène des barbares`)
                      .setDisabled(arena === "3" ? false : true)
                      .setStyle("SECONDARY")
                      .setEmoji("⚔"),
                    new MessageButton()
                      .setCustomId(`${message.user.id}_arena4`)
                      .setLabel(`Arène 4 - Vallée des sorts`)
                      .setDisabled(arena === "4" ? false : true)
                      .setStyle("SECONDARY")
                      .setEmoji("🧙‍♂️")
                  );

                  let YesOrNo = new MessageActionRow().addComponents(
                    new MessageButton()
                      .setCustomId(`${message.user.id}_yes`)
                      .setEmoji("🟢")
                      .setLabel(`Oui`)
                      .setStyle("SECONDARY"),
                    new MessageButton()
                      .setCustomId(`${message.user.id}_no`)
                      .setEmoji("🔴")
                      .setLabel(`Non`)
                      .setStyle("SECONDARY")
                  );

                  message.reply({embeds : [Embed], components : [row]})

                  const collector =
                    message.channel.createMessageComponentCollector();
                  collector.on("collect", async (button) => {
                    if (button.customId === `${message.user.id}_arena0`) {
                      let EmbedAsk = new MessageEmbed()
                        .setTitle("Départ en Aventure")
                        .setDescription(
                          `
L'aventure durera **3h**, je vous souhaite bon chance pour vôtre aventure.
                                   `
                        )
                        .setColor(bot.color);

                      message.editReply({ embeds: [EmbedAsk], components: [] });
                      db.query(
                        `UPDATE cooldown SET  cooldownAventure = ? WHERE userID = ?`,
                        [message.createdTimestamp, message.user.id]
                      );
                    }
                  });
                } else {
                  let ArrayCooldown = [
                    10800000, 21600000, 32400000, 43200000, 54000000,
                  ];
                  let response = [
                    `> Vous êtes encore en aventure ! Il vous reste : ${formatTime(
                      ArrayCooldown[0] -
                        (message.createdTimestamp - cooldownAventure)
                    )} de temps d'expédition !`,
                    `> Vous êtes encore en aventure ! Il vous reste : ${formatTime(
                      ArrayCooldown[1] -
                        (message.createdTimestamp - cooldownAventure)
                    )} de temps d'expédition !`,
                    `> Vous êtes encore en aventure ! Il vous reste : ${formatTime(
                      ArrayCooldown[2] -
                        (message.createdTimestamp - cooldownAventure)
                    )} de temps d'expédition !`,
                    `> Vous êtes encore en aventure ! Il vous reste : ${formatTime(
                      ArrayCooldown[3] -
                        (message.createdTimestamp - cooldownAventure)
                    )} de temps d'expédition !`,
                    `> Vous êtes encore en aventure ! Il vous reste : ${formatTime(
                      ArrayCooldown[4] -
                        (message.createdTimestamp - cooldownAventure)
                    )} de temps d'expédition !`,
                    `> Vous êtes encore en aventure ! Il vous reste : ${formatTime(
                      ArrayCooldown[5] -
                        (message.createdTimestamp - cooldownAventure)
                    )} de temps d'expédition !`,
                  ];
                  switch (arena) {
                    case "Arena 0":
                      message.reply({ content: response[0] });
                      break;
                    case "Arena 1":
                      message.reply({ content: response[1] });
                      break;
                    case "Arena 2":
                      message.reply({ content: response[2] });
                      break;
                    case "Arena 3":
                      message.reply({ content: response[3] });
                      break;
                    case "Arena 4":
                      message.reply({ content: response[4] });
                      break;
                    case "Arena 5":
                      message.reply({ content: response[5] });
                      break;
                  }
                }
              }
            );
          }
        );
      }
    );
  },
});
