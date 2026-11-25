const { buscar } = require("../controllers/rankingController")

const { Router } = require("express")

const rotas = Router();

rotas.get("/", buscar);

module.exports = rotas