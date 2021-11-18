const {response, request}= require('express');

const usuariosGet =  (req= request, res = response)=>{
   
    const {q,nombre, apikey}= req.query;

    res.json({
        msg: 'get API - usuariosGet',
        q,
        nombre, 
        apikey 
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