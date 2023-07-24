const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')

const routes = require('./router/index')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/',routes)
app.get("/",(req, res) => {
  res.send("hello");
});

app.listen(process.env.SERVER_PORT)
