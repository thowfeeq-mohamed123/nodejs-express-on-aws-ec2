const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res, next)=>{
    res.send('Hello Mohamed....')
})

app.listen(port, ()=>{
    console.log(`Express running on http://localhost:${port}`);
})