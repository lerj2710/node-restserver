const {response}= require('express');

const usuariosGet =  (req, res = response)=>{
    res.json({
        msg: 'get API - usuariosGet'
    })
}
const usuariosPost= (req, res = response)=>{
    const {nombre, edad} = req.body
    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    })
}
const usuariosPut= (req, res = response)=>{
    res.json({
        msg: 'put API - usuariosPut'
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