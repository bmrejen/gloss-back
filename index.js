require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port = 3000

const login = process.env.DB_LOGIN
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const uri = `mongodb+srv://${login}:${password}@cluster0.1uk0a.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err))

//Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body
  // const email = req.body.email
  // const password = req.body.password
  saveCredentials(email, password)

  res.send("Signup")
})

app.get("/", (req, res) => {
  console.log("this user's name is ", req.query.name)
  res.send("Hello " + req.query.name)
})
app.listen(port, () => console.log("Listening on port " + port))

// Logic
function saveCredentials(email, password) {
  // Save credentials to database
  // Return token
  console.log("Saving credentials to database", email, password)
}
