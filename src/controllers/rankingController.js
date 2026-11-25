const PRISMA = require("../services")

async function buscar(req, res) {
  const [players, teams, stats] = await Promise.all([
    PRISMA.player.findMany(),
    PRISMA.team.findMany(),
    PRISMA.playerStat.findMany()
  ])

  const teamMap = new Map(teams.map((team) => [team.id, team]))

  const rankingMap = new Map(
    players.map((player) => [
      player.id,
      {
        playerId: player.id,
        name: player.name,
        position: player.position,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
        wins: 0,
        cleanSheets: 0,
        points: 0,
      }
    ])
  )

  for (const stat of stats) {
    const entry = rankingMap.get(stat.playerId)
    if (!entry) continue

    const team = teamMap.get(stat.teamId)
    const wonMatch = team ? team.goalsScored > team.goalsConceded : false
    const isDefenderOrKeeper = entry.position === "GOL" || entry.position === "ZAG"
    const cleanSheet = team && isDefenderOrKeeper ? team.goalsConceded === 0 : false

    entry.goals += stat.goals
    entry.assists += stat.assists
    entry.yellowCards += stat.yellowCards
    entry.redCards += stat.redCards
    if (wonMatch) entry.wins += 1
    if (cleanSheet) entry.cleanSheets += 1

    const pontosDoRegistro =
      stat.goals * 1.0 +
      stat.assists * 1.0 +
      (wonMatch ? 0.5 : 0) +
      (cleanSheet ? 1.0 : 0) -
      stat.yellowCards * 0.5 -
      stat.redCards * 1.0

    entry.points += pontosDoRegistro
  }

  const ranking = Array.from(rankingMap.values())
    .map((item) => ({
      ...item,
      points: Number(item.points.toFixed(2))
    }))
    .sort((a, b) => b.points - a.points || b.goals - a.goals)

  return res.status(200).json(ranking)
}

module.exports = {
  buscar
}