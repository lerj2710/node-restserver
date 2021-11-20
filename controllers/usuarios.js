const {response, request}= require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
//=============== Metodo Get  ===============
const usuariosGet =  (req= request, res = response)=>{
   
    const {q,nombre, apikey}= req.query;

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre, 
        apikey 
    })
}
//=============== Metodo Post  ===============
const usuariosPost= async(req, res = response)=>{
   


    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol});
   
        //utenticar correo duplicado
    const exiteEmail = await Usuario.findOne({ correo });
        if (exiteEmail) {
            return res.status(400).json({
                msg: 'el correo ya se encuentra registrado'
            })
        }

        //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
            usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos
    await usuario.save();
    
    res.json({
        
        usuario
    })
}
//=============== Metodo Put  ===============
const usuariosPut= (req= request, res = response)=>{
    const { id } = req.params
    res.json({
        msg: 'put API - usuariosPut',
        id
    })
}
//=============== Metodo Patch  ===============
const usuariosPatch= (req, res = response)=>{
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}
//=============== Metodo Delete  ===============
const usuariosDelete= (req, res = response)=>{
    res.json({
        msg: 'delete API -usuariosDelete cpmt'
    })
}



module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}