const mongoose = require('mongoose')
const { Schema } = mongoose;
require('dotenv').config()

mongoose.connect(`mongodb+srv://gabmoreira:${process.env.SENHA}@freecodecamp-gmoreira.5mklk3n.mongodb.net/?retryWrites=true&w=majority`)

const Exercise = new Schema({
  description: {type: String, required: true},
  duration:   {type: Number, required: true},
  date: { type: String}
}, { versionKey: false })

const User = new Schema({
  username:  {type: String, required: true},
  count: {type: Number},
  log: [{type: Schema.Types.ObjectId, ref: 'exercise' }]
},{ versionKey: false });

const user = mongoose.model("user", User);
const exercise = mongoose.model("exercise", Exercise);

module.exports = {user, exercise};