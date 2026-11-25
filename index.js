const express = require("express")
const cors = require("cors")

const playerRoutes = require("./src/routes/playerRoutes")
const teamRouteS = require("./src/routes/teamRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("api aabec")
})

app.use("/player", playerRoutes)
app.use("/team", teamRouteS)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Servidor on: http://localhost:3000")
})