const PRISMA = require("../services")

async function buscar(req, res) {

    const playerStat = await PRISMA.playerStat.findMany({})

    return res.status(200).json(playerStat)
}


async function criar(req, res) {
    
    const { teamId, playerId, goals = 0, assists = 0, yellowCards = 0, redCards = 0 } = req.body

    if(!teamId || !playerId) {
        return res.status(400).json({error : "teamId e playerId são obrigatórios e devem ser números válidos"})
    }

    const playerStat = await PRISMA.playerStat.create({
        data : {
            teamId: Number(teamId),
            playerId: Number(playerId),
            goals: Number(goals),
            assists: Number(assists),
            yellowCards: Number(yellowCards),
            redCards: Number(redCards)
        }
    })

    return res.status(201).json(playerStat)

}

async function atualizar(req, res) {

    const { id } = req.params
    const { goals , assists , yellowCards, redCards } = req.body

    const dadosAtualizados = {}

    if(goals !== undefined) {
        dadosAtualizados.goals = Number(goals)
    }

    if(assists !== undefined){
      dadosAtualizados.assists = Number(assists) 
    }

    if(yellowCards !== undefined) {
        dadosAtualizados.yellowCards = Number(yellowCards)
    }

    if(redCards !== undefined){
        dadosAtualizados.redCards = Number(redCards)
    } 

    const atualizarStats = await PRISMA.playerStat.update({
        where: {id:Number(id)},
        data: dadosAtualizados
    })

    return res.status(200).json(atualizarStats)
}

async function deletar(req, res) {
    
    const { id } = req.params

    await PRISMA.playerStat.delete({
        where: { id:Number(id)}
    })

    return res.status(204).send()
}

module.exports = {
    buscar,
    criar,
    atualizar,
    deletar
}