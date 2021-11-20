const {response, request}= require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
//=============== Metodo Get  ===============
const usuariosGet = async (req= request, res = response)=>{
   
    // // const {q,nombre, apikey}= req.query;
    const { limite = 5 , desde = 0} = req.query;
    
    // const usuariosGet = await Usuario.find()
    //         .skip(Number(desde))
    //         .limit( Number(limite)  );
    //============= //toal de usuario
    // const totalUsuarios = await Usuario.countDocuments();

    const [totalUsuarios, usuariosGet]= await Promise.all([
         Usuario.countDocuments(),
          Usuario.find()
            .skip(Number(desde))
            .limit( Number(limite) )
    ])
    res.json({
     totalUsuarios,
     usuariosGet

    })
}
//=============== Metodo Post  ===============
const usuariosPost= async(req, res = response)=>{

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol});

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

const usuariosPut= async (req= request, res = response)=>{

    const { id } = req.params;
    const { _id, password, google, correo,  ...resto } = req.body;

    //TODO validar contra base de datos
    if(password){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    };

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto)

    res.json( usuarioDB );
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