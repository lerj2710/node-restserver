const { response } = require("express");
const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req, res = response)=>{

  try {
    
    
    //  const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos' ); // subir archivo de texto o md
     const nombre = await subirArchivo(req.files, undefined, 'imgs' ); // subir archivo de texto o md
     res.json({ nombre })
  } catch (msg) {
    res.status(400).json({ msg })
  }

};

const ActulizarImagen = async(req, res = response)=>{
 
  const { id, coleccion } = req.params;

  let  modelo; 
  
  switch (coleccion ) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
        if( !modelo ) {
          return res.status(400).json({
            msg : `No exite un usuario con el id ${ id }`
          });
        };

      break;

      case 'productos':
        modelo = await Producto.findById(id);
          if( !modelo ) {
            return res.status(400).json({
              msg : `No exite un productos con el id ${ id }`
            });
          };
  
        break;
  
    default:
      return res.status(500).json({ msg: 'no cree esta validacion '} );
  }


  //crear un arhivo donde subir mis colecciones por carpeta
  const nombre = await subirArchivo(req.files, undefined, coleccion );
    modelo.img = nombre
  
    //guardar en DB
  await modelo.save()

  res.json( modelo )
}


module.exports={
  cargarArchivo,
  ActulizarImagen
};