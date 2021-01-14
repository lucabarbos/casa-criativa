// usando express para criar e configurar servidor 
const express = require('express')
const server = express()

const db = require('./db')

/* const ideas = [
    {
        img: "./assets/program.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci deserunt, fugiat dolor rerum doloribus dolores error quod reiciendis suscipit nam doloremque illo ullam modi ex quos aut perspiciatis asperiores provident.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "./assets/read.svg",
        title: "Leitura",
        category: "Estudo/Entetenimento",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci deserunt, fugiat dolor rerum doloribus dolores error quod reiciendis suscipit nam doloremque illo ullam modi ex quos aut perspiciatis asperiores provident.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "./assets/music.svg",
        title: "Ouvir Música",
        category: "Entretenimento",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci deserunt, fugiat dolor rerum doloribus dolores error quod reiciendis suscipit nam doloremque illo ullam modi ex quos aut perspiciatis asperiores provident.",
        url: "https://rocketseat.com.br"
    },
    {
      
        img: "./assets/meditation.svg",
        title: "Meditar",
        category: "Bem-estar",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci deserunt, fugiat dolor rerum doloribus dolores error quod reiciendis suscipit nam doloremque illo ullam modi ex quos aut perspiciatis asperiores provident.",
        url: "https://rocketseat.com.br"
    }
] */

//configurar arquivos estáticos (css, script, imagens)
server.use(express.static("public"))

//habulitar req.body
server.use(express.urlencoded({ extended: true }))

//configuração do nunjucks 
const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// rota / criada 
// e capturando requisição do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", { ideas: lastIdeas })
    })
})

server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
    
        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })
    })
})

server.post("/", function(req, res) {
    //inserir dados
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    }) 
})

// servidor ligado na porta 3000
server.listen(3000)