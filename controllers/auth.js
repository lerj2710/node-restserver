const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const generarJWT = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response)=>{
    
    const {correo, password} = req.body


    try {
        //verificar el emil
        const usuario = await Usuario.findOne({correo});

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no autenticado -- correo'
            })
        }



        // si el usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no autenticado -- estado: falso'
            });
        } 

        //verificar la contraseña
        const verifPassword = bcryptjs.compareSync( password, usuario.password)
            if (!verifPassword) {
               res.status(400).json({
                    msg: 'Usuario / Password no autenticado -- password'
                });
            } 
        // generar JWT
        const token = await generarJWT( usuario.id );
            res.json({
                usuario,
                token
              
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg :" hable con el administrador"
        })
    }

    
}
const googleSignin = async (req, res= response)=>{

    const { id_token }= req.body;
    
    
    try {
      
        const { correo, nombre, img } =  await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });
        
        if( !usuario ){
           
            // crear usuario
            const data ={
                nombre,
                correo,
                password: 'yop',
                img,
                google: true
            };

            usuario = new Usuario( data );
              await usuario.save();
        }




        //si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'hable con el administrador, usuario bloqueado'
            });
        }
           // generar JWT
           const token = await generarJWT( usuario.id );
        
        res.json({
            msg:' todo ok google signin',
            usuario,
            token
            
        })
    } catch (error) {
        res.status(400).json({
            msg: 'token de google no valido'
        })
    }
}

module.exports = {
    login,
    googleSignin
}