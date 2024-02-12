function pourcentage_chances(nombres, probas) {
    let rand = Math.random();
    for (let i = 0; i < probas.length; i++) {
        if (rand <= probas[i]) return nombres[i];
        rand -= probas[i];
    };
}
module.exports = { pourcentage_chances };