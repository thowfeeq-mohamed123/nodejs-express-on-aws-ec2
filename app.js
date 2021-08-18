window = {}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./config/config');
const userRouter = require('./routes/user');

db.connect()
  .then(() => console.log('Datebase connected'))
  .catch(error => console.log(error));

app.use(bodyParser.json())


app.get('/', (_, res) => {
  res.json({ message: "hello there" })
})


// routers

app.use('/api/user', userRouter)

app.listen(3000, () => console.log('server started'))