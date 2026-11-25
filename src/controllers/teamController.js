const PRISMA = require("../services")

const times_validos = ["TIME_A", "TIME_B"]


async function buscar(req, res) {

    const teams = await PRISMA.team.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            stats: {
                include: { player: true },
            }
        },
    })

    return res.status(200).json(teams)
}

async function criar(req, res) {

    const { name, playerIds = [], goalsScored = 0, goalsConceded = 0 } = req.body

    const teamMaiuscula = name?.toUpperCase()
    if(!times_validos.includes(teamMaiuscula)){
        return res.status(400).json({error: "Time inválido. Use TIME_A ou TIME_B"});
    }

    const numInteiro = playerIds.map(Number)

    if (numInteiro.length > 0) {
    const existingPlayers = await PRISMA.player.findMany({
      where: { id: { in: numInteiro } }, 
      select: { id: true }
    })

    
    if (existingPlayers.length !== numInteiro.length) {
      return res.status(400).json({ error: "Um ou mais jogadores selecionados não existem no banco." })
    }
  }

    const time = await PRISMA.team.create({
        data: {
            name: teamMaiuscula,
            playerIds: numInteiro,
            goalsScored: Number(goalsScored),
            goalsConceded: Number(goalsConceded)
        }
    })

    return res.status(201).json(time)

}

async function deletar(req, res) {

    const { id } = req.params

    await PRISMA.team.delete({
        where: { id:Number(id) }
    })

    return res.status(204).send()

}

module.exports = {
    buscar,
    criar,
    deletar
}