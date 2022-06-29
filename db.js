const sqlite3 = require('sqlite3').verbose();
const dbFile = "db.sqlite";

//connexion à la base de donnée
let db = new sqlite3.Database(dbFile, (err) => {
    if(err){
        console.error(err);
        //throw
    }
    else{
        console.log("connexion à la base de donnée");
        const sql = `CREATE TABLE article  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            resum text,
            description text,
            author text,
            creationDate date,
            lastUpdateDate date 
        )`

        db.run(sql, (err) => {
            if(err){
                console.log("Table déja crée");
            }
        })
    }
    
})

module.exports = db;