const {}= require('express');

const usuariosGet =  (req, res)=>{
    res.json({
        msg: 'get API - usuariosGet'
    })
}
const usuariosPost= (req, res)=>{
    res.json({
        msg: 'post API - usuariosPost'
    })
}
const usuariosPut= (req, res)=>{
    res.json({
        msg: 'put API - usuariosPut'
    })
}
const usuariosPatch= (req, res)=>{
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}
const usuariosDelete= (req, res)=>{
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