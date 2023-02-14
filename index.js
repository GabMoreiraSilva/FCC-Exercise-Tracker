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
    return res.status(201).send({username: result.username, _id: result._id});
  })
}).get((req, res) => {
  user.find().select("username user._id").exec((err, result) => 
  {
    if (err)
      return res.status(204).send({error: err});
    return res.status(200).send(result)
  })
})

app.route('/api/users/:_id/exercises').post((req, res) =>{
  if((req.body.date === '') || (req.body.date === undefined))
    req.body.date = new Date().toDateString()
  req.body.date = new Date(req.body.date.split('-')).toDateString()
  const new_exercise = new exercise(req.body)
  new_exercise.save((err, result) =>{
    if (err)
      return res.status(204).send({error: err})
    user.findByIdAndUpdate(req.params._id, {$push:{log:result._id}}, (err, result) => {
      if (err)
        return res.send(err)
    })
    user.find({_id: req.params._id}, (err, result) => {
      if(err)
        return res.status(204).send({error: err})
      if(result[0] === undefined)
        return res.status(500).send({error: "User not found"})
      return res.send({'username':result[0]['username'],'description':req.body.description,'duration':parseInt(req.body.duration),"date":req.body.date,'_id':result[0]._id})
    })
  })
})

app.get("/api/users/:_id/logs", (req, res) =>{
  data = user.findById(req.params._id).populate('log', '-_id')
  data.exec((err, result) => {
    if(req.query.limit)
    {
      let exclude = result.log.length - parseInt(req.query.limit)
      for(let x = 0; x < exclude; x++)
      {
        result.log.pop()
      }
    }
    if(req.query.from)
    {
      for(let i = 0; i < result.log.length; i++)
      {
        if (!(Math.floor(Date.now(result.log[i].date) / 1000) >= Math.floor(Date.now(req.query.from) / 1000)) && !(Math.floor(Date.now(result.log[i].date) / 1000) <= Math.floor(Date.now(req.query.to) / 1000)))
        {
          result.pop(i);
        }
      }
    }
    return res.status(200).send({_id: result._id, username: result.username, count: result.log.length, log: result.log})
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})