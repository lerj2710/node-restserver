const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Producto, Categoria } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];
const buscarUsuario = async (termino ='', res= response)=>{
    
    const mongoID = ObjectId.isValid( termino );

    if( mongoID ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario )? [ usuario ] : [] 
        });
    }

    //crear expresion regular nativo de javascript
    const regex = new RegExp( termino , 'i');

    const usuarios = await Usuario.find({ 
        $or: [{ nombre : regex }, { correo : regex }],
        $and: [{estado: true}]
    });
    res.json({
        results:  usuarios
    });

};
const buscarCategorias = async( termino = '', res= response )=>{
    
    const mongoID = ObjectId.isValid( termino );

    if( mongoID ){
        const categoria = await Categorias.findById(termino);
        return res.json({
            results: ( categoria )? [ categoria ] : [] 
        });
    }

    //crear expresion regular nativo de javascript
    const regex = new RegExp( termino , 'i');

    const categorias = await Categoria.find({ nombre : regex, estado: true })
                                                   
    res.json({
        results:  categorias
    });
};

const buscarProductos = async( termino = '', res= response )=>{
    
    const mongoID = ObjectId.isValid( termino );

    if( mongoID ){
        const producto = await Producto.findById(termino) 
                                .populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : [] 
        });
    }
    //crear expresion regular nativo de javascript
    const regex = new RegExp( termino , 'i');
    const producto = await Producto.find({ nombre : regex, estado: true })
                             .populate('categoria', 'nombre');
    res.json({
        results: producto
    });
};


const buscar = ( req, res = response )=>{
   
   const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
       return res.status(400).json({
            msg:`las colecciones permitidas son: ${coleccionesPermitidas} `
       })
    };

    switch (coleccion) {
        case 'usuarios' :
            buscarUsuario( termino, res)
        break;

        case 'categorias' :
            buscarCategorias(termino, res)
        break;

        case 'productos' :
            buscarProductos(termino, res)
        break;

        
        default:
            break;
            
            res.status(500).json({
                msg: 'se me olvido hacer esta busqueda'
            });
    }

};



module.exports= {
    buscar
}