// usando express para criar e configurar servidor 
const express = require('express')
const server = express()

//configurar arquivos estáticos (css, script, imagens)
server.use(express.static("public"))

// rota / criada 
// e capturando requisição do cliente para responder
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/index.html")
})

server.get("/ideias", function(req, res) {
    return res.sendFile(__dirname + "/ideias.html")
})

// servidor ligado na porta 3000
server.listen(3000)