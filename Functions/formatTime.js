module.exports = {
    formatTime: (time) => {
        const years = Math.floor(time / 3.154e+10),
            months = Math.floor(time % 3.154e+10 / 2.628e+9),
            weeks = Math.floor(time % 2.628e+9 / 6.048e+8),
            days = Math.floor(time % 6.048e+8 / 8.64e+7),
            hours = Math.floor(time % 8.64e+7 / 3.6e+6),
            minutes = Math.floor(time % 3.6e+6 / 60000),
            seconds = Math.floor(time % 60000 / 1000),
            formattedTime = [];
        if (years) {
            formattedTime.push(`\`${years} année(s)\``);
        }
        if (months) {
            formattedTime.push(`\`${months} mois\``);
        }
        if (weeks) {
            formattedTime.push(`\`${weeks} semaine(s)\``);
        }
        if (days) {
            formattedTime.push(`\`${days} jour(s)\``);
        }
        if (hours) {
            formattedTime.push(`\`${hours} heure(s)\``);
        }
        if (minutes) {
            formattedTime.push(`\`${minutes} minute(s)\``);
        }
        if (seconds) {
            formattedTime.push(`\`${seconds} seconde(s)\``);
        }
        return formattedTime.join(", ");
    },
}
