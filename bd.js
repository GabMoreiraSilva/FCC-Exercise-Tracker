const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://gabmoreira:${process.env.SENHA}@freecodecamp-gmoreira.5mklk3n.mongodb.net/?retryWrites=true&w=majority`)

const User = new mongoose.Schema({
  username:  {type: String, required: true}
},{ versionKey: false });

const Exercise = new mongoose.Schema({
  username:  {type: User},
  description: {type: String, required: true},
  duration:   {type: Number, required: true},
  date: { type: Date, default: Date.now }
},{ versionKey: false });

const Log = new mongoose.Schema({
  username: {type: User},
  count: {type: Number},
  log: [{type : Exercise}]
},{ versionKey: false });

const user = mongoose.model("user", User);
const exercise = mongoose.model("exercise", Exercise);
const log = mongoose.model("log", Log);

module.exports = {user, exercise, log};