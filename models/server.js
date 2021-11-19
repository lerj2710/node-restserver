const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db')



class Server{
    constructor(){
       this.app = express();
       this.port = process.env.PORT;
       this.usuarioPath = '/api/usuarios';


       //conectar base de datos
       this.conectarDB();

       //middleware || vista de mi app
       this.middleware();
       //rutas de mi app
       this.routers();
    }
    async conectarDB(){
        
        await dbConnection();   
    }

    middleware(){
        //lectura y parseo(obtener datos) del body
        this.app.use( express.json());
        //CORS
        this.app.use(cors());
        this.app.use( express.static('public'));
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