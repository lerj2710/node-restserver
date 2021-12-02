const { response } = require("express");
const { Producto } = require('../models');
const producto = require('../models/producto');

//obtenerPodroductos - paginado - total - populate
const obtenerProductos = async (req, res = response)=>{
        // // const {q,nombre, apikey}= req.query;
        const { limite = 5 , desde = 0} = req.query;
        const query= {estado: true}
        
        const [ total, productos ]= await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario','nombre')
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit( Number(limite) )
        ])
        res.json({
            total,
            productos

        })
}

//obtenerPodroducto - populate
const obtenerProducto = async(req, res = response)=>{
  
    const { id } = req.params;
    const producto = await Producto.findById( id )
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre')
    res.json( producto );
}

//crear categoria
const crearProducto = async( req, res = response )=>{

    //llamar el nombre para convertirlo en mayuscula
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre })

    if( productoDB ){
        return res.status(400).json({
            msg :`el producto ${ productoDB.nombre } ya existe`
        });
    }
    // Generar la data a guardar
    const data ={
        ...body,
        nombre: body.nombre.toUpperCase(), 
        usuario: req.usuario._id
    };

    //guarda en DB
    const producto = new Producto( data );

    await producto.save();

    res.status(201).json( producto )
}

//actualizarCategorias 
const actualizarProducto = async(req, res = response)=>{
     
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
   
        if(data.nombre){
            data.nombre = data.nombre.toUpperCase();
        }

        data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    res.json( producto )

}

//borrarCategoria estado:false 
const borrarProducto = async(req, res = response)=>{
    
    const { id } = req.params;

    const productoBorrado = await Producto.findOneAndUpdate( id , {estado: false}, {new: true})
    
    // const usuarioAtutenticado = req.usuario 
        res.json(productoBorrado)
}

module.exports= {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}