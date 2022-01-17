require("dotenv").config()
const mongoose = require("mongoose")

const login = process.env.DB_LOGIN
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const uri = `mongodb+srv://${login}:${password}@cluster0.1uk0a.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err))

module.exports = { mongoose }
