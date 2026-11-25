const express = require("express")
const cors = require("cors")

const playerRoutes = require("./src/routes/playerRoutes")
const teamRoutes = require("./src/routes/teamRoutes")
const playerStatRoutes = require("./src/routes/playerStatRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("api aabec")
})

app.use("/player", playerRoutes)
app.use("/team", teamRoutes)
app.use("/playerStat", playerStatRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Servidor on: http://localhost:3000")
})