const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res, next)=>{
    res.send('Hello world v1.0...')
})

app.listen(port, ()=>{
    console.log(`Express running on http://localhost:${port}`);
})