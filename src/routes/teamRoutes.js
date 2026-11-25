const { buscar, criar, deletar} = require("../controllers/teamController")

const { Router } = require("express")

const rotas = Router()

rotas.get("/", buscar)
rotas.post("/", criar)
rotas.delete("/:id", deletar)

module.exports = rotas