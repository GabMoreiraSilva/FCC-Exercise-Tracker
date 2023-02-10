const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')
const {user, exercise, log} = require("./bd.js")

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", (req, res) => {
  const new_user = new user(req.body);
  new_user.save((err, result) =>{
    if (err)
      return res.send({error: err});
    res.send(result);
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})