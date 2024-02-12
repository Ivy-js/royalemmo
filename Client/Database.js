const mysql = require("mysql")
require('colors')
const Database = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : "mmo",
    
})

    Database.connect(function (err){
        if(err) throw err
        console.log("[DATABASE] ".magenta + "La base de données a été connéctée avec succès".white )
    }) 


module.exports = Database;