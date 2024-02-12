const {
  Permissions,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");
const Command = require("../../Client/Command");
const Emojis = {
  owner: "<:ownerID:1083905761777811528>",
  time: "<:clans_time:1083905759382884474>",
  power: "<:clans_power:1083905757495443487>",
  members: "<:clans_members:1083905754198712362>",
  moderator: "<:clans_moderator:1083905756656582697>",
  clans: "<:clans:1083908701213171812>",
  fight: "<:clans_fight:1083908703234822246>",
  name: "<:clans_name:1083908704728010773>",
  closed: "<:clans_closed:1084046744637165568>",
  open: "<:clans_open:1084046746998554664>",
  description: "<:clans_descriptions:1084046780729143376>",
  admin: "<:clans_admin:1084099877467857036>",
  badges: "<a:badges:1084420438588923924>",
};
module.exports = new Command({
  name: "embed-builder",
  description: "(🚦) - Permet de créer un embed personnalisé !",
  category: "Other",
  ownerOnly: true,

  permission: Permissions.FLAGS.VIEW_CHANNEL,
  use: "vocal",
  async run(bot, message, args, db) {
    let embed = new MessageEmbed()
      .setTitle("Création d'Embed personnalisé !")
      .setDescription(
        `
Utilisez le menu ci dessous pour créer votre embed personnalisé !          
          `
      )
      .setColor(bot.color);


    let row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder("Voir les paramètres de l'embed personnalisé")
        .setCustomId(`${message.user.id}_embed`)
        .setMaxValues(1)
        .setOptions([
          {
            label: "Titre",
            value: "title",
            description: "Choisiez le Titre de l'Embed",
            emoji: "✍",
          },
          {
            label: "Description",
            value: "description",
            description: "Choisiez la Description de l'Embed",
            emoji: "📰",
          },
          {
            label: "Color",
            value: "color",
            description: "Choisiez la couleur de l'Embed",
            emoji: "🎨",
          },
          {
            label: "Image",
            value: "image",
            description: "Choisiez l'image de l'Embed",
            emoji: "🖼",
          },
          {
            label: "Thumbnail",
            value: "thumbnail",
            description: "Choisiez le Thumbnail de l'Embed",
            emoji: "🖼",
          },
          {
            label: "Texte du Footer",
            value: "FooterTxt",
            description: "Choisiez le texte du Footer de l'Embed",
            emoji: "🦴",
          },
        ])
    );
    let btn = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Envoyer l'embed")
        .setCustomId(`send_${message.user.id}`)
        .setStyle("SECONDARY")
        .setEmoji("✈")
    );
    
    let rowDisabled = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder("Voir les paramètres de l'embed personnalisé")
        .setCustomId(`${message.user.id}_embed`)
        .setMaxValues(1)
        .setOptions([
          {
            label: "Titre",
            value: "title",
            description: "Choisiez le Titre de l'Embed",
            emoji: "✍",
          },
          {
            label: "Description",
            value: "description",
            description: "Choisiez la Description de l'Embed",
            emoji: "📰",
          },
          {
            label: "Color",
            value: "color",
            description: "Choisiez la couleur de l'Embed",
            emoji: "🎨",
          },
          {
            label: "Image",
            value: "image",
            description: "Choisiez l'image de l'Embed",
            emoji: "🖼",
          },
          {
            label: "Thumbnail",
            value: "thumbnail",
            description: "Choisiez le Thumbnail de l'Embed",
            emoji: "🖼",
          },
          {
            label: "Texte du Footer",
            value: "FooterTxt",
            description: "Choisiez le texte du Footer de l'Embed",
            emoji: "🦴",
          },
        ])
        .setDisabled(true)
    );
    let btnDisabled = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Envoyer l'embed")
        .setCustomId(`send_${message.user.id}`)
        .setStyle("SECONDARY")
        .setEmoji("✈")
        .setDisabled(true)
    );

    let createEmbed = new MessageEmbed();

    message.reply({ embeds: [embed], components: [row, btn] });
    const collector = message.channel.createMessageComponentCollector({
      filter: (x) => {
        if (x.user.id === message.user.id) {
          return true;
        } else {
          x.reply({
            embeds: [
              {
                title: "Erreur",
                description: `${x.user} vous ne pouvez pas utliser ces interactions. Vous n'êtes pas l'auteur du message !`,
                color: bot.color,
              },
            ],
            ephemeral: true,
          });
          return false;
        }
      },
      time: 99999,
      idle: 30000,
    });

    collector.on("collect", async (interaction) => {
      const filterMessage = (m) =>
        m.author.id == message.user.id && !m.author.bot;
      if (interaction.isSelectMenu()) {
        if (interaction.customId === `${message.user.id}_embed`) {
          if (interaction.values[0] === "title") {
            interaction.deferUpdate();
            const question = await interaction.channel.send({
              embeds: [
                {
                  description: "Quel est le titre de l'embed ?",
                  color: bot.color,
                },
              ],
            });
            const reponse = (
              await message.channel.awaitMessages({
                filterMessage,
                max: 1,
              })
            ).first();
            question.delete();
            reponse.delete();

            createEmbed.setTitle(reponse.content);
            interaction.message.edit({ embeds: [createEmbed] });
          }
          if (interaction.values[0] === "description") {
            interaction.deferUpdate();
            const question = await interaction.channel.send({
              embeds: [
                {
                  description: "Quel est la description de l'embed ?",
                  color: bot.color,
                },
              ],
            });
            const reponse = (
              await message.channel.awaitMessages({
                filterMessage,
                max: 1,
              })
            ).first();
            question.delete();
            reponse.delete();

            createEmbed.setDescription(reponse.content);
            interaction.message.edit({ embeds: [createEmbed] });
          }
          if (interaction.values[0] === "color") {
            interaction.deferUpdate();
            const question = await interaction.channel.send({
              embeds: [
                {
                  description:
                    "Quel est la couleur de l'embed ? (Si vous ne savez pas, allez sur https://htmlcolors.com/)",
                  color: bot.color,
                },
              ],
            });
            const reponse = (
              await message.channel.awaitMessages({
                filterMessage,
                max: 1,
              })
            ).first();
            question.delete();
            reponse.delete();

            createEmbed.setColor(reponse.content);
            interaction.message.edit({ embeds: [createEmbed] });
          }
          if (interaction.values[0] === "image") {
            interaction.deferUpdate();
            const question = await interaction.channel.send({
              embeds: [
                {
                  description:
                    "Quel est l'image de l'embed ? (Envoyez un lien d'une image peut importe le format `.gif / .png / .jpg`)",
                  color: bot.color,
                },
              ],
            });
            const reponse = (
              await message.channel.awaitMessages({
                filterMessage,
                max: 1,
              })
            ).first();
            question.delete();
            reponse.delete();

            createEmbed.setImage(reponse.content);
            interaction.message.edit({ embeds: [createEmbed] });
          }
          if (interaction.values[0] === "thumbnail") {
            interaction.deferUpdate();
            const question = await interaction.channel.send({
              embeds: [
                {
                  description:
                    "Quel est le thumbnail de l'embed ? (Envoyez un lien d'une image peut importe le format `.gif / .png / .jpg`)",
                  color: bot.color,
                },
              ],
            });
            const reponse = (
              await message.channel.awaitMessages({
                filterMessage,
                max: 1,
              })
            ).first();
            question.delete();
            reponse.delete();

            createEmbed.setThumbnail(reponse.content);
            interaction.message.edit({ embeds: [createEmbed] });
          }
          if (interaction.values[0] === "FooterTxt") {
            interaction.deferUpdate();
            const question = await interaction.channel.send({
              embeds: [
                {
                  description: "Quel est le texte du Footer de l'embed ?",
                  color: bot.color,
                },
              ],
            });
            const reponse = (
              await message.channel.awaitMessages({
                filterMessage,
                max: 1,
              })
            ).first();
            question.delete();
            reponse.delete();

            createEmbed.setFooter({ text: reponse.content });
            interaction.message.edit({ embeds: [createEmbed] });
          }
        }
      }
      if (interaction.isButton()) {
        if (interaction.customId === `send_${message.user.id}`) {
          interaction.deferUpdate();
          const question = await interaction.channel.send({
            embeds: [
              {
                description: "Quel est le channel ou je dois l'envoyer ?",
                color: bot.color,
              },
            ],
          });
          const reponse = (
            await message.channel.awaitMessages({
              filterMessage,
              max: 1,
            })
          ).first();
          question.delete();
          reponse.delete();
          interaction.message.edit({ components: [btnDisabled, rowDisabled] });
          let channel = reponse.mentions.channels.first();
          channel.send({ embeds: [createEmbed] });
        }
      }
    });
  },
});
