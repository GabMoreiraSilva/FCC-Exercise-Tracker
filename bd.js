const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://gabmoreira:${process.env.SENHA}@freecodecamp-gmoreira.5mklk3n.mongodb.net/?retryWrites=true&w=majority`)

const User = new mongoose.Schema({
  username:  {type: String, required: true},
  count: {type: Number},
  log: []
},{ versionKey: false });

const Exercise = new mongoose.Schema({
  username:  {type: User},
  description: {type: String, required: true},
  duration:   {type: Number, required: true},
  date: { type: Date, default: Date.now }
},{ versionKey: false });

const user = mongoose.model("user", User);
const exercise = mongoose.model("exercise", Exercise);

module.exports = {user, exercise};