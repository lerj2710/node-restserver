const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response }     = require("express");
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
//ActulizarImagen local  y actulizarImagenCloudinary remoto

const ActulizarImagen = async(req, res = response)=>{
 
const { id, coleccion } = req.params;
let  modelo; 

  switch ( coleccion ) {

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
  };

    
    //limpiar img previo 
    if( modelo.img ){
      //borrar img del servidor
      const pathImagen = path.join( __dirname, '../uploads', coleccion,  modelo.img );
      if( fs.existsSync( pathImagen ) ) {
          fs.unlinkSync( pathImagen );
      }
    }


  //crear un arhivo donde subir mis colecciones por carpeta
  const nombre = await subirArchivo(req.files, undefined, coleccion );
    modelo.img = nombre

    //guardar en DB
  await modelo.save();

  res.json( modelo );
}

const actulizarImagenCloudinary = async(req, res = response)=>{
 
  const { id, coleccion } = req.params;
  let  modelo; 
  
  switch ( coleccion ) {

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
  };
   
  //limpiar img previo 
  if( modelo.img ){
      const nombreArr = modelo.img.split('/');
      const nombreSpr = nombreArr[ nombreArr.length - 1 ];
      const [ public_id ] = nombreSpr.split('.'); 
      console.log(public_id);
      cloudinary.uploader.destroy( public_id );
  }
  const { tempFilePath } =req.files.archivo
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
  modelo.img = secure_url;
    //guardar en DB
  await modelo.save();

  res.json(modelo);
}

const mostrarImagen = async(req, res = response)=>{
  
  const { id, coleccion } = req.params;
  let  modelo; 
  
    switch ( coleccion ) {
  
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
    };
  
      
      //limpiar img previo 
      if( modelo.img ){
        //borrar img del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion,  modelo.img );
        if( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen );
        }
      }
  
  
   const pathImgError = path.join( __dirname, '../assets/no-image.jpg');
      res.sendFile(pathImgError);
};


module.exports={
  cargarArchivo,
  ActulizarImagen,
  mostrarImagen,
 actulizarImagenCloudinary
};