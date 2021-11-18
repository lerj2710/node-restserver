require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT
app.get('/', (req, res)=>{
    res.send('hola mundo desde node y express')
})
.listen(port, ()=>{
    console.log(`corriendo en puerto ${port}`)
})