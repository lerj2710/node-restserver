const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


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
        return res.status(400).json({
            msg: 'Usuario / Password no autenticado -- password'
        });
    } 
    // generar JWT

    
    
    res.json({
        msg : 'todo ok',

    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        msg :"algo salio mal hable con el administrador"
    })
}

    
}


module.exports = {
    login
}