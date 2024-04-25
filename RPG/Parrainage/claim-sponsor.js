const Discord = require("discord.js");
const Command = require("../../Client/Command");
const { createID } = require("../../Functions/createID");

module.exports = new Command({
  name: "claim-sponsor",
  description: "Permet d'appliquer un code de sponsor a votre compte",
  category: "RPG",
  permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
  use: "create-sponsor",
  async run(bot, message, args, db) {
    let sponsorCode = message.user ? args._hoistedOptions[0].value : args[0];

    db.query(
      `SELECT * FROM sponsor WHERE sponsor_code = '${sponsorCode}'`,
      async (err, req) => {
        db.query(
          `SELECT * FROM eco WHERE userID = ${message.user.id}`,
          async (err, eco) => {
            const sponsorUser = bot.users.cache.get(req[0].userID);
            const sponsorUserFind = bot.users.cache.find(u => u.id === req[0].username)
            if (eco.length < 1) {
              return message.reply({
                content: `> Vous n'avez pas encore créer votre compte. faites la commande \`/start\` pour commencer l'aventure.`,
                ephemeral: true,
              });
            }
            if (eco[0].sponsor_code.length > 1) {
              return message.reply({
                content: `> Vous avez déja utilisé un code de parrainage. (\`${eco[0].sponsor_code}\`)`,
                ephemeral: true,
              });
            }

            if (req[0].sponsor_code < 1) {
              return message.reply({
                content: `> Le code de parrainage que vous avez entré est invalide & inexistant`,
                ephemeral: true,
              });
            } else {
              db.query(
                `UPDATE eco SET elexir=elexir+30, ticket=ticket+5, gems=gems+1, count=count+1 sponsor_code='${sponsorCode}' WHERE userID=${message.user.id}`
              );
              
              db.query(
                `UPDATE sponsor SET sponsorElexir=sponsorElexir+10, sponsorTicket=sponsorTicket+2, sponsorGems=sponsorGems+1 WHERE sponsor_code='${sponsorCode}'`
              );
            
              if(sponsorUserFind){
                message.reply({
                    content: `> Bravo ! Vous devenez le filleul de \`${sponsorUserFind.username}\` avec succès ! Vous recevez : \n - 30 Elexirs \n - 5 Tickets de Tirages \n - 1 Gemme`,
                  });
                  sponsorUserFind.send({
                      content: `> ${message.user} a utilisé votre code \`${sponsorCode}\` avec succès ! Vous êtes dés a présent son parrain. \n*Vous pouvez dés à présent consulter vos revenus de parrainage grâce a la commande /sponsor*`,
                    });
              } else {
                message.reply({
                    content: `> Bravo ! Vous devenez le filleul de \`${req[0].username}\` avec succès ! Vous recevez : \n - 30 Elexirs \n - 5 Tickets de Tirages \n - 1 Gemme`,
                  });
                
                }
              
              if (sponsorUserFind) {
                console.log(
                  `[SPONSOR]`.rainbow +
                    `- ${message.user.username} a utilisé le code de ${sponsorUserFind.username}(${sponsorCode}) avec succès !`
                );
              } else {
                console.log(
                  `[SPONSOR]`.rainbow +
                    `- ${message.user.username} a utilisé le code de ${req[0].username} (${sponsorCode}) avec succès !`
                );
              }
            }
          }
        ); // end of eco
      }
    ); // end of sponsor
  },
});
