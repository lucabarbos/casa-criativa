const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./cc.db')

db.serialize(function() {

    // Criar a tabela

    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // inserir dados

/*    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`
    const values = [
        "./assets/program.svg",
        "Cursos de Programação",
        "Estudo",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci deserunt, fugiat dolor rerum doloribus dolores error quod reiciendis suscipit nam doloremque illo ullam modi ex quos aut perspiciatis asperiores provident.",
        "https://rocketseat.com.br"
    ]

    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    }) */

    // deletar dado - IMPLEMENTAR DELETE NO SITE

    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
    //     if (err) return console.log(err)

    //     console.log("Deletado", this)
    // })

    // consultar dados 

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)

        console.log(rows)
    })

})

module.exports = db