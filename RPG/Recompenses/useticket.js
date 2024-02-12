const Discord = require("discord.js");
const fs = require("fs");
const Command = require("../../Client/Command");
const { pourcentage_chances } = require("../../Functions/fonction");
const { formatTime } = require("../../Functions/formatTime");
const { cardsObject } = require("../../Data/cardsobject");
const { emojiobject } = require("../../Data/emojiobject");

module.exports = new Command({
  name: "useticket",
  description: "Permet d'obtenir une carte de Clash Royale MMO RPG",
  category: "RPG",
  permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
  use: "useticket",
  async run(bot, message, args, db, interaction) {
    let i = 1;

    let btn = new Discord.MessageButton()
      .setCustomId(`pack_${message.user.id}`)
      .setLabel(`${i} GG !`)
      .setStyle("SECONDARY")
      .setEmoji("<:jiks_yes:1083070214784159764>");
    db.query(
      `SELECT * FROM eco WHERE userID = ?`,
      message.user.id,
      async (err, eco) => {
        db.query(
          `SELECT * FROM cooldown WHERE userID = ${message.user.id}`,
          async (err, req) => {
            if (eco.length < 1) {
              db.query(`INSERT INTO eco (userID) VALUES (?)`, [
                message.user.id,
              ]);
            } else if (req.length < 1) {
              cooldowndaily = 0;
              db.query(`INSERT INTO cooldown (userID) VALUES (?)`, [
                message.user.id,
              ]);
            } else {
              cooldowndaily = req[0].cooldownTicket;
            }

            if (
              cooldowndaily === 0 ||
              Math.floor(message.createdTimestamp - req[0].cooldownTicket) >=
                15000
            ) {
              db.query(`UPDATE eco SET ticket = ticket - ? WHERE userID = ?`, [
                1,
                message.user.id,
              ]);

              const ArrayRareter = [6, 5, 4, 3, 2, 1];
              const ArrayProbas = [0.01, 0.02, 0.09, 0.15, 0.3, 0.43];
              let rareterRandom = pourcentage_chances(
                ArrayRareter,
                ArrayProbas
              );
              let cartePull = [];
              for (let i = 0; i < cardsObject.length; i++) {
                if (cardsObject[i].numero === rareterRandom) {
                  cartePull.push(cardsObject[i]);
                }
              }
              const RandomCarte =
                cartePull[Math.floor(Math.random() * cartePull.length)];

              let lvl = Math.floor(Math.random() * 5 + 1);

              const TicketSummoned = new Discord.MessageEmbed()
                .setTitle("Ticket de Tirage")
                .setDescription(
                  `
            Bravo !! Vous avez eu :
            **${RandomCarte.name}** *(Niveau ${lvl})* 
            `
                )
                .setImage(RandomCarte.image);
              switch (RandomCarte.rarity) {
                case "common":
                  TicketSummoned.setColor("#1E88E5");
                  TicketSummoned.setThumbnail(
                    "https://media.discordapp.net/attachments/1080556765315346505/1083014496223776778/common.png?width=255&height=255"
                  );
                  break;
                case "rare":
                  TicketSummoned.setColor("#FFA000");
                  TicketSummoned.setThumbnail(
                    "https://cdn.discordapp.com/attachments/1080556765315346505/1083014496991318086/rare.png"
                  );

                  break;
                case "epic":
                  TicketSummoned.setColor("#8E24AA");
                  TicketSummoned.setThumbnail(
                    "https://cdn.discordapp.com/attachments/1080556765315346505/1083014496479621230/epic.png"
                  );
                  break;
                case "legendary":
                  TicketSummoned.setColor("#BBDEFB");
                  TicketSummoned.setThumbnail(
                    "https://cdn.discordapp.com/attachments/1080556765315346505/1083014496760647751/legendary.png"
                  );
                  break;
                case "champion":
                  TicketSummoned.setColor("#FDD835");
                  TicketSummoned.setThumbnail(
                    "https://cdn.discordapp.com/attachments/1080556765315346505/1083014495938556004/champion.png"
                  );
                  const LogsChampion = new Discord.MessageEmbed()
                    .setTitle("Ticket de Tirage")
                    .setDescription(
                      `
                        Bravo a  ${message.user} !! Il a eu : \`2/100\`
                        **${RandomCarte.name}** *(Niveau ${lvl})* 
                        `
                    )
                    .setImage(RandomCarte.image)
                    .setThumbnail(
                      "https://cdn.discordapp.com/attachments/1080556765315346505/1083014495938556004/champion.png"
                    )
                    .setColor("#FDD835");
                  break;
                case "Divinité du Net (Booster)":
                  TicketSummoned.setColor("#364473");
                  TicketSummoned.setThumbnail(
                    "https://cdn.discordapp.com/attachments/1083841191021383710/1083855495850377316/boostert.png"
                  );
                  const Logsboost = new Discord.MessageEmbed()
                    .setTitle("Ticket de Tirage")
                    .setDescription(
                      `
                        Bravo a  ${message.user} !! Il a eu : 
                        **${RandomCarte.name}** *(Niveau ${lvl})* \`1/100\`
                        `
                    )
                    .setImage(RandomCarte.image)
                    .setThumbnail(
                      "https://cdn.discordapp.com/attachments/1080556765315346505/1083014495938556004/champion.png"
                    )
                    .setColor("#364473");
              }

              message.reply(`Utilisation du ticket en cours...`);
              setTimeout(() => {
                message.editReply({
                  embeds: [TicketSummoned],
                  content: `${message.user} il vous reste \`${
                    eco[0].ticket - 1
                  } Ticket(s) de Tirage 🎫\``,
                });
              }, 3000);
              const collector = message.channel.createMessageComponentCollector(
                { time: 60000, idle: 30000 }
              );
              collector.on("collect", (button) => {
                if (button.isButton()) {
                  if (button.customId === `pack_${message.user.id}`) {
                    const newValue = parseInt(interaction.component.label) + 1;
                    const newButton = button.component.setLabel(
                      `${newValue.toString()} GG !`
                    );

                    button.message.edit({ components: [newButton] });
                  }
                }
              });
              console.log(
                "[TICKET] ".blue +
                  message.user.username.yellow +
                  " a eu " +
                  RandomCarte.name.cyan.bold +
                  " ! Dans le serveur " +
                  message.guild.name
              );
            } else {
              let dn = formatTime(
                15000 - (message.createdTimestamp - req[0].cooldownTicket)
              );
              message.reply(`Vous êtes en cooldown. Temps restant : ${dn}`);
            }

            if (eco.length < 1)
              return message.reply("Vous n'êtes pas enregistré");
            if (eco[0].ticket === 0) {
              return message.reply(
                `Vous n'avez pas de \`Ticket de Tirage 🎫\``
              );
            }
          }
        );
      }
    );
  },
});
