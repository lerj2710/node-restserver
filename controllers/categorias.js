const { response } = require("express");
const {Categoria } = require('../models');
const categoria = require("../models/categoria");

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response)=>{
        // // const {q,nombre, apikey}= req.query;
        const { limite = 5 , desde = 0} = req.query;
        const query= {estado: true}
        
        const [ total, categoria ]= await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario','nombre')
                .skip(Number(desde))
                .limit( Number(limite) )
        ])
        res.json({
        total,
        categoria

 })
}

//obtenerCategorias - populate
const obtenerCategoria = async(req, res = response)=>{
    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');
    res.json( categoria );
}

//crear categoria
const crearCategoria = async( req, res = response )=>{

    //llamar el nombre para convertirlo en mayuscula
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })

    if( categoriaDB ){
        return res.status(400).json({
            msg :`la categoria ${categoriaDB.nombre} ya existe`
        });
    }
    // Generar la data a guardar
    const data ={
        nombre, 
        usuario: req.usuario._id
    };

    //guarda en DB
    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria)
}

//actualizarCategorias 
const actualizarCategoria = async(req, res = response)=>{
     
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });

    res.json( categoria )

}

//borrarCategoria estado:false 
const borrarCategoria = async(req, res = response)=>{
    
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findOneAndUpdate( id , {estado: false}, {new: true})
    
    // const usuarioAtutenticado = req.usuario 
        res.json(categoriaBorrada)
}

module.exports= {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
}