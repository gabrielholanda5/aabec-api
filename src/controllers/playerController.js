const PRISMA = require("../services")

const posicoes_validas = ["GOL", "ZAG", "MEI", "ATA"]

async function buscar(req, res) {

    const players = await PRISMA.player.findMany({
        orderBy: {name: "asc"}
    })

    return res.json(players)
}

async function criar(req, res) {

    const { name, position } = req.body

    if(!name || !name.trim()){
        return res.status(400).json({error: "O nome do jogador é obrigatório"})
    }

    const posMaiuscula = position?.toUpperCase()
    if(!posicoes_validas.includes(posMaiuscula)){
        return res.status(400).json({error: "Posição inválida. Use GOL, ZAG, MEI, ATA"})
    }

    const player = await PRISMA.player.create({
        data: {
            name: name.trim(),
            position: posMaiuscula
        }
    })

    return res.status(201).json(player)
}

async function deletar(req, res) {
    await PRISMA.player.delete({
        where: {id:Number(req.params.id)}
    })

    return res.status(204).send()
}

module.exports = {
    buscar,
    criar,
    deletar
}