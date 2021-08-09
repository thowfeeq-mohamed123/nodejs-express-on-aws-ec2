window = {}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/user')

mongoose.connect('mongodb://localhost:27017/unitTesting', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Datebase connected'))
  .catch(error => console.log(error));

app.use(bodyParser.json())


app.get('/', (_, res) => {
  res.json({ message: "hello there" })
})


// routers

app.use('/user', userRouter)

app.listen(3000, () => console.log('server started'))