const express = require('express');



class Server{
    constructor(){
       this.app = express();
       this.port = process.env.PORT

       //middleware || vista de mi app
       this.middleware();
       //rutas de mi app
       this.routers();
    }

    middleware(){
        this.app.use( express.static('public'))
    }
    routers(){
        this.app.get('/api', (req, res)=>{
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