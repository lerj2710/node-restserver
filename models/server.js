const express = require('express');



class Server{
    constructor(){
       this.app = express();
       this.port = process.env.PORT
       this.routers();
    }
    routers(){
        this.app.get('/', (req, res)=>{
            res.send('hola mundo desde node y express')
        })
    }
    listen(){
       this.app.listen( this.port, ()=>{
            console.log(`corriendo en puerto ${ this.port}`)
       })
    }

}

module.exports= Server;