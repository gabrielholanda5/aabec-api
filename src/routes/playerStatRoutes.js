const { buscar,criar, atualizar, deletar } = require("../controllers/playerStatController")

const { Router } = require("express")

const rotas = Router()

rotas.get("/", buscar)
rotas.post("/", criar)
rotas.put("/:id", atualizar)
rotas.delete("/:id", deletar)

module.exports = rotas