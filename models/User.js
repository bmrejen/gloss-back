const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: [true, "Email required"] },
  password: {type: String, required: [true, "Password required"] },
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model("User", userSchema)

module.exports = { User }
