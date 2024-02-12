const Discord = require("discord.js");
const Command = require("../../Client/Command");

module.exports = new Command({
    name: "leak",
    description: "Permet de faire leak une nouveauté sur le bot",
    category: "leak",
    permission: Discord.Permissions.FLAGS.VIEW_CHANNEL,
    use: "leak <temps>",
    ownerOnly: true,
    async run(bot, message, args, db) {
        let temps;
        if (message.user) {
            temps = args._hoistedOptions[0].value;
        } else {
            temps = args[0];
        }

        const time = parseInt(temps);

        if (isNaN(time) || time <= 0) {
            return message.reply("Veuillez fournir une valeur de temps valide (positif).");
        }

        const duration = time * 60 * 1000; // Convertir le temps en millisecondes
        const interval = 1000; // Intervalle de mise à jour de la barre de progression (en millisecondes)
        const totalTicks = duration / interval;
        let currentTick = 0;

        const progressBarMessage = await message.channel.send('Progress: 0%');

        const updateProgress = () => {
            currentTick++;
            const progress = (currentTick / totalTicks) * 100;

            const progressBar = Array.from({ length: 20 }, (_, i) =>
                i < (progress / 5) ? '✨' : '⬜'
            ).join('');

            const embed = new Discord.MessageEmbed()
                .setColor('#3498db')
                .setTitle('Barre de progression')
                .setDescription(`[${progressBar}] ${progress.toFixed(2)}%`)
                .setFooter('C\'est parti !');

            progressBarMessage.edit(embed);

            if (currentTick < totalTicks) {
                setTimeout(updateProgress, interval);
            } else {
                embed.setFooter('Terminé !');
                progressBarMessage.edit(embed);
            }
        };

        updateProgress();
    },
});
