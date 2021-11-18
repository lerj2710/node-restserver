const express = require('express');
const cors = require('cors')



class Server{
    constructor(){
       this.app = express();
       this.port = process.env.PORT;
       this.usuarioPath = '/api/usuarios';

       //middleware || vista de mi app
       this.middleware();
       //rutas de mi app
       this.routers();
    }

    middleware(){
        //CORS
        this.app.use(cors());
        this.app.use( express.static('public'))
    }
    routers(){

        this.app.use(this.usuarioPath, require('../routes/usuarios'));
        
    }
    listen(){
       this.app.listen( this.port, ()=>{
            console.log(`corriendo en puerto ${ this.port}`)
       })
    }

}

module.exports= Server;