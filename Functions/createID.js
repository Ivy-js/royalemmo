function createID(code){
    let abc = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    let id = [];

    for (let i = 0; i < 4; i++) {
        id.push(abc[Math.floor(Math.random() * abc.length)]);
    }

    return `${code}-${id.join("")}`;
}

module.exports = { createID }
