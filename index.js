require("./db/mongoose")
const { User } = require("./models/user")
const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")

const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 3000

const NUMBER_OF_SALT_ROUNDS = 10
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

// Logic
async function createToken(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).send({
        message: "Utilisateur non trouvé"
      })
    }
    console.log({ user: user })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Mot de passe incorrect" })
    }
    const token = generateToken(user)

    res.send({
      userId: user,
      token: token
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

function generateToken(user) {
  return jwt.sign(
    {
      userId: user._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h"
    }
  )
}

function createUser(req, res) {
  const { email, password } = req.body
  saveCredentials(email, password)
    .then(() => res.send({ message: `Utilisateur créé: ${email}` }))
    .catch((err) => res.status(500).send(err))
}

async function saveCredentials(email, password) {
  const user = new User({
    email: email,
    password: await hashPassword(password)
  })
  return user.save()
}

function hashPassword(password) {
  return bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS)
}
