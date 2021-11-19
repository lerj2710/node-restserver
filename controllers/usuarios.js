const {response, request}= require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs')

const usuariosGet =  (req= request, res = response)=>{
   
    const {q,nombre, apikey}= req.query;

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre, 
        apikey 
    })
}
const usuariosPost= async(req, res = response)=>{
    
    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol});
    //autenticar correo

    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
          usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos
    await usuario.save();
    
    res.json({
        
        usuario
    })
}
const usuariosPut= (req= request, res = response)=>{
    const { id } = req.params
    res.json({
        msg: 'put API - usuariosPut',
        id
    })
}
const usuariosPatch= (req, res = response)=>{
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}
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