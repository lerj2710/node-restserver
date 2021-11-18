const express = require('express');
const cors = require('cors')


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
        //CORS
        this.app.use(cors());
        this.app.use( express.static('public'))
    }
    routers(){
        this.app.get('/api', (req, res)=>{
            res.json({
                msg: 'get API'
            })
        });

        this.app.put('/api', (req, res)=>{
            res.json({
                msg: 'put API'
            })
        });

        this.app.post('/api', (req, res)=>{
            res.json({
                msg: 'post API'
            })
        });

        this.app.delete('/api', (req, res)=>{
            res.json({
                msg: 'delete API'
            })
        });

        this.app.patch('/api', (req, res)=>{
            res.json({
                msg: 'patch API'
            })
        });
    }
    listen(){
       this.app.listen( this.port, ()=>{
            console.log(`corriendo en puerto ${ this.port}`)
       })
    }

}

module.exports= Server;