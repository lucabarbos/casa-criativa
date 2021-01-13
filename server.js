// usando express para criar e configurar servidor 
const express = require('express')
const server = express()

//configurar arquivos estáticos (css, script, imagens)
server.use(express.static("public"))

//configuração do nunjucks 
const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// rota / criada 
// e capturando requisição do cliente para responder
server.get("/", function(req, res) {
    return res.render("index.html")
})

server.get("/ideias", function(req, res) {
    return res.render("ideias.html")
})

// servidor ligado na porta 3000
server.listen(3000)