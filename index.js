require("./db/mongoose")
const express = require("express")
const { createToken, createUser } = require("./controllers/auth")

const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 3000

//Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", createToken)

app.get("/", (req, res) => {
  res.send("Hello " + req.query.name)
})
app.listen(port, () => console.log("Listening on port " + port))