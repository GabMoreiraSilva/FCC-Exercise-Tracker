const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
const {user, exercise} = require("./bd.js")

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// I know is kind messy, but it works fine and i try to use the 42 indentation, is the easiest way to see the indentation well
app.route("/api/users").post((req, res) => {
  const new_user = new user(req.body);
  new_user.save((err, result) =>
  {
    if (err)
      return res.status(204).send({error: err});
    res.status(201).send({username: result.username, _id: result._id});
  })
}).get((req, res) => {
  user.find().select("username user._id").exec((err, result) => 
  {
    if (err)
      return res.status(204).send({error: err});
    res.status(200).send(result)
  })
})

app.route('/api/users/:_id/exercises').post((req, res) =>{
  const new_exercise = new exercise(req.body)
  if (new_exercise === '')
    new_exercise = new Date().toISOString().substring(0, 10);
  new_exercise.save((err, result) =>
  {
    if (err)
      return res.status(204).send({error: err});
    res.status(201).send(result);
  })
}).get((req, res) => {
  exercise.findById((req.params.id),(err, result) => 
  {
    if (err)
      return res.status(204).send({error: err});
    res.status(200).send(result)
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})